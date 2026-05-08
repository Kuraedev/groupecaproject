#!/bin/bash
# Setup script for Digital Twin Next.js application

set -e

echo "🚀 Digital Twin II Setup Script"
echo "================================"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "❌ Node.js 18+ is required (you have $(node -v))"
  exit 1
fi
echo "✓ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Create .env.local from example
if [ ! -f .env.local ]; then
  echo "🔐 Creating .env.local..."
  cp .env.example .env.local
  echo "✓ Created .env.local"
  echo ""
  
  echo "⚠️  Please edit .env.local and add your API keys:"
  echo "   - NEXT_PUBLIC_ANTHROPIC_API_KEY"
  echo "   - NEXT_PUBLIC_SUPABASE_URL (optional)"
  echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)"
  echo ""
else
  echo "✓ .env.local already exists"
  echo ""
fi

# Type checking
echo "🔍 Running TypeScript checks..."
npm run type-check
echo "✓ TypeScript checks passed"
echo ""

# Ready to start
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local to add your API keys"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For more info, see NEXTJS_README.md"
