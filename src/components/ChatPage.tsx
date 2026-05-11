'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState, useRef } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Question = {
  id: number;
  question: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [recentQuestions, setRecentQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Fetch questions from database on component mount
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = (await res.json()) as { questions: Question[] };
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoadingQuestions(false);
      }
    }
    loadQuestions();
  }, []);

  function adjustTextareaHeight() {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    const nextHeight = Math.min(textarea.scrollHeight, 140);
    textarea.style.height = `${nextHeight}px`;
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  async function sendText(text: string, shouldTrackRecent: boolean = false) {
    const normalizedText = text.trim();
    if (!normalizedText || isLoading) {
      return;
    }

    if (shouldTrackRecent) {
      setRecentQuestions((prev) => {
        const updated = [normalizedText, ...prev.filter((q) => q !== normalizedText)];
        return updated.slice(0, 5);
      });
    }

    const nextMessages = [...messages, { role: 'user' as const, content: normalizedText }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, userQuestion: normalizedText }),
      });

      if (!res.ok) {
        throw new Error('Unable to get response.');
      }

      const data = (await res.json()) as { reply?: string };
      const reply = data.reply?.trim() || 'I could not generate a response.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error occurred.';
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) {
      return;
    }

    await sendText(text);
  }

  // Handle clicking a question to send it
  async function handleQuestionClick(question: string) {
    await sendText(question, true);
  }

  async function handleCopyMessage(content: string, idx: number) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageIndex(idx);
      window.setTimeout(() => {
        setCopiedMessageIndex((current) => (current === idx ? null : current));
      }, 1500);
    } catch (error) {
      console.error('Unable to copy message:', error);
    }
  }

  const defaultPromptText = [
    'Who are the members of Group 2?',
    'What are your skills?',
    'What projects have you built recently?',
    'How can I contact the group?',
  ];

  const quickPromptItems = questions.length > 0 ? questions.slice(0, 5).map((q) => q.question) : defaultPromptText;
  const followUpPromptItems =
    recentQuestions.length > 0
      ? recentQuestions
      : questions.length > 0
        ? questions.slice(0, 5).map((q) => q.question)
        : defaultPromptText;

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Digital Twin</p>
          <h1>Group 2</h1>
        </div>
        <Link className="portfolio-link" href="/portfolio">
          Open Portfolio
        </Link>
      </header>

      <section className="chat-panel">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Ask anything about Group 2 members, skills, projects, and contact information.</p>
            <div className="starter-grid">
              {loadingQuestions ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>Loading questions...</p>
              ) : questions.length > 0 ? (
                questions.map((q) => (
                  <button 
                    key={q.id} 
                    type="button" 
                    onClick={() => handleQuestionClick(q.question)}
                    className="question-btn"
                    disabled={isLoading}
                  >
                    {q.question}
                  </button>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#64748b' }}>No questions available</p>
              )}
            </div>
          </div>
        ) : (
          <div className="messages">
            <div className="prompt-strip">
              <p className="prompt-label">Quick prompts</p>
              <div className="prompt-row">
                {loadingQuestions ? (
                  <button type="button" className="chip chip-muted" disabled>
                    Loading prompts...
                  </button>
                ) : (
                  quickPromptItems.map((question, idx) => (
                    <button
                      key={`${question}-${idx}`}
                      type="button"
                      onClick={() => handleQuestionClick(question)}
                      className="chip"
                      disabled={isLoading}
                    >
                      {question}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Show recent questions at the top */}
            {followUpPromptItems.length > 0 && (
              <div className="recent-questions">
                <p className="recent-label">Follow-up prompts</p>
                <div className="recent-grid">
                  {followUpPromptItems.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuestionClick(q)}
                      className="recent-btn"
                      disabled={isLoading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message, idx) => (
              <article key={`${message.role}-${idx}`} className={`msg msg-${message.role}`}>
                <div className="msg-head">
                  <p className="msg-role">{message.role === 'user' ? 'YOU' : 'GROUP 2'}</p>
                  {message.role === 'assistant' && (
                    <button
                      type="button"
                      className="msg-copy"
                      onClick={() => handleCopyMessage(message.content, idx)}
                      title="Copy message"
                    >
                      {copiedMessageIndex === idx ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
                <div className="msg-content">{message.content}</div>
              </article>
            ))}
            
            {isLoading && (
              <article className="msg msg-assistant">
                <p className="msg-role">GROUP 2</p>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </article>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </section>

      <form onSubmit={sendMessage} className="composer">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <div className="composer-input">
          <textarea
            ref={textareaRef}
            id="message"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustTextareaHeight();
            }}
            rows={1}
            placeholder="Type your question..."
            maxLength={300}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e as any);
              }
            }}
          />
          <div className="composer-meta" aria-live="polite">
            <span>Press Enter to send · Shift+Enter for new line</span>
            <span>{input.length}/300</span>
          </div>
        </div>
        <button type="submit" disabled={isLoading || !input.trim()} title="Send message">
          ↑
        </button>
      </form>
    </main>
  );
}
