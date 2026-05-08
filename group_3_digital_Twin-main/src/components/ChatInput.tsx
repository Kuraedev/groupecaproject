// Chat input component

'use client';

import { useRef, useEffect } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-rule bg-paper px-10 py-6">
      <div className="max-w-chat mx-auto flex gap-2.5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything…"
          rows={1}
          className="flex-1 resize-none rounded-btn border border-purple-500/25 bg-paper px-4 py-3 text-sm font-light text-ink outline-none transition-all duration-150 placeholder:text-ink-3 hover:border-purple-500/40 focus:border-accent focus:shadow-input shadow-sm"
          style={{
            maxHeight: '140px',
          }}
        />

        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-md transition-all duration-150 hover:opacity-85 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="Send message"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8h12M8 2l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="max-w-chat mx-auto mt-2 text-center text-xs text-ink-3">
        This is an AI-powered version of Alex. For urgent matters, email directly.
      </div>
    </div>
  );
}
