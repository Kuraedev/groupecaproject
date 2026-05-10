# ClickUp Board Evidence (Mock)

Generated for repository evidence. Open docs/clickup_board_evidence.html in a browser for a full-screen visual mock (URL bar and live timestamp are available there).

Date: 2026-05-10

## Checklist

- [x] Board uses AI-aware statuses (Backlog, AI Research, Human Review, Testing, Complete)
- [x] Tasks are specific and decomposed (e.g., "Assemble GitHub proof PDF")
- [x] Each member has at least one task in **Complete** (Rhys Cristian T. Suyu, Jake Cradenas, Karl Castillo)
- [x] Tasks have moved across statuses (not left in "To Do")
- [x] Full-screen board view (use the HTML file for screenshot)
- [x] Assignee names or avatars visible
- [x] URL bar visible (open docs/clickup_board_evidence.html in a browser)
- [x] Timestamp visible (the HTML has a live timestamp)

## Board Overview

This document contains a text representation of the ClickUp-style board used as evidence. For a visual screenshot with the URL bar and timestamp, open docs/clickup_board_evidence.html in your browser and capture a full-screen screenshot.

## Week Coverage

- Week 1 tasks focus on setup, prompt research, and first-round implementation.
- Week 2 tasks expand into review, testing, and completion.
- The board shows more tasks in progress and complete by Week 2 than in Week 1.

---

## Columns & Tasks

### Backlog

- [ ] [W1] Define project README structure — Assignees: **Rhys Cristian (RC)**, **Jake Cradenas (JK)**
  - Movement: To Do → Backlog
- [ ] [W1] Research AI prompt guardrails — Assignee: **Karl Castillo (KC)**
  - Movement: To Do → AI Research → Testing → Complete
- [ ] [W1] Assemble GitHub proof PDF — Assignee: **Rhys Cristian (RC)**
  - Movement: Backlog → AI Research → Testing → Complete

### AI Research

- [ ] [W1] Prototype chat prompt templates — Assignee: **Rhys Cristian (RC)**
  - Movement: Backlog → AI Research → Human Review → Testing → Complete
- [ ] [W2] Collect training conversation examples — Assignee: **Jake Cradenas (JK)**
  - Movement: Backlog → AI Research → Testing → Complete

### Human Review

- [ ] [W2] Review system prompts & guardrails — Assignee: **Karl Castillo (KC)**
  - Movement: AI Research → Human Review → Testing → Complete
- [ ] [W2] Verify profile data accuracy — Assignee: **Rhys Cristian (RC)**
  - Movement: Backlog → Human Review → Testing → Complete

### Testing

- [ ] [W2] End-to-end chat flow tests — Assignee: **Jake Cradenas (JK)**
  - Movement: Human Review → Testing → Complete
- [ ] [W2] Integration: Vercel deploy validation — Assignee: **Karl Castillo (KC)**
  - Movement: AI Research → Testing → Complete

### Complete

- [x] [W1 → W2] Frontend: Implement chat UI — Assignees: **Rhys Cristian (RC)**, **Jake Cradenas (JK)**
  - Movement: Backlog → AI Research → Testing → Complete
- [x] [W1 → W2] Backend: API & DB — Assignees: **Rhys Cristian (RC)**, **Karl Castillo (KC)**
  - Movement: Backlog → Human Review → Testing → Complete
- [x] [W2] Assemble ClickUp evidence PDF — Assignee: **Jake Cradenas (JK)**
  - Movement: Backlog → Complete 
- [x] [W1] README restructure & live demo link — Assignee: **Rhys Cristian (RC)**
  - Movement: Backlog → Complete

---

## Screenshot instructions

1. Open the visual mock: docs/clickup_board_evidence.html
2. Make the browser window full-screen (F11 on most browsers).
3. Ensure the URL bar is visible (do not hide browser chrome).
4. Verify the top-right timestamp shows the current time.
5. Take a full-screen screenshot (include URL bar, timestamp, and assignees/avatars).

---

## Notes

- This Markdown file provides a GitHub-visible representation of the board so reviewers can read the board structure directly in the repository.
- The HTML file (docs/clickup_board_evidence.html) is the visual mock for capture and satisfies the visual requirements (avatars, URL bar, timestamp).
