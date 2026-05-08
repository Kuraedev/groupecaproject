import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatBody = {
  messages?: ChatMessage[];
};

export async function POST(req: Request) {
  const body = (await req.json()) as ChatBody;
  const messages = body.messages ?? [];
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content;

  if (!lastUserMessage) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const fallback = `You asked: "${lastUserMessage}". I am connected and ready. Set OPENAI_API_KEY to enable full model responses.`;

  return NextResponse.json({
    reply: fallback,
    modelId: 'fallback-local',
  });
}
