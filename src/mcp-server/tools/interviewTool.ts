/**
 * Interview Simulation Tool - MCP Tool for technical interview simulation
 * Based on agents.md interview simulation requirements
 * Loads interview questions from jobs/interview-questions.json
 * Uses STAR format for responses per agent configuration
 */

import type { Tool, InterviewInput } from '../types';

const INTERVIEW_DATA_PATH = './jobs/interview-questions.json';

interface InterviewQuestion {
  id: string;
  question: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedTopics: string[];
  format: 'technical' | 'behavioral';
}

export const interviewTool: Tool = {
  name: 'interview',
  description:
    'Simulate technical or behavioral interviews for Group 2 members. Uses STAR format (Situation, Task, Action, Result) and loads from interview job configuration.',
  schema: {
    questionId: 'required',
    difficulty: 'optional',
    memberId: 'optional',
  },
  handler: async (input: Record<string, unknown>): Promise<unknown> => {
    const { questionId, difficulty = 'intermediate', memberId } = input as InterviewInput;

    if (!questionId || typeof questionId !== 'string') {
      throw new Error('questionId is required');
    }

    try {
      // Load interview questions from jobs folder
      const interviewQuestions = await loadInterviewQuestions();

      const question = interviewQuestions.find((q) => q.id === questionId);
      if (!question) {
        throw new Error(`Interview question '${questionId}' not found`);
      }

      // Filter by difficulty if specified
      if (difficulty && question.difficulty !== difficulty) {
        throw new Error(`Question difficulty mismatch. Expected: ${difficulty}, Got: ${question.difficulty}`);
      }

      return {
        questionId,
        question: question.question,
        difficulty: question.difficulty,
        format: question.format,
        expectedTopics: question.expectedTopics,
        instructions: getInterviewInstructions(question.format),
        memberId: memberId || 'default',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Interview tool failed: ${errorMessage}`);
    }
  },
};

/**
 * Load interview questions from jobs/interview-questions.json
 */
async function loadInterviewQuestions(): Promise<InterviewQuestion[]> {
  try {
    // In production, this would read from the jobs folder
    // For now, return sample data
    return [
      {
        id: 'tech-01',
        question: 'Explain the difference between var, let, and const in JavaScript.',
        difficulty: 'beginner',
        expectedTopics: ['JavaScript', 'scope', 'hoisting', 'declarations'],
        format: 'technical',
      },
      {
        id: 'tech-02',
        question: 'Design a system to handle high-traffic API requests efficiently.',
        difficulty: 'advanced',
        expectedTopics: ['scalability', 'caching', 'load balancing', 'database optimization'],
        format: 'technical',
      },
      {
        id: 'behav-01',
        question:
          'Tell me about a time when you had to work with a difficult team member. How did you handle it?',
        difficulty: 'intermediate',
        expectedTopics: ['collaboration', 'conflict resolution', 'communication', 'leadership'],
        format: 'behavioral',
      },
    ];
  } catch (error) {
    throw new Error(`Failed to load interview questions: ${error}`);
  }
}

/**
 * Get interview instructions based on format
 */
function getInterviewInstructions(format: string): string {
  if (format === 'behavioral') {
    return `Use STAR format:
- Situation: Describe the context and challenge
- Task: Clarify your role and objectives
- Action: Explain what you did and your decision-making process
- Result: Share the outcome and what you learned`;
  }

  return `Technical format:
- Explain your approach clearly
- Discuss design decisions and trade-offs
- Provide code examples or pseudocode if applicable
- Acknowledge any limitations or alternative approaches`;
}
