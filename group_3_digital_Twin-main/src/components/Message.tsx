// Message component

'use client';

import type { Message } from '@/types';
import { formatDate } from '@/utils/helpers';

interface MessageProps {
  message: Message;
  extraHTML?: React.ReactNode;
}

export function MessageComponent({ message, extraHTML }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3.5 animate-fadeUp ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] font-serif text-xs font-medium text-white shadow-md">
          A
        </div>
      )}

      <div className={`flex flex-1 flex-col ${isUser ? 'items-end' : ''}`}>
        <div className="text-xs font-medium uppercase tracking-wider text-ink-3 mb-1">
          {isUser ? 'You' : 'Digital Twin'}
        </div>

        <div className={`text-sm leading-relaxed ${isUser ? 'italic text-ink-2' : 'text-ink font-light'}`}>
          {message.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {message.createdAt && (
          <div className="mt-2 text-xs text-ink-3">
            {formatDate(message.createdAt)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-paper-3 text-xs font-medium text-ink-2" />
      )}

      {extraHTML && <div className="w-full">{extraHTML}</div>}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3.5 animate-fadeUp">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] font-serif text-xs font-medium text-white shadow-md">
        A
      </div>

      <div className="flex flex-col">
        <div className="text-xs font-medium uppercase tracking-wider text-ink-3 mb-1">
          Digital Twin
        </div>

        <div className="flex items-center gap-1 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] animate-blink" />
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] animate-blink animation-delay-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] animate-blink animation-delay-400" />
        </div>
      </div>
    </div>
  );
}
