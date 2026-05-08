// API route for chat completions via OpenRouter
// POST /api/chat

import { NextRequest, NextResponse } from 'next/server';
import { ARTEMIS_PERSONA } from '@/lib/artemis-config';
import { MAX_RESPONSE_TOKENS } from '@/lib/config';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

interface MessageParam {
  role: 'user' | 'assistant';
  content: string;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openrouter/free';

// Security limits
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 4000;
const ALLOWED_ROLES = new Set(['user', 'assistant']);

// Rate limit: 20 chat requests / minute / IP
const CHAT_LIMIT = 20;
const CHAT_WINDOW_MS = 60_000;

export async function POST(request: NextRequest) {
  try {
    // ── Rate limit ────────────────────────────────────────────────────────
    const ip = getClientIp(request);
    const rl = rateLimit(`chat:${ip}`, CHAT_LIMIT, CHAT_WINDOW_MS);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    // ── API key validation ────────────────────────────────────────────────
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is missing or empty in environment');
      return NextResponse.json(
        {
          error:
            'Server misconfigured: OPENROUTER_API_KEY is not set. Please add it to Vercel environment variables (Production scope) and redeploy.',
        },
        { status: 500 },
      );
    }

    // ── Body validation ───────────────────────────────────────────────────
    const body = await request.json();
    const { messages } = body as { messages: MessageParam[] };
    // NOTE: we INTENTIONALLY do NOT accept a `systemPrompt` from the client.
    // Client-controlled system prompts allow trivial bypass of the persona
    // and prompt-injection protections. The persona is server-only.

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: non-empty messages array required' },
        { status: 400 },
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: `Conversation too long (max ${MAX_MESSAGES} messages).` },
        { status: 400 },
      );
    }

    // Validate every message: shape, role allowlist, length cap
    for (const m of messages) {
      if (!m || typeof m !== 'object') {
        return NextResponse.json({ error: 'Invalid message shape' }, { status: 400 });
      }
      if (!ALLOWED_ROLES.has(m.role)) {
        return NextResponse.json(
          { error: 'Invalid message role (must be user or assistant)' },
          { status: 400 },
        );
      }
      if (typeof m.content !== 'string' || m.content.length === 0) {
        return NextResponse.json(
          { error: 'Message content must be a non-empty string' },
          { status: 400 },
        );
      }
      if (m.content.length > MAX_MESSAGE_CHARS) {
        return NextResponse.json(
          { error: `Message too long (max ${MAX_MESSAGE_CHARS} characters).` },
          { status: 400 },
        );
      }
    }

    // Server-controlled system prompt only
    const finalSystemPrompt = ARTEMIS_PERSONA;

    const orRes = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Group 3 Digital Twin',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_RESPONSE_TOKENS,
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages,
        ],
      }),
    });

    if (!orRes.ok) {
      const errText = await orRes.text();
      console.error('OpenRouter error:', orRes.status, errText);
      return NextResponse.json(
        { error: `OpenRouter ${orRes.status}: ${errText.slice(0, 300)}` },
        { status: orRes.status },
      );
    }

    const data = await orRes.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('Unexpected OpenRouter response:', data);
      return NextResponse.json(
        { error: 'Unexpected response from AI model' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        reply,
        modelId: data.model,
        stopReason: data.choices?.[0]?.finish_reason,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
