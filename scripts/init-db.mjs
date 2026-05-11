#!/usr/bin/env node
/**
 * Database initialization script for Neon
 * Run with: npm run db:init
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Pool } from 'pg';

function loadEnvFile() {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }
      const [key, ...valueParts] = trimmed.split('=');
      if (process.env[key] === undefined) {
        process.env[key] = valueParts.join('=').trim();
      }
    }
  } catch {
    // .env.local is optional if DATABASE_URL is already in the environment
  }
}

loadEnvFile();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ ERROR: DATABASE_URL is not set in .env.local');
  console.error('Add your Neon database URL to .env.local');
  process.exit(1);
}

const pool = new Pool({ connectionString });

const schema = `
CREATE TABLE IF NOT EXISTS questions_answers (
  id SERIAL PRIMARY KEY,
  question VARCHAR(500) NOT NULL UNIQUE,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_category ON questions_answers(category);
CREATE INDEX IF NOT EXISTS idx_question ON questions_answers(question);

CREATE TABLE IF NOT EXISTS group_members (
  id SERIAL PRIMARY KEY,
  display_name VARCHAR(200) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  skills TEXT NOT NULL,
  summary TEXT NOT NULL,
  aliases TEXT[] NOT NULL DEFAULT '{}'::text[],
  group_name VARCHAR(100) DEFAULT 'Group 2',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_group_members_name ON group_members(display_name);
CREATE INDEX IF NOT EXISTS idx_group_members_email ON group_members(email);
`;

const sampleData = [
  {
    question: 'Who are the members of Group 2?',
    category: 'team',
    answer: `# Group 2 Members

Group 2 is a team of Information Technology students from St. Paul University who are currently studying and building software projects together.

## Member List

- **Pearlshaline Gumiran**
- **Karl Andrei Castillo**
- **Aniceto Obina Jr**
- **Eunika Nicole Lasam**
- **Jake Cardenas**
- **Kurt Jakes Andrei Butay**
- **Michael Josh Jacinto**
- **Rexie Margarette Vargas**
- **Rhys Cristian Suyu**

## Team Description

The group focuses on learning, collaboration, and building practical IT solutions while studying at St. Paul University.`,
  },
  {
    question: 'What is Group 2 about?',
    category: 'team',
    answer: `# About Group 2

Group 2 is a team of Information Technology students from St. Paul University who are currently studying and developing their skills in software engineering.

We work together on academic projects, portfolio work, and digital twin experiences that show our interests in web development, database systems, UI/UX, and collaborative project building.`,
  },
  {
    question: 'What are your skills?',
    category: 'skills',
    answer: `# Group 2 Technical Skills

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
- **Design Systems:** Component-based architecture`,
  },
  {
    question: 'What projects have you built recently?',
    category: 'projects',
    answer: `# Group 2 Recent Projects

## Digital Twin Project
A comprehensive AI-powered digital twin representing Group 2's collective expertise. Built with:
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
- Cloud deployment projects on AWS`,
  },
  {
    question: 'How do I become a full-stack developer?',
    category: 'learning',
    answer: `# Path to Full-Stack Development

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
- Keep learning and stay updated with trends`,
  },
  {
    question: 'How can I contact the group?',
    category: 'contact',
    answer: `# Contact Group 2

You can reach out to any team member directly via email:

- **General Inquiries:** reggielovett143@gmail.com (Project Lead)
- **Technical Questions:** Contact relevant team member based on expertise

## Team Directory

- **Pearlshaline Gumiran**
- **Karl Andrei Castillo**
- **Aniceto Obina Jr**
- **Eunika Nicole Lasam**
- **Jake Cardenas**
- **Kurt Jakes Andrei Butay**
- **Michael Josh Jacinto**
- **Rexie Margarette Vargas**
- **Rhys Cristian Suyu**

Feel free to reach out with questions, collaboration opportunities, or feedback!`,
  },
  {
    question: 'Group 2 skills',
    category: 'skills',
    answer:
      'Group 2 works across frontend, backend, database, cloud, security, AI/ML, and UI/UX. Ask "What are your skills?" for the full list.',
  },
  {
    question: 'Group 2 tech stack',
    category: 'skills',
    answer:
      'Our stack includes React, Next.js, Node.js, Laravel, PostgreSQL, AWS, and modern DevOps workflows.',
  },
  {
    question: 'Group 2 projects',
    category: 'projects',
    answer:
      'Group 2 projects include a Digital Twin chatbot platform, a portfolio site, and cloud-backed full-stack learning builds.',
  },
  {
    question: 'Tell me about Group 2',
    category: 'team',
    answer:
      'Group 2 is a collaborative BSIT team from St. Paul University focused on practical software development, teamwork, and continuous learning.',
  },
  {
    question: 'Group 2 contact',
    category: 'contact',
    answer:
      'You can contact Group 2 through the listed member emails. Ask "How can I contact the group?" for full details.',
  },
];

const memberData = [
  {
    displayName: 'Rhys Cristian Suyu',
    email: 'suyskristian@gmail.com',
    skills: 'Front-end development, back-end development, responsive UI, collaborative project work',
    summary: 'Rhys focuses on full-stack web development and collaborative software projects.',
    aliases: ['Rhys', 'Rhys Suyu', 'Rhys Cristian T. Suyu'],
  },
  {
    displayName: 'Pearlshaline Gumiran',
    email: 'pearlshinegumiran@gmail.com',
    skills: 'Laravel, JavaScript, application logic, team collaboration',
    summary: 'Pearlshaline contributes backend-friendly application development and JavaScript work.',
    aliases: ['Pearlshaline', 'Pearl Gumiran', 'Gumiran'],
  },
  {
    displayName: 'Aniceto Obina Jr',
    email: 'anicetoakaajobina@gmail.com',
    skills: 'React, Next.js, component design, modern frontend development',
    summary: 'Aniceto works with React and Next.js to build polished user interfaces.',
    aliases: ['Aniceto', 'Aniceto Obina', 'Obina'],
  },
  {
    displayName: 'Eunika Nicole Lasam',
    email: 'eunikanicole@gmail.com',
    skills: 'SQL, PostgreSQL, data modeling, database support',
    summary: 'Eunika handles database work and supports data organization for the team.',
    aliases: ['Eunika', 'Eunica', 'Lasam'],
  },
  {
    displayName: 'Jake Cardenas',
    email: 'marijakee@gmail.com',
    skills: 'DevSecOps, security-focused workflows, deployment discipline',
    summary: 'Jake brings a security-minded approach and a DevSecOps perspective.',
    aliases: ['Jake', 'Cardenas'],
  },
  {
    displayName: 'Kurt Jakes Andrei Butay',
    email: 'kjabutay@gmail.com',
    skills: 'AWS, cloud solutions, deployment support, infrastructure awareness',
    summary: 'Kurt focuses on cloud solutions and AWS-oriented project support.',
    aliases: ['Kurt', 'Butay', 'Kurt Butay'],
  },
  {
    displayName: 'Rexie Margarette Vargas',
    email: 'emiisushi1603@gmail.com',
    skills: 'AI/ML concepts, experimentation, learning-oriented prototyping',
    summary: 'Rexie explores AI and machine learning ideas for the team.',
    aliases: ['Rexie', 'Vargas'],
  },
  {
    displayName: 'Karl Castillo',
    email: 'karlcas721@gmail.com',
    skills: 'Project management, collaboration, coordination, communication',
    summary: 'Karl helps organize teamwork and keep delivery moving.',
    aliases: ['Karl', 'Karl Castillo', 'Castillo'],
  },
];

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing Neon database...\n');

    // Create tables
    console.log('📋 Creating tables...');
    await pool.query(schema);
    console.log('✅ Tables created successfully\n');

    // Insert sample data
    console.log('📝 Inserting sample Q&A data...');
    for (const data of sampleData) {
      try {
        await pool.query(
          'INSERT INTO questions_answers (question, answer, category) VALUES ($1, $2, $3)',
          [data.question, data.answer, data.category]
        );
        console.log(`  ✓ Added: "${data.question}"`);
      } catch (error) {
        // Ignore duplicate key error
        if (error.code === '23505') {
          console.log(`  ⚠ Already exists: "${data.question}"`);
        } else {
          throw error;
        }
      }
    }

    console.log('\n👥 Inserting member directory data...');
    for (const member of memberData) {
      await pool.query(
        `INSERT INTO group_members (display_name, email, skills, summary, aliases, group_name)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (display_name) DO UPDATE SET
           email = EXCLUDED.email,
           skills = EXCLUDED.skills,
           summary = EXCLUDED.summary,
           aliases = EXCLUDED.aliases,
           group_name = EXCLUDED.group_name,
           updated_at = CURRENT_TIMESTAMP`,
        [member.displayName, member.email, member.skills, member.summary, member.aliases, 'Group 2']
      );
      console.log(`  ✓ Added member: "${member.displayName}"`);
    }

    console.log('\n✅ Database initialization complete!\n');
    console.log('You can now start the app with: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
