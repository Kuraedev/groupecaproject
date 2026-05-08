// Header component

'use client';

import { PERSON_PROFILE } from '@/lib/config';

interface HeaderProps {
  onQuickPrompt?: (prompt: string) => void;
}

export function Header({ onQuickPrompt: _onQuickPrompt }: HeaderProps) {
  return (
    <header className="flex flex-shrink-0 items-end justify-between border-b border-rule bg-gradient-to-r from-purple-500/4 to-pink-500/4 px-10 py-6">
      {/* Left side: Name and tagline */}
      <div>
        <div className="text-xs uppercase tracking-widest text-ink-3 mb-1">You're talking to</div>
        <h1 className="gradient-text font-serif text-4xl font-bold tracking-tight mb-2 leading-tight">
          {PERSON_PROFILE.name}
        </h1>
        <p className="text-sm font-light text-ink-2">{PERSON_PROFILE.tagline}</p>
      </div>

      {/* Right side: Contact info */}
      <div className="text-right text-xs text-ink-3 leading-loose">
        <div>
          <a href={`mailto:${PERSON_PROFILE.email}`} className="text-ink-2 hover:text-accent transition-colors">
            {PERSON_PROFILE.email}
          </a>
        </div>
        <div>
          <a href={`https://${PERSON_PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-accent transition-colors">
            {PERSON_PROFILE.linkedin}
          </a>
        </div>
        <div>
          <a href={`https://${PERSON_PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-accent transition-colors">
            {PERSON_PROFILE.github}
          </a>
        </div>
      </div>
    </header>
  );
}
