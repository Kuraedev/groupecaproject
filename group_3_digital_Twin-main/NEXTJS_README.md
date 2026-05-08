# Digital Twin II - Next.js Web Application

A full-stack Next.js application that creates an AI-powered digital twin interface. This application hosts a conversational AI persona that can interact with visitors, handle scheduling, and capture leads.

## 🎯 Project Overview

This is a production-ready web application featuring:

- **React Components** - Modern, reusable UI built with React 18
- **Next.js 14+ App Router** - Server-side rendering and API routes
- **Tailwind CSS** - Utility-first styling with custom design system
- **TypeScript** - Full type safety across the application
- **Anthropic Claude API** - AI-powered chat responses
- **Supabase Integration** - PostgreSQL database for conversations and leads
- **Email Capture & CTA** - Lead generation flows

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat completion endpoint
│   │   └── leads/         # Lead capture endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ChatPage.tsx       # Main chat interface
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Application header
│   ├── QuickPrompts.tsx   # Quick prompt buttons
│   ├── Message.tsx        # Message display
│   ├── EmptyState.tsx     # Initial empty state
│   ├── ChatInput.tsx      # Text input area
│   ├── CTACards.tsx       # CTA and lead forms
│   └── index.ts           # Component exports
├── hooks/
│   └── useChat.ts         # Chat state management hook
├── lib/
│   ├── config.ts          # App configuration & constants
│   └── supabase.ts        # Supabase client setup
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils/
    └── helpers.ts         # Utility functions

Configuration Files:
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.ts         # Next.js config
├── tailwind.config.ts     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── .env.example           # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- An Anthropic API key (for Claude)
- Supabase account (optional, for data persistence)

### Installation

1. **Clone and setup**
   ```bash
   cd Digital-twin2
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```env
   NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 💬 How It Works

### Chat Flow

1. **User Input** → User types message in chat input
2. **Message Sent** → Message added to conversation history
3. **API Call** → Message sent to `/api/chat` endpoint
4. **AI Response** → Anthropic Claude generates contextual response
5. **Display** → Response displayed in chat with formatting
6. **Intent Detection** → System detects if user wants to schedule or provide info
7. **CTA Display** → Shows appropriate call-to-action (schedule button or lead form)

### Components

- **ChatPage** - Main orchestrator managing chat state and display
- **Sidebar** - Navigation and profile information
- **Header** - Title, contact info, and branding
- **QuickPrompts** - Suggested conversation starters
- **Message** - Individual message display (user/assistant)
- **EmptyState** - Initial conversation cards
- **ChatInput** - Textarea with auto-resize and send button
- **CTACards** - Scheduling CTA and lead capture form

### API Endpoints

#### POST `/api/chat`
Handles AI chat completions

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What's your experience?" },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "reply": "...",
  "modelId": "claude-sonnet-4-20250514",
  "stopReason": "end_turn"
}
```

#### POST `/api/leads`
Captures lead information

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "role": "Engineering Manager",
  "conversationId": "conv-123"
}
```

**Response:**
```json
{
  "message": "Lead captured successfully",
  "leadId": "lead-456"
}
```

## 🎨 Styling

The application uses **Tailwind CSS** with a custom color scheme:

```css
--ink: #1a0a2e           /* Primary text */
--ink-2: #6b4d8a         /* Secondary text */
--ink-3: #a98ec4         /* Tertiary text */
--paper: #fdf8ff         /* Background */
--accent: #7c3aed        /* Primary accent */
--accent-2: #db2777      /* Secondary accent */
```

All colors are defined in `tailwind.config.ts` and can be customized.

## 🔧 Development

### Available Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

### Key Features

1. **Auto-scrolling chat** - Messages scroll into view automatically
2. **Typing indicators** - Shows AI thinking animation
3. **Auto-expanding textarea** - Input grows as user types
4. **Intent detection** - System recognizes schedule/lead requests
5. **Error handling** - Graceful error display and recovery
6. **Responsive design** - Works on desktop and mobile

## 🗄️ Database Setup (Optional)

To enable conversation persistence and lead tracking:

1. **Create Supabase tables:**

```sql
-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  messages JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  conversation_id UUID REFERENCES conversations(id),
  created_at TIMESTAMP DEFAULT now()
);
```

2. **Enable Supabase in code:**
   - Update `.env.local` with Supabase credentials
   - Uncomment Supabase calls in `src/app/api/leads/route.ts`
   - Implement conversation storage in `useChat` hook

## 📝 Configuration

Edit `src/lib/config.ts` to customize:

- **PERSONA** - AI character system prompt
- **QUICK_PROMPTS** - Suggested conversation starters
- **INTRO_CARDS** - Initial empty state cards
- **PERSON_PROFILE** - Name, role, contact info
- **API limits and timeouts**

## 🔐 Security

- **Environment variables** - Sensitive keys stored in `.env.local` (never committed)
- **Input validation** - All user inputs validated server-side
- **Headers** - CORS and security headers configured
- **Error handling** - Errors logged but never expose internals to users

## 🚀 Deployment

### Deploy to Vercel

```bash
# Push to GitHub first
git push origin main

# Then connect to Vercel:
# 1. Go to vercel.com
# 2. Import this repository
# 3. Add environment variables
# 4. Deploy
```

### Deploy to Other Platforms

Works with any Node.js hosting (Heroku, Railway, Render, etc.):

```bash
npm run build
npm start
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🐛 Troubleshooting

**Chat not sending:**
- Check if `NEXT_PUBLIC_ANTHROPIC_API_KEY` is set
- Check browser console for errors
- Verify API key is valid

**Styling looks wrong:**
- Run `npm install` to ensure Tailwind is installed
- Check that `src/app/globals.css` is imported in layout
- Clear build cache: `rm -rf .next`

**Build errors:**
- Run `npm run type-check` to check TypeScript
- Ensure all imports use correct paths
- Check Node version: `node --version` (should be 18+)

## 📞 Support

For issues or questions, check:
1. The [agents.md](./agents.md) file for AI architecture details
2. The [PRD.md](./docs/prd.md) for product requirements
3. Component comments for implementation details

## 📄 License

This project is part of the Digital Twin series. See LICENSE file for details.

---

**Last Updated:** April 2026  
**Version:** 2.0 (Next.js)
