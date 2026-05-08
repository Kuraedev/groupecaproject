import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/config/systemPrompt';
import { searchQA } from '@/lib/queries';

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

    const apiKey = process.env.OPENAI_API_KEY;

    // If no API key, try to get answer from database
    if (!apiKey) {
      // Search database for similar question
      const dbResults = await searchQA(lastUserMessage);
      if (dbResults.length > 0) {
        return NextResponse.json({
          reply: dbResults[0].answer,
          modelId: 'database',
          source: 'database',
        });
      }

      const fallback = `You asked: "${lastUserMessage}". I am connected and ready. Set OPENAI_API_KEY to enable full model responses.`;
      return NextResponse.json({
        reply: fallback,
        modelId: 'fallback-local',
      });
    }

    // First, check if we have a direct match in database
    const dbResults = await searchQA(lastUserMessage);
    if (dbResults.length > 0) {
      return NextResponse.json({
        reply: dbResults[0].answer,
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
      return NextResponse.json(
        { error: 'Failed to get response from AI model', details: error },
        { status: response.status }
      );
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
