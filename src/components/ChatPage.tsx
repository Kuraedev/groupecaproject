'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [recentQuestions, setRecentQuestions] = useState<string[]>([]);

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

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    const text = input.trim();
    if (!text || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, userQuestion: text }),
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

  // Handle clicking a question to send it
  async function handleQuestionClick(question: string) {
    // Add to recent questions (keep last 5)
    setRecentQuestions((prev) => {
      const updated = [question, ...prev.filter((q) => q !== question)];
      return updated.slice(0, 5);
    });

    setInput(question);
    const nextMessages = [...messages, { role: 'user' as const, content: question }];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, userQuestion: question }),
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

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Digital Twin</p>
          <h1>Group 2 Assistant</h1>
        </div>
        <Link className="portfolio-link" href="/portfolio">
          Open Portfolio
        </Link>
      </header>

      <section className="chat-panel">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Ask anything about our skills, projects, and experience.</p>
            <div className="starter-grid">
              {loadingQuestions ? (
                <p>Loading questions...</p>
              ) : questions.length > 0 ? (
                questions.map((q) => (
                  <button 
                    key={q.id} 
                    type="button" 
                    onClick={() => handleQuestionClick(q.question)}
                    className="question-btn"
                  >
                    {q.question}
                  </button>
                ))
              ) : (
                <p>No questions available</p>
              )}
            </div>
          </div>
        ) : (
          <div className="messages">
            {/* Show recent questions at the top */}
            {recentQuestions.length > 0 && (
              <div className="recent-questions">
                <p className="recent-label">Quick follow-up:</p>
                <div className="recent-grid">
                  {recentQuestions.map((q, idx) => (
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
                <p className="msg-role">{message.role === 'user' ? 'YOU' : 'DIGITAL TWIN'}</p>
                <p>{message.content}</p>
              </article>
            ))}
            
            {isLoading && (
              <article className="msg msg-assistant">
                <p className="msg-role">DIGITAL TWIN</p>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </article>
            )}
          </div>
        )}
      </section>

      <form onSubmit={sendMessage} className="composer">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Type your question..."
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </main>
  );
}
