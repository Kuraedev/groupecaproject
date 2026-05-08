// Main chat page component

'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { QuickPrompts } from '@/components/QuickPrompts';
import { MessageComponent, TypingIndicator } from '@/components/Message';
import { EmptyState } from '@/components/EmptyState';
import { ChatInput } from '@/components/ChatInput';
import { CTASchedule, LeadForm } from '@/components/CTACards';
import { useChat } from '@/hooks/useChat';
import { detectIntent } from '@/utils/helpers';

export default function ChatPage() {
  const { messages, isLoading, error, conversationId, sendMessage, clearError } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [activeSection, setActiveSection] = useState('chat');
  const chatScrollRef = useRef<HTMLDivElement>(null);

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
    <div className="flex h-screen bg-paper">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main content */}
      <div className="ml-60 flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Quick prompts */}
        <QuickPrompts onPromptClick={handleQuickPrompt} disabled={isLoading} />

        {/* Chat scroll area */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto bg-paper px-10 py-8 scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          <div className="mx-auto max-w-chat space-y-7">
            {messages.length === 0 ? (
              <EmptyState onCardClick={handleCardClick} />
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
                    if (lastIntent === 'schedule') {
                      extraHTML = (
                        <CTASchedule
                          onClick={() => alert('Calendar integration coming soon!')}
                        />
                      );
                    } else if (lastIntent === 'lead') {
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
                  <div className="rounded-card border border-red-300 bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
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
        </div>

        {/* Input bar */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => handleSendMessage()}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
