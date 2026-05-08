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
