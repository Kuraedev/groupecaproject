# MCP Server - Digital Twin

## Overview

The **Model Context Protocol (MCP) Server** is a tool layer that extends the Digital Twin AI assistant with structured, callable functionality. It provides tools for chat handling, interview simulation, and portfolio management.

## Architecture

```
src/mcp-server/
├── index.ts           # Main MCP server entry point and router
├── types.ts          # TypeScript interfaces and types
└── tools/            # Individual tool implementations
    ├── chatTool.ts   # Chat interaction handler
    ├── interviewTool.ts   # Interview simulation
    └── portfolioTool.ts   # Portfolio information queries

.vscode/
└── mcp.json         # MCP server configuration

jobs/
├── interview-questions.json    # Interview session data
└── simulation-data.json        # Simulation scenarios and contexts
```

## Tools

### 1. Chat Tool

**Purpose:** Handle conversational interactions with the Digital Twin AI assistant

**Features:**
- Integrates with Next.js API route `/api/chat`
- Routes to OpenAI API with system prompt validation
- Supports context awareness and user identification
- Validates responses against source fidelity rules

**Usage:**
```json
{
  "toolName": "chat",
  "input": {
    "message": "What are the team's key skills?",
    "context": "team-overview",
    "userId": "user123"
  }
}
```

### 2. Interview Simulation Tool

**Purpose:** Simulate technical and behavioral interviews using STAR format

**Features:**
- Loads interview questions from `jobs/interview-questions.json`
- Supports 3 difficulty levels: beginner, intermediate, advanced
- 2 formats: technical and behavioral
- Provides STAR format instructions for behavioral questions
- Returns expected topics and sample answers

**Usage:**
```json
{
  "toolName": "interview",
  "input": {
    "questionId": "tech-02",
    "difficulty": "advanced",
    "memberId": "karl-castillo"
  }
}
```

### 3. Portfolio Tool

**Purpose:** Query team member information, skills, and projects

**Features:**
- Returns team member profiles
- Filterable by skills, projects, or experience
- Supports individual member queries or full team overview
- Integrates with portfolio database

**Usage:**
```json
{
  "toolName": "portfolio",
  "input": {
    "memberId": "rhys-suyu",
    "filterBy": "skills"
  }
}
```

## Configuration

### .vscode/mcp.json

Configuration file that specifies:
- MCP server location and launch command
- Enabled tools and features
- Feature flags for context awareness, role adaptation, source validation, and hallucination prevention

```json
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": ["src/mcp-server/index.js"],
      "enabled": true
    }
  }
}
```

## Job Data

### interview-questions.json

Contains interview scenarios with:
- Question ID and difficulty level
- Expected topics for evaluation
- Sample answers (for AI training)
- Format (technical or behavioral)

### simulation-data.json

Contains simulation scenarios for:
- Recruiter interactions
- Client presentations
- Technical deep-dives
- Post-project user interviews

## Integration with agents.md

The MCP Server implements the behavioral guidelines from `agents.md`:

1. **Source Fidelity:** Tools validate responses against documented team information
2. **No Hallucination:** Portfolio and interview tools return only documented data
3. **Context Consistency:** Chat tool provides consistent responses
4. **Professional Tone:** All tool outputs maintain professional communication
5. **Boundary Awareness:** Tools redirect to humans when appropriate

## Usage in API Routes

The MCP server is integrated into the Next.js API routes:

```typescript
import mcpServer from '@/mcp-server';

// Route a tool request
const response = await mcpServer.handleMCPRequest({
  toolName: 'chat',
  input: { message: 'Hello' }
});

// List available tools
const tools = mcpServer.listTools();

// Get tool details
const chatTool = mcpServer.getTool('chat');
```

## Week 3 Implementation Status

- ✅ MCP Server core (`index.ts`)
- ✅ Tool interface and types (`types.ts`)
- ✅ Chat tool integration (`chatTool.ts`)
- ✅ Interview simulation tool (`interviewTool.ts`)
- ✅ Portfolio query tool (`portfolioTool.ts`)
- ✅ Configuration file (`.vscode/mcp.json`)
- ✅ Job data files (`interview-questions.json`, `simulation-data.json`)
- ⏳ Full deployment and testing (Week 3)

## Future Enhancements

- [ ] Real-time streaming responses for chat
- [ ] Advanced NLP for interview question classification
- [ ] Database-backed portfolio queries
- [ ] Analytics and conversation logging
- [ ] Custom tool creation framework
- [ ] Performance monitoring and optimization

---

**Created:** 2026-05-10  
**Status:** Week 3 Implementation  
**Team:** Group 2 Digital Twin
