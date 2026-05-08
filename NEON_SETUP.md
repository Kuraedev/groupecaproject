# Neon Database Setup Guide

## 🎯 Overview

Your Digital Twin now uses **Neon** (a serverless PostgreSQL database) to store and retrieve Q&A pairs. When you click on a question, it fetches the answer from the database instead of just typing it into the chat.

## 📋 Setup Steps

### Step 1: Create a Neon Account & Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up for a free account (no credit card required for free tier)
3. Create a new project
4. Copy your database connection string (looks like: `postgresql://user:password@host/dbname`)

### Step 2: Add DATABASE_URL to `.env.local`

Edit `.env.local` and replace the empty `DATABASE_URL`:

```env
DATABASE_URL=postgresql://user:password@your-neon-host/dbname?sslmode=require
```

**⚠️ Important:** Use the **full connection string** from Neon, including the `?sslmode=require` part.

### Step 3: Install New Dependencies

```bash
npm install
```

This installs the `pg` package needed for database connections.

### Step 4: Initialize the Database

Run the database setup script to create tables and add sample Q&A:

```bash
npm run db:init
```

You should see output like:
```
🔧 Initializing Neon database...

📋 Creating tables...
✅ Tables created successfully

📝 Inserting sample Q&A data...
  ✓ Added: "Who are the members of Group 3?"
  ✓ Added: "What are your skills?"
  ✓ Added: "What projects have you built recently?"
  ✓ Added: "How do I become a full-stack developer?"
  ✓ Added: "How can I contact the group?"

✅ Database initialization complete!
```

### Step 5: Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll see questions from the database!

---

## ✨ How It Works

### Questions Page (Empty State)
- When you first load the chat, it fetches all questions from the database
- These appear as clickable buttons
- Clicking a question sends it as a message

### Fetching Answers
When you click a question or type your own:

1. **Database Check** → System searches the database for a matching question
2. **If Found** → Returns the pre-stored answer from the database (fast!)
3. **If Not Found** → Uses OpenAI GPT-4 to generate a response
4. **AI Fallback** → If no API key, shows a fallback message

### API Endpoints

#### Get All Questions
```bash
GET /api/questions
```
Returns: `{ questions: [{ id, question }, ...] }`

#### Get Specific Question & Answer
```bash
GET /api/questions/[id]
```
Returns: `{ id, question, answer, category, created_at }`

#### Send Message (Chat)
```bash
POST /api/chat
```
Body: `{ messages: [...], userQuestion: "..." }`

---

## 🗄️ Database Schema

The `questions_answers` table has:

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL | Primary key, auto-increment |
| `question` | VARCHAR(500) | The question text (unique) |
| `answer` | TEXT | The answer (supports markdown) |
| `category` | VARCHAR(100) | Topic category (team, skills, projects, learning, contact) |
| `created_at` | TIMESTAMP | Auto-timestamp |
| `updated_at` | TIMESTAMP | Auto-timestamp |

---

## 🔧 Managing Q&A

### Add a New Q&A Pair

You can add Q&A directly to the database. Either:

#### Option 1: SQL Query (via Neon Console)
```sql
INSERT INTO questions_answers (question, answer, category) 
VALUES ('Your question?', 'Your answer here...', 'category-name');
```

#### Option 2: Use the API (coming soon)
We can add an admin endpoint to add Q&A programmatically.

### Update Existing Q&A

```sql
UPDATE questions_answers 
SET answer = 'Updated answer...' 
WHERE id = 1;
```

### Delete Q&A

```sql
DELETE FROM questions_answers WHERE id = 1;
```

---

## 🐛 Troubleshooting

### "DATABASE_URL is not set"
- Make sure `.env.local` has `DATABASE_URL` set
- Restart the dev server after adding it

### "Connection refused" or "Network error"
- Verify your Neon connection string is correct
- Check that Neon project is active
- Ensure `?sslmode=require` is in the connection string

### "duplicate key value violates unique constraint"
- This is normal when running `npm run db:init` twice
- It means the Q&A already exist (ignore the warning)

### Questions not showing
- Check browser console for errors (F12)
- Verify database is initialized: `npm run db:init`
- Check that `/api/questions` returns data

---

## 📚 Next Steps

1. ✅ Add DATABASE_URL to `.env.local`
2. ✅ Run `npm install` to install `pg`
3. ✅ Run `npm run db:init` to create tables
4. ✅ Run `npm run dev` to start the app
5. 🎉 Click questions and see database answers!

---

## 💡 Tips

- Answers support **Markdown** formatting (bold, lists, code blocks, etc.)
- Questions are case-insensitive when searching
- The system prioritizes database answers over AI (database answers are instant!)
- You can manage the database directly from [Neon Console](https://console.neon.tech)

---

**Need Help?**
- Neon Docs: https://neon.tech/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Next.js Docs: https://nextjs.org/docs
