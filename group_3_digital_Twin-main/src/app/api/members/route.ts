// API route for fetching Group 3 members from Neon DB
// GET /api/members

import { NextRequest, NextResponse } from 'next/server';
import { initDb, getMembers } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

// Mask emails to prevent harvest/scraping. Example: "lopezcycy515@gmail.com" → "l***@gmail.com"
function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '***';
  const head = local.slice(0, 1);
  return `${head}${'*'.repeat(Math.max(2, local.length - 1))}@${domain}`;
}

export async function GET(request: NextRequest) {
  try {
    // 30 reqs/min/IP — generous for a public list endpoint
    const ip = getClientIp(request);
    const rl = rateLimit(`members:${ip}`, 30, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 },
      );
    }

    await initDb();
    const rows = await getMembers();
    const members = rows.map((m) => ({
      id: m.id,
      name: m.name,
      email: maskEmail(m.email),
    }));

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error('Members API error:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
