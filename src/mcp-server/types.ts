/**
 * MCP Tool Interface and Type Definitions
 */

export interface Tool {
  name: string;
  description: string;
  schema: Record<string, string>;
  handler: (input: Record<string, unknown>) => Promise<unknown>;
}

export interface ChatInput {
  message: string;
  context?: string;
  userId?: string;
}

export interface InterviewInput {
  questionId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  memberId?: string;
}

export interface PortfolioInput {
  memberId?: string;
  filterBy?: 'skills' | 'projects' | 'experience';
}

export interface ToolResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
