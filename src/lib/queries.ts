import { Pool } from '@neondatabase/serverless';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

export type QA = {
  id: number;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export type GroupMember = {
  id: number;
  display_name: string;
  email: string;
  skills: string;
  summary: string;
  aliases: string[];
  group_name: string;
  created_at: string;
  updated_at: string;
};

/**
 * Get all Q&A pairs from the database
 */
export async function getAllQA(): Promise<QA[]> {
  try {
    const client = getPool();
    const result = await client.query(
      'SELECT id, question, answer, category, created_at, updated_at FROM questions_answers ORDER BY created_at DESC'
    );
    return result.rows as QA[];
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    return [];
  }
}

/**
 * Get Q&A by category
 */
export async function getQAByCategory(category: string): Promise<QA[]> {
  try {
    const client = getPool();
    const result = await client.query(
      'SELECT id, question, answer, category, created_at, updated_at FROM questions_answers WHERE category = $1 ORDER BY created_at DESC',
      [category]
    );
    return result.rows as QA[];
  } catch (error) {
    console.error('Error fetching Q&A by category:', error);
    return [];
  }
}

/**
 * Get a specific Q&A by ID
 */
export async function getQAById(id: number): Promise<QA | null> {
  try {
    const client = getPool();
    const result = await client.query(
      'SELECT id, question, answer, category, created_at, updated_at FROM questions_answers WHERE id = $1',
      [id]
    );
    return (result.rows[0] as QA) || null;
  } catch (error) {
    console.error('Error fetching Q&A by ID:', error);
    return null;
  }
}

/**
 * Search Q&A by question
 */
export async function searchQA(query: string): Promise<QA[]> {
  try {
    const client = getPool();
    const result = await client.query(
      'SELECT id, question, answer, category, created_at, updated_at FROM questions_answers WHERE question ILIKE $1 ORDER BY created_at DESC',
      [`%${query}%`]
    );
    return result.rows as QA[];
  } catch (error) {
    console.error('Error searching Q&A:', error);
    return [];
  }
}

/**
 * Add a new Q&A pair
 */
export async function addQA(question: string, answer: string, category: string = 'general'): Promise<QA | null> {
  try {
    const client = getPool();
    const result = await client.query(
      'INSERT INTO questions_answers (question, answer, category) VALUES ($1, $2, $3) RETURNING id, question, answer, category, created_at, updated_at',
      [question, answer, category]
    );
    return (result.rows[0] as QA) || null;
  } catch (error) {
    console.error('Error adding Q&A:', error);
    return null;
  }
}

/**
 * Get all group members from the database
 */
export async function getAllMembers(): Promise<GroupMember[]> {
  try {
    const client = getPool();
    const result = await client.query(
      'SELECT id, display_name, email, skills, summary, aliases, group_name, created_at, updated_at FROM group_members ORDER BY display_name ASC'
    );
    return result.rows as GroupMember[];
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

/**
 * Search members by name, alias, email, skills, or summary keywords
 */
export async function searchMembers(query: string): Promise<GroupMember[]> {
  try {
    const client = getPool();
    const result = await client.query(
      `SELECT id, display_name, email, skills, summary, aliases, group_name, created_at, updated_at
       FROM group_members
       WHERE display_name ILIKE $1
          OR email ILIKE $1
          OR skills ILIKE $1
          OR summary ILIKE $1
          OR EXISTS (
            SELECT 1
            FROM unnest(aliases) alias
            WHERE alias ILIKE $1
          )
       ORDER BY
         CASE
           WHEN display_name ILIKE $1 THEN 0
           WHEN EXISTS (
             SELECT 1
             FROM unnest(aliases) alias
             WHERE alias ILIKE $1
           ) THEN 1
           ELSE 2
         END,
         display_name ASC`,
      [`%${query}%`]
    );
    return result.rows as GroupMember[];
  } catch (error) {
    console.error('Error searching members:', error);
    return [];
  }
}

/**
 * Find the best member match for a natural language question
 */
export async function findMemberMatch(query: string): Promise<GroupMember | null> {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return null;
  }

  const members = await getAllMembers();
  if (members.length === 0) {
    return null;
  }

  const stopWords = new Set([
    'skill',
    'skills',
    'info',
    'information',
    'about',
    'email',
    'contact',
    'group',
    'member',
    'members',
    'project',
    'projects',
    'the',
    'of',
  ]);

  let bestMatch: GroupMember | null = null;
  let bestScore = 0;

  for (const member of members) {
    const candidates = [member.display_name, ...member.aliases]
      .map((item) => item.toLowerCase().trim())
      .filter(Boolean);

    let score = 0;

    for (const candidate of candidates) {
      if (normalizedQuery.includes(candidate)) {
        score += 5;
      }

      const parts = candidate
        .split(/\s+/)
        .map((part) => part.trim())
        .filter((part) => part.length >= 3 && !stopWords.has(part));

      for (const part of parts) {
        if (normalizedQuery.includes(part)) {
          score += 1;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = member;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}
