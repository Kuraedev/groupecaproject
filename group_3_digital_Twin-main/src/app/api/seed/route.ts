// Protected seed route — creates tables and inserts Group 3 members.
// Requires ?secret=<SEED_SECRET> matching the env var, OR Authorization: Bearer <SEED_SECRET>.
// GET /api/seed?secret=...

import { NextRequest, NextResponse } from 'next/server';
import { initDb, getMembers } from '@/lib/db';

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function GET(request: NextRequest) {
  try {
    const expected = process.env.SEED_SECRET?.trim();
    if (!expected) {
      return NextResponse.json(
        { error: 'Seed disabled: SEED_SECRET is not configured on the server.' },
        { status: 503 },
      );
    }

    const url = new URL(request.url);
    const provided =
      url.searchParams.get('secret') ??
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
      '';

    if (!provided || !timingSafeEqual(provided, expected)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const members = await getMembers();
    return NextResponse.json(
      {
        message: 'Database initialized and members seeded successfully',
        membersInserted: members.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Seed failed' },
      { status: 500 },
    );
  }
}
