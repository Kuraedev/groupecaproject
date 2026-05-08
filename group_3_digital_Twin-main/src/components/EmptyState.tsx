// Empty state component for initial state

'use client';

import { INTRO_CARDS } from '@/lib/config';

interface EmptyStateProps {
  onCardClick: (prompt: string) => void;
}

export function EmptyState({ onCardClick }: EmptyStateProps) {
  return (
    <div className="max-w-chat mx-auto py-12 px-4">
      {/* Divider */}
      <div className="mb-8 grid grid-cols-3 items-center gap-4">
        <hr className="border-rule" />
        <span className="text-center text-xs uppercase tracking-widest text-ink-3">Start a conversation</span>
        <hr className="border-rule" />
      </div>

      {/* Intro cards */}
      <div className="grid grid-cols-2 gap-3">
        {INTRO_CARDS.map((card, idx) => (
          <button
            key={idx}
            onClick={() => onCardClick(card.title)}
            className="rounded-card border border-purple-500/18 bg-paper p-4 text-left transition-all duration-150 hover:border-pink-500/30 hover:bg-gradient-to-br hover:from-purple-500/4 hover:to-pink-500/4 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className="gradient-text mb-1 text-xs font-medium uppercase tracking-widest">
              {card.label}
            </div>
            <div className="text-sm leading-relaxed text-ink">{card.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
