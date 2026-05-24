# Implementation Plan

## 1. Goal

Deliver the Digital Twin Career Agent in a sequence that matches the approved design in `docs/design.md` and the product requirements in `docs/prd.md`.

## 2. Work Breakdown

### Phase 1: Foundation

1. Finalize content schemas for profile, projects, experiences, and publication state.
2. Set up the Neon Database tables and seed minimal profile data.
3. Confirm the Next.js route structure for public pages and API handlers.

### Phase 2: Profile and Content Editing

1. Build the profile editor UI.
2. Add validation for profile fields and project metadata.
3. Persist changes through `/api/profile`.
4. Invalidate stale cached summaries after edits.

### Phase 3: AI Generation

1. Implement prompt templates for summary generation, audience tailoring, and interview responses.
2. Add the context loader that pulls only the required facts for a request.
3. Add model output validation and refusal logic for unsupported claims.
4. Store AI drafts for review before publication.

### Phase 4: Public Portfolio

1. Render the published portfolio view.
2. Prioritize the featured skills, projects, and summary sections.
3. Make the page SEO-friendly and fast to load.
4. Add analytics for views and outbound link clicks.

### Phase 5: Export and Review

1. Implement PDF export for the portfolio resume view.
2. Add human review controls for generated content.
3. Support regeneration and manual edits before publishing.

## 3. Dependencies

- Profile schemas must exist before UI forms and API handlers can be completed.
- Supabase persistence must be ready before generation can save drafts and history.
- Validation must be in place before any generated content can be published.
- Public portfolio rendering depends on publication state and cache invalidation.
- PDF export depends on the final portfolio layout being stable.

## 4. Sequencing Rules

- Do not build public sharing before the profile editor and persistence layer are stable.
- Do not enable publish actions until validation and approval flows are working.
- Do not optimize cache behavior before the content model is settled.
- Treat analytics as a late-phase feature because it depends on the public page being stable.

## 5. Resource Considerations

- Keep the initial implementation small enough for one developer to review and test.
- Use existing project tooling and avoid introducing new services unless they are required by the PRD.
- Prefer server-side rendering and route handlers already supported by the current Next.js codebase.
- Use a minimal AI prompt surface so changes to requirements are easier to review.

## 6. Delivery Milestones

### Milestone A: Internal Draft

- Working profile editor
- Working data storage
- Working AI generation draft flow

### Milestone B: Reviewable Product

- Human-approved content flow
- Public portfolio page
- Analytics and export flow

### Milestone C: Submission Ready

- Documentation complete
- Content aligned with `docs/prd.md`
- Implementation traceable through commit history

## 7. Definition of Done

- Each functional requirement in `docs/prd.md` has a matching implementation path.
- Generated content is reviewed before publishing.
- The public portfolio is accessible and fast.
- The repo contains visible design and implementation documentation.

---

## 8. Week 2 Iteration Review

**Review Date:** May 2026  
**Status:** In Progress

### What Was Completed in Week 2

- Scaffolded the Next.js application structure and confirmed route layout.
- Added initial Supabase schema definitions for `profiles`, `projects`, and `experiences` tables.
- Established the AI context loader foundation so that only relevant profile facts are sent per request.
- Validated that the `/api/chat` route returns structured responses consistent with the system prompt rules in `agents.md`.

### Decisions Made

| Decision | Rationale |
|----------|-----------|
| Keep AI temperature at 0.7 | Balances creativity with factual consistency across repeated queries |
| Cache responses for 24 hours | Reduces API cost while keeping profile answers fresh enough for daily updates |
| Validate AI output server-side before delivery | Prevents hallucinated claims from reaching the public portfolio page |

### Issues Identified and Actions

| Issue | Action |
|-------|--------|
| Profile editor form missing field-level validation | Scheduled for Phase 2 completion — tracked in `docs/prd.md` AC-01 |
| PDF export not yet scoped in detail | Confirmed as a Phase 5 (low priority) item; no impact on current sprint |
| Analytics page placeholder only | Will be implemented after the public portfolio is stable (Phase 4) |

### Next Steps for Week 3

- Complete the profile editor UI with field validation (Phase 2).
- Wire AI generation to the context loader and test with at least two audience types (Phase 3).
- Begin the public portfolio render pass (Phase 4 kickoff).
- Review agent behavior rules in `agents.md` against actual API responses and update guardrails if needed.
