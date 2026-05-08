// Quick prompts component

'use client';

import { QUICK_PROMPTS } from '@/lib/config';

interface QuickPromptsProps {
  onPromptClick: (prompt: string) => void;
  disabled?: boolean;
}

export function QuickPrompts({ onPromptClick, disabled = false }: QuickPromptsProps) {
  return (
    <div className="flex flex-shrink-0 flex-wrap gap-2 border-b border-rule bg-paper px-10 py-4">
      {QUICK_PROMPTS.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onPromptClick(prompt)}
          disabled={disabled}
          className="whitespace-nowrap rounded-full border border-purple-500/25 bg-purple-500/5 px-3.5 py-1.5 text-xs text-accent transition-all duration-150 hover:border-pink-500/30 hover:bg-pink-500/8 hover:text-accent-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
