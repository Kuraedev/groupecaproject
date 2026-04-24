# 🤖 agents.md — Agent Architecture & Conventions

**Project:** Digital Twin Nexus — Portfolio Edition
**Version:** 1.0
**Last Updated:** April 2026

> This document defines the AI agent roles, tech stack, architecture conventions, and inter-agent communication patterns for the Digital Twin Nexus portfolio platform. All contributors must follow the conventions defined here.

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **AI / LLM** | Claude (Anthropic) via API | Bio generation, skill summarization, audience tailoring |
| **Backend** | Node.js + Express | REST API, agent orchestration, user profile management |
| **Frontend** | React + Tailwind CSS | Portfolio editor, public portfolio pages, dashboard |
| **Database** | PostgreSQL | User profiles, portfolio sections, AI draft history |
| **File Storage** | AWS S3 | Project images, uploaded PDFs, exported resume files |
| **Auth** | Auth0 | Secure user authentication and session management |
| **Deployment** | Docker + GitHub Actions | Containerized CI/CD pipeline |
| **Cloud** | AWS (ECS + RDS + S3) | Hosting, managed database, file storage |
| **Analytics** | PostHog (self-hosted) | Portfolio view tracking, link click analytics |

---

## 2. Agent Roles

### 🔵 Agent 1: Profile Ingestion Agent
- **Role:** Accepts raw user input (form data or uploaded JSON) and normalizes it into a structured portfolio data model. Validates completeness and flags missing sections.
- **Trigger:** User submits or updates their profile form
- **Output:** Structured profile object stored in the database (skills array, experience array, projects array, education array)
- **Human Handoff:** Flags incomplete sections (e.g., missing dates, vague descriptions) for the user to review before AI generation proceeds

---

### 🟡 Agent 2: AI Content Generation Agent
- **Role:** Takes the structured profile and uses Claude to generate polished, professional copy — including a bio, skill highlights, project descriptions, and section summaries. Adapts tone and emphasis based on the selected target audience.
- **Trigger:** User clicks "Generate" or "Regenerate" for any portfolio section
- **Output:** AI-drafted text for each portfolio section, stored as a draft pending user approval
- **Human Handoff:** All AI-generated content is shown to the user as a draft. Nothing is published without explicit user review and approval (per FR-09 / AC-04)

**Audience Tailoring Logic:**

| Audience | Emphasis |
|----------|---------|
| Recruiter | Measurable outcomes, role titles, years of experience |
| Client | Problem-solving, deliverables, results |
| Collaborator | Technical depth, tools used, process |
| General | Balanced overview of skills and personality |

---

### 🟢 Agent 3: Portfolio Presentation Agent
- **Role:** Assembles the approved portfolio content into a clean, publicly shareable web page at a unique URL. Handles layout, ordering of sections, and featured project highlighting.
- **Trigger:** User clicks "Publish" after approving their content
- **Output:** A rendered, publicly accessible portfolio page
- **Human Handoff:** User controls what is visible on the public page — all sections can be toggled on/off before and after publishing

---

### 🔴 Agent 4: Export & Analytics Agent
- **Role:** Handles PDF resume generation from the approved portfolio content, and collects anonymized analytics (views, link clicks) for the portfolio owner's dashboard.
- **Trigger (Export):** User clicks "Export as PDF"
- **Trigger (Analytics):** Passive — fires on every public portfolio page visit
- **Output:** Formatted PDF resume file (download) + analytics event logged to PostHog
- **Human Handoff:** PDF is previewed before download. Analytics data is aggregated and displayed on the owner dashboard — no raw visitor data is exposed

---

## 3. Architecture & Conventions

### 3.1 Agent Communication Pattern
All agents are triggered sequentially based on user actions. No agent publishes content or takes external action without a human approval step in between.

```
User Input
    ↓
[Profile Ingestion Agent]       →  Structured Profile Object
    ↓
[AI Content Generation Agent]   →  Draft Content (pending review)
    ↓
User Reviews & Approves
    ↓
[Portfolio Presentation Agent]  →  Live Public Portfolio Page
    ↓
[Export & Analytics Agent]      →  PDF Export / View Tracking
```

### 3.2 Code Conventions
- All agent files live in `/src/agents/` and follow the naming pattern `[name]-agent.js`
- Each agent exports a single async `run(payload)` function
- All agent outputs must include: `agentId`, `timestamp`, `status`, `payload`
- Error handling: all agents use try/catch and surface errors to the user via the UI with actionable messages (not raw stack traces)

### 3.3 Human-in-the-Loop Policy
This platform is built on the principle that the user — not the AI — owns their professional identity. Agents assist but never override. Specifically:
- No AI-generated content is published without explicit user approval
- Users can edit any AI draft before publishing
- All previously generated drafts are stored and accessible (not overwritten)
- Users can revert to any prior version of any section

### 3.4 Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `dev` | Integration branch for ongoing work |
| `feature/[name]` | Individual feature branches |

---

## 4. Requirements Reference

All agent behavior must satisfy the requirements defined in [`/docs/prd.md`](./docs/prd.md).

Key requirement mappings:

| Agent | Requirements Covered |
|-------|---------------------|
| Profile Ingestion Agent | FR-01, AC-01 |
| AI Content Generation Agent | FR-02, FR-03, FR-09, AC-02, AC-03, AC-04 |
| Portfolio Presentation Agent | FR-04, FR-05, FR-08, AC-05 |
| Export & Analytics Agent | FR-10, FR-11, AC-06, AC-07 |

---

*This document is maintained by the project lead. Changes require a pull request and review.*
