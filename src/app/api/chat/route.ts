import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/config/systemPrompt';
import { findMemberMatch, getAllMembers, getQAByCategory, searchQA } from '@/lib/queries';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatBody = {
  messages?: ChatMessage[];
  userQuestion?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody;
    const messages = body.messages ?? [];

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const normalizedQuestion = lastUserMessage.trim();
    const lowerQuestion = normalizedQuestion.toLowerCase();
    const memberMatch = await findMemberMatch(normalizedQuestion);
    const apiKey = process.env.OPENAI_API_KEY;

    if (/members|member list|group\s*2\s*members|who are the members/i.test(lowerQuestion)) {
      const members = await getAllMembers();
      if (members.length > 0) {
        const memberLines = members.map((member) =>
          `- **${member.display_name}**: ${member.summary}`
        );

        return NextResponse.json({
          reply: ['# Group 2 Members', '', ...memberLines, '', 'You can type any member name to get full details.'].join(
            '\n'
          ),
          modelId: 'database-members-list',
          source: 'database',
        });
      }
    }

    if (memberMatch) {
      const wantsSkills = /skill|skills|stack|expertise/i.test(lowerQuestion);
      const wantsProjects = /project|projects|built|work/i.test(lowerQuestion);
      const wantsContact = /email|gmail|contact|reach/i.test(lowerQuestion);

      const skillsContext = wantsSkills ? await getQAByCategory('skills') : [];
      const projectsContext = wantsProjects ? await getQAByCategory('projects') : [];
      const contactContext = wantsContact ? await getQAByCategory('contact') : [];

      const responseParts = [
        `# ${memberMatch.display_name}`,
        '',
        `- **Group:** ${memberMatch.group_name}`,
        `- **Email:** ${memberMatch.email}`,
        `- **Skills:** ${memberMatch.skills}`,
        `- **Summary:** ${memberMatch.summary}`,
        '',
        wantsSkills && skillsContext[0]
          ? `## Group 2 Skills\n${skillsContext[0].answer}`
          : null,
        wantsProjects && projectsContext[0]
          ? `## Group 2 Projects\n${projectsContext[0].answer}`
          : null,
        wantsContact && contactContext[0]
          ? `## Group 2 Contact\n${contactContext[0].answer}`
          : null,
        `Ask for another member name and I will respond in the same format.`,
      ].filter(Boolean) as string[];

      return NextResponse.json({
        reply: responseParts.join('\n'),
        modelId: 'database-member',
        source: 'database',
      });
    }

    // If no API key, try to get answer from database
    if (!apiKey) {
      // Search database for similar question
      const dbResults = await searchQA(normalizedQuestion);
      if (dbResults.length > 0) {
        const extraResponses = dbResults.slice(1, 3).map((item) => `- ${item.question}`);
        const enhancedReply =
          extraResponses.length > 0
            ? `${dbResults[0].answer}\n\n## You can also ask\n${extraResponses.join('\n')}`
            : dbResults[0].answer;

        return NextResponse.json({
          reply: enhancedReply,
          modelId: 'database',
          source: 'database',
        });
      }

      const members = await getAllMembers();
      const fallbackSuggestions = members.slice(0, 4).map((member) => `- ${member.display_name}`).join('\n');
      const fallback = [
        `I couldn't find a direct match for: "${lastUserMessage}".`,
        '',
        'I can help with:',
        '- Group 2 member profiles (just type a member name)',
        '- Skills and tech stack',
        '- Recent projects',
        '- Contact information',
        '',
        fallbackSuggestions ? `Try one of these member names:\n${fallbackSuggestions}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      return NextResponse.json({
        reply: fallback,
        modelId: 'fallback-local',
      });
    }

    // First, check if we have a direct match in database
    const dbResults = await searchQA(normalizedQuestion);
    if (dbResults.length > 0) {
      const extraResponses = dbResults.slice(1, 3).map((item) => `- ${item.question}`);
      const enhancedReply =
        extraResponses.length > 0
          ? `${dbResults[0].answer}\n\n## You can also ask\n${extraResponses.join('\n')}`
          : dbResults[0].answer;

      return NextResponse.json({
        reply: enhancedReply,
        modelId: 'database',
        source: 'database',
      });
    }

    // If no database match, use OpenAI
    // Prepare messages with system prompt
    const messagesForAPI: ChatMessage[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...messages,
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: messagesForAPI,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);

      const fallbackResults = await searchQA(normalizedQuestion);
      if (fallbackResults.length > 0) {
        return NextResponse.json({
          reply: `${fallbackResults[0].answer}\n\nI responded from Group 2 database because the AI model is currently unavailable.`,
          modelId: 'database-fallback',
          source: 'database',
        });
      }

      return NextResponse.json({
        reply:
          "I'm having trouble reaching the AI model right now, but I can still answer from Group 2 database. Try asking: members, skills, projects, contact, or a member name.",
        modelId: 'fallback-local',
        source: 'database',
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      reply,
      modelId: 'gpt-4-turbo',
      source: 'openai',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
