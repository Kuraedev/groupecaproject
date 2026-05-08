// Neon PostgreSQL client (serverless-compatible)

import { neon } from '@neondatabase/serverless';

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable');
  }
  return neon(process.env.DATABASE_URL);
}

export const sql = getSql;

// Types

export interface ConversationRow {
  id: string;
  user_id?: string;
  messages: unknown;
  metadata?: unknown;
  created_at: string;
  updated_at: string;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  conversation_id: string;
  created_at: string;
}

export interface MemberRow {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const SEED_MEMBERS = [
  { name: 'Engiemar Balanay', email: 'engiebalanay@gmail.com' },
  { name: 'King Yohann Ilahn A. Tomas', email: 'yohanntomas2@gmail.com' },
  { name: 'Justin Joeff Lacerona', email: 'laceronajustin83@gmail.com' },
  { name: 'John Nino Miranda', email: 'miranda011406@gmail.com' },
  { name: 'Vince Avena', email: 'vinceavena2@gmail.com' },
  { name: 'Charles Andrew Bassig', email: 'charlesbassig20@gmail.com' },
  { name: 'Ira Zenith Ginaia Alias', email: 'irazenithalias@gmail.com' },
  { name: 'Cyrene Joy Lopez', email: 'lopezcycy515@gmail.com' },
  { name: 'Lawrence Nizer Remudaro', email: 'nizerremudaro6@gmail.com' },
  { name: 'Aaron Josh Pocot', email: 'aaronjoshpocot@gmail.com' },
  { name: 'Reggie Lovett', email: 'reggielovett143@gmail.com' },
];

// Initialize tables (run once on cold start / migration)

export async function initDb() {
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      messages JSONB NOT NULL DEFAULT '[]',
      metadata JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      role TEXT,
      conversation_id TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const existing = await db`SELECT COUNT(*) as count FROM members`;
  if (Number(existing[0].count) === 0) {
    for (const m of SEED_MEMBERS) {
      await db`
        INSERT INTO members (name, email)
        VALUES (${m.name}, ${m.email})
        ON CONFLICT (email) DO NOTHING
      `;
    }
  }
}

export async function getMembers() {
  const db = getSql();
  const rows = await db`SELECT * FROM members ORDER BY id ASC`;
  return rows as MemberRow[];
}

// Database operations

export async function saveConversation(
  conversationId: string,
  messages: unknown,
  metadata?: unknown,
) {
  const db = getSql();
  const rows = await db`
    INSERT INTO conversations (id, messages, metadata, updated_at)
    VALUES (${conversationId}, ${JSON.stringify(messages)}, ${metadata ? JSON.stringify(metadata) : null}, NOW())
    ON CONFLICT (id) DO UPDATE
      SET messages  = EXCLUDED.messages,
          metadata  = EXCLUDED.metadata,
          updated_at = NOW()
    RETURNING *
  `;
  return rows[0] as ConversationRow;
}

export async function saveLead(
  lead: Omit<LeadRow, 'id' | 'created_at'>,
) {
  const db = getSql();
  const rows = await db`
    INSERT INTO leads (name, email, company, role, conversation_id)
    VALUES (${lead.name}, ${lead.email}, ${lead.company ?? null}, ${lead.role ?? null}, ${lead.conversation_id})
    RETURNING *
  `;
  return rows[0] as LeadRow;
}

export async function getConversation(conversationId: string) {
  const db = getSql();
  const rows = await db`
    SELECT * FROM conversations WHERE id = ${conversationId} LIMIT 1
  `;
  return (rows[0] as ConversationRow) ?? null;
}
