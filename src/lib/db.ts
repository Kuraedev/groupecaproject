/**
 * Database schema and initialization for Neon
 * Run this script to create tables in your Neon database
 */

export const schema = `
-- Create questions_answers table
CREATE TABLE IF NOT EXISTS questions_answers (
  id SERIAL PRIMARY KEY,
  question VARCHAR(500) NOT NULL UNIQUE,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_category ON questions_answers(category);
CREATE INDEX IF NOT EXISTS idx_question ON questions_answers(question);

-- Insert sample Q&A data
INSERT INTO questions_answers (question, answer, category) VALUES
  (
    'Who are the members of Group 2?',
    '# Group 2 Members

Group 2 is a team of Information Technology students from St. Paul University who are currently studying and building software projects together:

- **Rhys Cristian T. Suyu** (suyskristian@gmail.com) – Front-end and back-end development specialist
- **Pearlshaline Gumiran** (pearlshinegumiran@gmail.com) – Laravel and JavaScript expert
- **Aniceto Obina Jr.** (anicetoakaajobina@gmail.com) – React and Next.js wizard
- **Eunica Nicole Lasam** (eunikanicole@gmail.com) – SQL and PostgreSQL expert
- **Jake Cardenas** (marijakee@gmail.com) – DevSecOps enthusiast
- **Kurt Jakes Andrei Butay** (kjabutay@gmail.com) – AWS and cloud solutions specialist
- **Rexie Margarette Vargas** (emiisushi1603@gmail.com) – AI/ML tinkerer
- **Karl Castillo** (karlcas721@gmail.com) – Project management and collaboration lead',
    'team'
  ),
  (
    'What are your skills?',
    '# Group 2 Technical Skills

## Web Development
- **Frontend:** React, Next.js, Vue.js, Tailwind CSS, HTML/CSS
- **Backend:** Node.js, Express, Laravel, Python
- **Full-Stack:** MERN Stack, Next.js with PostgreSQL

## Database & Backend
- **Database:** PostgreSQL, MySQL, MongoDB
- **ORMs:** Prisma, Sequelize, Eloquent

## DevOps & Cloud
- **Cloud Platforms:** AWS, Azure
- **DevOps:** Docker, Kubernetes, CI/CD pipelines
- **Tools:** Git, GitHub Actions, Jenkins

## Security & AI/ML
- **Security:** Secure coding, penetration testing, cryptography
- **AI/ML:** TensorFlow, machine learning fundamentals, data analysis

## Design
- **UI/UX:** Figma, user experience design, responsive design
- **Design Systems:** Component-based architecture',
    'skills'
  ),
  (
    'What projects have you built recently?',
    '# Group 2 Recent Projects

## Digital Twin Project
A comprehensive AI-powered digital twin representing Group 2\'s collective expertise. Built with:
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Next.js API routes
- **Database:** Neon (PostgreSQL)
- **AI Integration:** OpenAI GPT-4 Turbo
- **Features:** Chat interface, Q&A system, Portfolio showcase, Dynamic responses

## Portfolio Website
A modern, interactive portfolio showcasing team member profiles and projects:
- **Technology:** React + Vite, Tailwind CSS
- **Features:** Hero section, skills showcase, project gallery, contact form
- **Responsive Design:** Mobile-first approach

## Other Achievements
- Multiple hackathon participations
- Open-source contributions
- Learning projects in various stacks (MERN, Laravel, Python)
- Cloud deployment projects on AWS',
    'projects'
  ),
  (
    'How do I become a full-stack developer?',
    '# Path to Full-Stack Development

## Foundation Skills
1. **HTML, CSS, JavaScript** – Master the fundamentals
2. **Version Control** – Git and GitHub workflow
3. **Command Line** – Terminal/Command Prompt proficiency

## Frontend Development
1. **JavaScript Frameworks** – Learn React, Vue, or Next.js
2. **State Management** – Redux, Context API, or other solutions
3. **CSS & Styling** – Tailwind CSS, SCSS, responsive design
4. **UI/UX Basics** – User experience principles

## Backend Development
1. **Choose a Language** – Node.js/Express, Python/Django, PHP/Laravel, or Java
2. **Databases** – SQL (PostgreSQL, MySQL) and NoSQL (MongoDB)
3. **APIs** – REST APIs, GraphQL
4. **Authentication** – JWT, OAuth, session management

## DevOps & Deployment
1. **Docker & Containerization** – Understand containerized applications
2. **Cloud Platforms** – AWS, Azure, or Google Cloud
3. **CI/CD** – GitHub Actions, Jenkins
4. **Database Management** – Backup, scaling, optimization

## Recommended Learning Path
- Month 1-2: Frontend fundamentals (HTML, CSS, JavaScript)
- Month 3-4: React or Next.js
- Month 5-6: Backend (Node.js + Express or Python)
- Month 7-8: Databases and APIs
- Month 9-10: Full-stack project
- Month 11-12: DevOps and deployment

## Key Advice
- Build projects as you learn
- Contribute to open-source
- Join communities and collaborate
- Keep learning and stay updated with trends',
    'learning'
  ),
  (
    'How can I contact the group?',
    '# Contact Group 2

You can reach out to any team member directly via email:

- **General Inquiries:** reggielovett143@gmail.com (Project Lead)
- **Technical Questions:** Contact relevant team member based on expertise

## Team Directory

**Frontend Experts:**
- Justin Joeff Lacerona: laceronalustin83@gmail.com

**Backend/Full-Stack:**
- Engiemar Balanay: engiebalanay@gmail.com
- King Yohann Ilahn A. Tomas: yohanntomas2@gmail.com

**Database/SQL:**
- John Nino Miranda: miranda011406@gmail.com

**DevOps/Cloud:**
- Charles Andrew Bassig: charlesbassig20@gmail.com
- Vince Avena: vinceavenal2@gmail.com

**AI/ML:**
- Ira Zenith Ginaia Alias: irazeniithalis@gmail.com

**UI/UX Design:**
- Cyrene Joy Lopez: lopezycyrene515@gmail.com

**Security:**
- Aaron Josh Pocot: aaronjoshpocot@gmail.com

Feel free to reach out with questions, collaboration opportunities, or feedback!',
    'contact'
  )
ON CONFLICT (question) DO NOTHING;
`;

export async function initializeDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  try {
    const response = await fetch(dbUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: schema }),
    });

    if (!response.ok) {
      throw new Error(`Database initialization failed: ${response.statusText}`);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
