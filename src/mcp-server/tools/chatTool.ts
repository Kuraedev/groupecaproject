/**
 * Chat Tool - MCP Tool for handling chat interactions
 * Integrates with system prompt from agents.md and validates responses
 * Uses next-app API route /api/chat for OpenAI integration
 */

import type { Tool, ChatInput } from '../types';

export const chatTool: Tool = {
  name: 'chat',
  description:
    'Handle chat interactions with Group 2 Digital Twin. Routes messages to OpenAI API with system prompt validation and source fidelity checking.',
  schema: {
    message: 'required',
    context: 'optional',
    userId: 'optional',
  },
  handler: async (input: Record<string, unknown>): Promise<unknown> => {
    const { message, context, userId } = input as unknown as ChatInput;

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }

    try {
      // Call the Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          context,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        source?: string;
      };

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        reply: data.reply,
        source: data.source || 'openai',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Chat tool failed: ${errorMessage}`);
    }
  },
};
