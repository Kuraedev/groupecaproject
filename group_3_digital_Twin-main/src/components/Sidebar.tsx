// Sidebar component

'use client';

import { SIDEBAR_SECTIONS, PERSON_PROFILE } from '@/lib/config';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({ activeSection = 'chat', onSectionChange }: SidebarProps) {
  const getSectionPrompt = (sectionId: string): string => {
    const prompts: Record<string, string> = {
      chat: '',
      about: 'Tell me about your background, education, and how you got into software engineering.',
      work: 'Walk me through your most recent role and your most impactful project.',
      schedule: "I'd like to schedule a call with you.",
    };
    return prompts[sectionId] || '';
  };

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-60 flex-col border-r border-rule bg-paper px-6 py-8">
      {/* Logo */}
      <div className="mb-4">
        <div className="gradient-text text-2xl font-serif font-bold tracking-tight">
          {PERSON_PROFILE.name.split(' ')[0]}
        </div>
        <div className="text-xs uppercase tracking-widest text-ink-3 mt-0.5">Digital Twin</div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5">
        {SIDEBAR_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              onSectionChange?.(section.id);
              const prompt = getSectionPrompt(section.id);
              if (prompt) {
                const event = new CustomEvent('firePrompt', { detail: prompt });
                window.dispatchEvent(event);
              }
            }}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-sans transition-all duration-150 ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-accent font-medium'
                : 'text-ink-2 hover:bg-paper-2'
            }`}
          >
            <span className={`h-4 w-4 text-current ${activeSection === section.id ? 'opacity-100' : 'opacity-50'}`}>
              {/* Icon placeholder - you can add SVG icons here */}
              ◉
            </span>
            {section.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-rule pt-4 text-xs leading-relaxed text-ink-3">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="status-dot"></span>
          {PERSON_PROFILE.status}
        </div>
        <div className="mb-0.5 font-medium text-ink">{PERSON_PROFILE.role}</div>
        <div className="text-ink-3">{PERSON_PROFILE.location}</div>
      </div>
    </aside>
  );
}
