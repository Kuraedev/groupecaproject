/**
 * MCP Server for Digital Twin AI Assistant
 * Provides tools for chat, interview simulation, and portfolio management
 * Based on agents.md configuration and Group 2 requirements
 */

import type { Tool } from './types';
import { chatTool } from './tools/chatTool';
import { interviewTool } from './tools/interviewTool';
import { portfolioTool } from './tools/portfolioTool';

interface MCPRequest {
  toolName: string;
  input: Record<string, unknown>;
}

interface MCPResponse {
  success: boolean;
  result?: unknown;
  error?: string;
}

/**
 * Available tools registry
 */
const tools: Record<string, Tool> = {
  chat: chatTool,
  interview: interviewTool,
  portfolio: portfolioTool,
};

/**
 * Main MCP server handler
 * Routes requests to appropriate tools based on agents.md configuration
 */
export async function handleMCPRequest(request: MCPRequest): Promise<MCPResponse> {
  const { toolName, input } = request;

  // Validate tool exists
  if (!tools[toolName]) {
    return {
      success: false,
      error: `Tool '${toolName}' not found. Available tools: ${Object.keys(tools).join(', ')}`,
    };
  }

  try {
    const tool = tools[toolName];

    // Validate input against tool schema
    if (!validateInput(input, tool.schema)) {
      return {
        success: false,
        error: `Invalid input for tool '${toolName}'. Expected: ${JSON.stringify(tool.schema)}`,
      };
    }

    // Execute tool
    const result = await tool.handler(input);

    return {
      success: true,
      result,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Tool execution failed: ${errorMessage}`,
    };
  }
}

/**
 * Validate input against tool schema
 */
function validateInput(input: Record<string, unknown>, schema: Record<string, string>): boolean {
  // Basic validation - check required fields
  for (const field of Object.keys(schema)) {
    if (schema[field] === 'required' && !input[field]) {
      return false;
    }
  }
  return true;
}

/**
 * List all available tools
 */
export function listTools(): Array<{ name: string; description: string }> {
  return Object.entries(tools).map(([name, tool]) => ({
    name,
    description: tool.description,
  }));
}

/**
 * Get tool details
 */
export function getTool(name: string): Tool | null {
  return tools[name] || null;
}

// Export for use in API routes
export default { handleMCPRequest, listTools, getTool };
