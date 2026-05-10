# Design Document

## 1. Overview

This document turns `docs/prd.md` into an implementation-ready design for the Digital Twin Career Agent. The goal is to present a publicly shareable portfolio experience that can generate accurate, audience-aware content while staying grounded in the user’s documented profile data.

The design follows the requirements in `docs/prd.md` and the agent guardrails defined in `agents.md`.

## 2. Architecture

### 2.1 High-Level Structure

- Next.js app routes serve the public portfolio and the authenticated editor experience.
- API routes handle profile updates, AI generation, validation, and analytics.
- Supabase stores profile data, conversation history, generated content, and user/session state.
- A model orchestration layer builds prompts from approved profile data and system instructions.
- Cache and logging layers reduce repeated AI calls and preserve auditability.

### 2.2 Main Components

#### Frontend

- Portfolio landing page for public viewing
- Editor for profile, projects, and AI-generated summaries
- Interview/chat interface for audience-specific responses
- Review controls to approve, edit, or reject AI output

#### API Layer

- `/api/profile` for reading and writing profile data
- `/api/chat` for guided AI responses
- `/api/interview` for scenario-based interview simulation
- `/api/analytics` for view and click tracking

#### Context Loader

- Loads the user’s canonical profile record
- Pulls relevant projects, skills, experiences, and tone settings
- Builds the minimal context needed for the current request

#### Agent Orchestrator

- Selects the correct prompt template by request type
- Adds the required system rules from `agents.md`
- Calls the language model with bounded generation settings
- Runs post-processing to keep responses aligned with source data

#### Validation and Guardrails

- Rejects unsupported claims or off-profile content
- Checks that the response references documented facts
- Flags content for human review when confidence is low

#### Data and Cache Layer

- Supabase tables store profile data, generated drafts, and conversation history
- Cache stores repeated AI responses and common page fragments
- Logs preserve generated content and important user actions

## 3. Data Flow

### 3.1 Profile Update Flow

1. A user edits skills, experience, or project data in the editor.
2. The frontend submits validated data to `/api/profile`.
3. The API persists the update in Supabase.
4. The system invalidates any cached summaries affected by the change.
5. The portfolio preview refreshes with the updated content.

### 3.2 AI Summary Generation Flow

1. The user requests a new summary or audience-specific version.
2. The API loads the canonical profile context.
3. The agent orchestrator builds a prompt from `agents.md` rules and `docs/prd.md` requirements.
4. The model returns a draft summary.
5. Validation checks factual alignment and tone.
6. The draft is shown to the user for approval or editing.

### 3.3 Public Portfolio Flow

1. A visitor opens the public portfolio URL.
2. The app loads published content only.
3. The page renders featured skills, projects, and summary.
4. Analytics records the view.

## 4. Technical Decisions

### 4.1 Next.js App Router

Use App Router for server-side rendering, route handlers, and mixed public/private UX. This keeps the public portfolio fast while still supporting authenticated editing.

### 4.2 Supabase as Primary Store

Use Supabase because the project already depends on a PostgreSQL-backed profile store and needs structured profile data, histories, and publication state.

### 4.3 Prompt-First AI Design

All AI responses should come from structured prompts built from approved profile facts. This reduces hallucination risk and keeps generated content consistent across requests.

### 4.4 Human Review Gate

AI-generated content must be reviewed before publication. The user can edit or reject drafts, which satisfies the PRD requirement that generated content is not blindly published.

### 4.5 Caching Strategy

Cache repeated requests for public portfolio renders and common summary generations, but invalidate cache whenever the source profile changes.

### 4.6 Accessibility and Performance

Use semantic HTML, responsive layouts, and server rendering to meet the accessibility and performance targets defined in `docs/prd.md`.

## 5. Implementation Notes

- Keep profile data canonical and do not let generated summaries become the source of truth.
- Store source facts separately from rendered content.
- Use explicit schemas for skills, projects, and experiences so generated content can be traced back to a source record.
- Keep generation templates small and specific so they are easier to validate and test.

## 6. Acceptance Mapping

- FR-01 to FR-05 map to the profile editor, generation flow, and public portfolio pages.
- FR-06 to FR-09 map to editing, regeneration, logging, and approval workflows.
- FR-10 and FR-11 map to export and analytics subsystems.
