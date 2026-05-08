// API route for lead capture
// POST /api/leads

import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/utils/helpers';
import { saveLead } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  role?: string;
  conversationId: string;
}

const FIELD_MAX = 200;

export async function POST(request: NextRequest) {
  try {
    // 5 leads/min/IP — generous for a real submitter, blocks spammers
    const ip = getClientIp(request);
    const rl = rateLimit(`leads:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as LeadPayload;
    const { name, email, company, role, conversationId } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 },
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 },
      );
    }

    if (!conversationId || !conversationId.trim()) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 },
      );
    }

    // Length caps to prevent oversized payloads
    if (
      name.length > FIELD_MAX ||
      email.length > FIELD_MAX ||
      (company?.length ?? 0) > FIELD_MAX ||
      (role?.length ?? 0) > FIELD_MAX ||
      conversationId.length > FIELD_MAX
    ) {
      return NextResponse.json(
        { error: `Field too long (max ${FIELD_MAX} chars).` },
        { status: 400 },
      );
    }

    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    const lead = await saveLead({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim(),
      role: role?.trim(),
      conversation_id: conversationId,
    });

    return NextResponse.json(
      {
        message: 'Lead captured successfully',
        leadId: lead.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Lead capture error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
