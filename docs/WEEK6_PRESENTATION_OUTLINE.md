# Week 6 Presentation Outline

## Project
- **Project Name:** Digital Twin Nexus - Portfolio Edition
- **Team:** Group 2
- **Demo Target:** Week 6 graded presentation
- **Total Time:** 10 minutes

---

## 1. Presentation Objectives (What Graders Should See)
- Show a clear problem-to-solution story.
- Demonstrate functional requirements working in a live flow.
- Prove technical implementation quality (architecture, validation, performance).
- Show team collaboration, traceable progress, and readiness for deployment.

---

## 2. Group 2 Member Lineup (Speaker Order)
1. Karl Andrei Castillo
2. Rhys Cristian T. Suyu
3. Pearlshaline Gumiran
4. Jake Cardenas
5. Rexie Margarette Vargas 
6. Eunika Nicole Lasam
7. Kurt Jakes Andrei Butay 
8. Aniceto Obina Jr
9. Jake Cardenas
10. Rhys Cristian T. Suyu

---

## 3. 10-Minute Easy Script (By Speaker Order)

### 0:00-1:00 | Speaker 1: Karl Andrei Castillo (Opening)
**Say this:**
"Good day, we are Group 2, and our project is Digital Twin Nexus - Portfolio Edition. Our goal is to turn a static resume into a smart, interactive digital profile."

"Today, we will show the problem, our solution, the architecture, performance evidence, and then end with a live demo."

### 1:00-2:00 | Speaker 2: Rhys Cristian T. Suyu (Problem and Goals)
**Say this:**
"The problem is simple: traditional resumes are not adaptive. They do not adjust to recruiters, clients, or collaborators."

"Our solution is an AI-powered portfolio that can organize skills, projects, and experiences, then present them based on audience context."

"This directly aligns with our PRD requirements for profile input, AI summaries, audience tailoring, and public portfolio sharing."

### 2:00-3:00 | Speaker 3: Pearlshaline Gumiran (Architecture)
**Say this:**
"Our system uses Next.js for frontend and API routes, an MCP server layer for tool routing, and AI model integration for responses."

"The MCP layer is important because it gives us input validation, structured handling, and more consistent outputs."

"For data persistence, we use Neon database—a PostgreSQL backend that stores our Group's profile information, including skills, projects, experiences, and conversation history. When users ask the chatbot questions, the system queries this Neon database to retrieve accurate, documented information, ensuring all responses are grounded in real profile data rather than hallucinations."

"This architecture helps reduce malformed requests, keeps responses reliable, and ensures the digital twin has contextual knowledge to answer profile-specific questions accurately."

### 3:00-4:00 | Speaker 4: Jake Cardenas (Feature Walkthrough)
**Say this:**
"In our app, users can ask profile-related questions, simulate interview prompts, and explore portfolio sections including members, skills, and projects."

"The experience is designed to be clear and easy to use, with guided prompts and a clean interface."

"This improves both usability and presentation quality for professional profiles."

### 4:00-5:00 | Speaker 5: Rexie Margarette Vargas and Eunika Nicole Lasam (Implementation Highlights)
**Say this:**
"At this stage, our core implementation is complete: chat flow, interview simulation, and portfolio sections are connected and working together."

"Here's how the system integrates: OpenAI API keys are securely configured in our environment variables, allowing us to call GPT-4 for generating responses and summaries. The Neon PostgreSQL database stores all profile information, which the API routes query before sending context to the AI model. We then deploy the entire application on Vercel, which hosts the Next.js frontend and serverless API routes. These three components work together seamlessly: Vercel serves the app, calls to the OpenAI API are authenticated with secure keys, and the MCP server retrieves contextual data from Neon before composing requests."

"Our architecture supports clean request handling and organized outputs, which helps us present a reliable user experience."

"In the final part, we will show all of this in a short live demo."

### 5:00-6:00 | Speaker 6: Kurt Jakes Andrei Butay and Aniceto Obina Jr (Performance and Reliability)
**Say this:**
"Our improvements focused on reliability and consistency."

"We added validation-first request handling, better response structure, and clear error pathways for invalid input."

"This means safer outputs, fewer malformed requests, and smoother tool behavior during actual use."

### 6:00-7:00 | Speaker 7: Rhys Cristian T. Suyu and Jake Cardenas (Evidence and Team Delivery)
**Say this:**
"For evidence, we tracked work through weekly artifacts, ClickUp board records, and GitHub commit history."

"This gives graders visible proof of team collaboration, incremental development, and documented progress from Week 1 to Week 6."

"All major changes are traceable in repository documentation and commit logs."

### 7:00-10:00 | Speaker 8: Rhys Cristian Suyu (Live Demo + Closing)
**Say this while demonstrating:**
1. "First, we open the Digital Twin chat interface."
2. "Next, we ask a technical question and show the generated response."
3. "Then, we trigger an interview-style prompt to show simulation behavior."
4. "Finally, we open the portfolio page and show members and key sections."


**Then say this to close:**
"Current limitations include ongoing production hardening and additional edge-case testing."

"Our next steps are stronger analytics, deeper personalization, and broader validation coverage."

"To conclude: Group 2 delivered a working Digital Twin platform with clear architecture, validated improvements, and complete evidence tracking. Thank you, and we are ready for your questions."



---

## 4. Slide-by-Slide Outline
1. Introduction
2. Problem and Goals
3. Solution Overview
4. Architecture
5. Feature Walkthrough
6. Implementation Highlights
7. Performance and Reliability 
8. Evidence and Team Delivery
9. Live Demo Steps 
10. Closing (Final Segment)



---

## 5. Demo Checklist (Before Presenting)
- Verify internet connection and deployed app URL access.
- Open required tabs in advance:
  - Live app
  - GitHub repository
  - Evidence docs
- Prepare 2 backup prompts in case one demo prompt fails.
- Keep one teammate ready to take over if audio/screen sharing issues happen.
- Keep a visible timer to stay within 10 minutes.

---

## 6. Grader-Facing Talking Points
- Requirements are mapped to implemented features.
- Architecture choices improved reliability and structure.
- Evidence artifacts show transparent, week-by-week progress.
- Team contributions are visible in commit and documentation history.

---

## 7. Short Presenter Notes
- Speak in concise statements and avoid long technical tangents.
- During demo, narrate user intent before clicking.
- If a failure occurs, explain fallback behavior instead of pausing silently.
- End with outcomes, not just activities.
- Hand off cleanly: each speaker should end with "I will now pass to [next speaker]."

---

**Status:** Ready for Week 6 presentation rehearsal and final slide conversion.