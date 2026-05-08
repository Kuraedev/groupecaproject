// Artemis Chat Page Component

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageComponent, TypingIndicator } from '@/components/Message';
import { LeadForm } from '@/components/CTACards';
import { useChat } from '@/hooks/useChat';
import { detectIntent } from '@/utils/helpers';
import {
  ARTEMIS_PERSONA,
  ARTEMIS_QUICK_PROMPTS,
  ARTEMIS_INTRO_CARDS,
  ARTEMIS_PROFILE,
  ARTEMIS_SIDEBAR_SECTIONS,
} from '@/lib/artemis-config';

export default function ArtemisChatPage() {
  const { messages, isLoading, error, conversationId, sendMessage, clearError } = useChat({
    systemPrompt: ARTEMIS_PERSONA,
  });
  const [inputValue, setInputValue] = useState('');
  const [activeSection, setActiveSection] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Fetch members from DB when Members tab is opened
  useEffect(() => {
    if (activeSection === 'members' && members.length === 0) {
      setMembersLoading(true);
      fetch('/api/members')
        .then((r) => r.json())
        .then((data) => setMembers(data.members ?? []))
        .catch(() => {})
        .finally(() => setMembersLoading(false));
    }
  }, [activeSection, members.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleFirePrompt = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      handleSendMessage(customEvent.detail);
    };

    window.addEventListener('firePrompt', handleFirePrompt);
    return () => window.removeEventListener('firePrompt', handleFirePrompt);
  }, []);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    sendMessage(messageText);
    if (!text) setInputValue('');
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleCardClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const getIntentForLastUserMessage = (): 'schedule' | 'lead' | 'general' => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        return detectIntent(messages[i].content);
      }
    }
    return 'general';
  };

  const lastIntent = getIntentForLastUserMessage();
  const showCTA = messages.length > 0 && !isLoading;

  return (
    <div className="flex h-screen bg-paper flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed md:relative left-0 top-0 z-10 h-screen w-60 flex-col border-r border-rule bg-paper px-6 py-8">
        <div className="mb-4">
          <div className="gradient-text text-2xl font-serif font-bold tracking-tight">
            {ARTEMIS_PROFILE.name}
          </div>
          <div className="text-xs uppercase tracking-widest text-ink-3 mt-0.5">
            {ARTEMIS_PROFILE.role}
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5">
          {ARTEMIS_SIDEBAR_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-sans transition-all duration-150 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-accent font-medium'
                  : 'text-ink-2 hover:bg-paper-2'
              }`}
            >
              <span className={`h-4 w-4 text-current ${activeSection === section.id ? 'opacity-100' : 'opacity-50'}`}>
                ◉
              </span>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-rule pt-4 text-xs leading-relaxed text-ink-3">
          <Link
            href="/artemis"
            className="block w-full rounded-lg border border-purple-500/25 bg-purple-500/5 px-3 py-2 text-sm text-accent text-center hover:bg-purple-500/10 transition-all mb-4 font-medium"
          >
            ← Back to Landing
          </Link>

          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="status-dot"></span>
            {ARTEMIS_PROFILE.status}
          </div>
          <div className="mb-0.5 font-medium text-ink">{ARTEMIS_PROFILE.role}</div>
          <div className="text-ink-3">{ARTEMIS_PROFILE.location}</div>
        </div>
      </aside>

      {/* Mobile Sidebar Dropdown */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="absolute left-0 top-0 h-screen w-56 bg-paper border-r border-rule flex flex-col p-6 shadow-lg">
            <div className="mb-6">
              <div className="gradient-text text-2xl font-serif font-bold tracking-tight">
                {ARTEMIS_PROFILE.name}
              </div>
              <div className="text-xs uppercase tracking-widest text-ink-3 mt-0.5">
                {ARTEMIS_PROFILE.role}
              </div>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 mb-8">
              {ARTEMIS_SIDEBAR_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-sans transition-all duration-150 text-left ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-accent font-medium'
                      : 'text-ink-2 hover:bg-paper-2'
                  }`}
                >
                  <span className={`h-4 w-4 text-current ${activeSection === section.id ? 'opacity-100' : 'opacity-50'}`}>
                    ◉
                  </span>
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Back to Landing */}
            <div className="border-t border-rule pt-4 space-y-3">
              <Link
                href="/artemis"
                onClick={() => setSidebarOpen(false)}
                className="block w-full rounded-lg border border-purple-500/25 bg-purple-500/5 px-3 py-2 text-sm text-accent text-center hover:bg-purple-500/10 transition-all"
              >
                Back to Landing
              </Link>

              <div className="text-xs leading-relaxed text-ink-3">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="status-dot"></span>
                  {ARTEMIS_PROFILE.status}
                </div>
                <div className="mb-0.5 font-medium text-ink">{ARTEMIS_PROFILE.role}</div>
                <div className="text-ink-3">{ARTEMIS_PROFILE.location}</div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-0 flex flex-1 flex-col w-full">
        {/* Header */}
        <header className="flex flex-shrink-0 items-center md:items-end justify-between border-b border-rule bg-gradient-to-r from-purple-500/4 to-pink-500/4 px-4 md:px-10 py-4 md:py-6 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-purple-500/25 hover:bg-paper-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest text-ink-3 mb-1">Welcome to</div>
            <h1 className="gradient-text font-serif text-2xl md:text-4xl font-bold tracking-tight mb-1 md:mb-2 leading-tight">
              {ARTEMIS_PROFILE.name}
            </h1>
            <p className="text-xs md:text-sm font-light text-ink-2">{ARTEMIS_PROFILE.tagline}</p>
          </div>

          <div className="hidden md:block text-right text-xs text-ink-3 leading-loose">
            <div>{ARTEMIS_PROFILE.description}</div>
          </div>
        </header>

        {/* Quick prompts — hidden on Members view */}
        {activeSection !== 'members' && (
          <div className="flex flex-shrink-0 flex-wrap gap-2 border-b border-rule bg-paper px-4 md:px-10 py-3 md:py-4 overflow-x-auto">
            {ARTEMIS_QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap rounded-full border border-purple-500/25 bg-purple-500/5 px-3.5 py-1.5 text-xs text-accent transition-all duration-150 hover:border-pink-500/30 hover:bg-pink-500/8 hover:text-accent-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Members panel */}
        {activeSection === 'members' && (
          <div className="flex-1 overflow-y-auto bg-paper px-4 md:px-10 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="gradient-text font-serif text-2xl font-bold mb-1">Group 3 Members</h2>
                <p className="text-sm text-ink-3">{members.length > 0 ? `${members.length} members` : 'IT Students'} · IT Students</p>
              </div>
              {membersLoading ? (
                <div className="flex items-center justify-center py-12 text-ink-3 text-sm">Loading members…</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 rounded-card border border-purple-500/18 bg-paper p-4 hover:border-pink-500/30 hover:bg-gradient-to-br hover:from-purple-500/4 hover:to-pink-500/4 transition-all duration-150"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-ink truncate">{member.name}</div>
                        <a
                          href={`mailto:${member.email}`}
                          className="text-xs text-ink-3 hover:text-accent transition-colors truncate block"
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat scroll area */}
        {activeSection !== 'members' && <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto bg-paper px-4 md:px-10 py-6 md:py-8 scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          <div className="mx-auto max-w-chat space-y-4 md:space-y-7">
            {messages.length === 0 ? (
              <div className="max-w-chat mx-auto py-8 md:py-12 px-2 md:px-4">
                <div className="mb-6 md:mb-8 grid grid-cols-3 items-center gap-4">
                  <hr className="border-rule" />
                  <span className="text-center text-xs uppercase tracking-widest text-ink-3">
                    Start a conversation
                  </span>
                  <hr className="border-rule" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {ARTEMIS_INTRO_CARDS.map((card, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCardClick(card.title)}
                      className="rounded-card border border-purple-500/18 bg-paper p-3 md:p-4 text-left transition-all duration-150 hover:border-pink-500/30 hover:bg-gradient-to-br hover:from-purple-500/4 hover:to-pink-500/4 hover:shadow-sm hover:-translate-y-0.5"
                    >
                      <div className="gradient-text mb-1 text-xs font-medium uppercase tracking-widest">
                        {card.label}
                      </div>
                      <div className="text-xs md:text-sm leading-relaxed text-ink">{card.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, idx) => {
                  let extraHTML: React.ReactNode = null;

                  // Show CTA for the last assistant message
                  if (
                    message.role === 'assistant' &&
                    idx === messages.length - 1 &&
                    showCTA
                  ) {
                    if (lastIntent === 'lead') {
                      extraHTML = (
                        <LeadForm
                          conversationId={conversationId}
                          onSubmitSuccess={() => {
                            console.log('Lead submitted');
                          }}
                        />
                      );
                    }
                  }

                  return (
                    <MessageComponent
                      key={message.id}
                      message={message}
                      extraHTML={extraHTML}
                    />
                  );
                })}

                {isLoading && <TypingIndicator />}

                {error && (
                  <div className="rounded-card border border-red-300 bg-red-50 p-3 md:p-4">
                    <div className="text-xs md:text-sm text-red-700">{error}</div>
                    <button
                      onClick={clearError}
                      className="mt-2 text-xs underline hover:no-underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>}

        {/* Input bar */}
        {activeSection !== 'members' && (
          <div className="flex-shrink-0 border-t border-rule bg-paper px-4 md:px-10 py-4 md:py-6">
            <div className="max-w-chat mx-auto flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLoading && inputValue.trim()) {
                      handleSendMessage();
                    }
                  }
                }}
                placeholder="Ask the Digital Twin of Group 3 anything…"
                rows={1}
                className="flex-1 resize-none rounded-btn border border-purple-500/25 bg-paper px-3 md:px-4 py-2 md:py-3 text-sm font-light text-ink outline-none transition-all duration-150 placeholder:text-ink-3 hover:border-purple-500/40 focus:border-accent focus:shadow-input shadow-sm"
                style={{
                  maxHeight: '140px',
                }}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-md transition-all duration-150 hover:opacity-85 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
                aria-label="Send message"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8h12M8 2l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="max-w-chat mx-auto mt-2 text-center text-xs text-ink-3">
  Group 3 Digital Twin · Powered by OpenRouter AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
