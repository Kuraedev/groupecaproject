'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const starterPrompts = [
  'Tell me about your technical background.',
  'What projects have you built recently?',
  'How would you approach a full-stack web app?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        body: JSON.stringify({ messages: nextMessages }),
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
              {starterPrompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setInput(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, idx) => (
              <article key={`${message.role}-${idx}`} className={`msg msg-${message.role}`}>
                <p className="msg-role">{message.role === 'user' ? 'You' : 'Digital Twin'}</p>
                <p>{message.content}</p>
              </article>
            ))}
            {isLoading ? <p className="typing">Digital twin is thinking...</p> : null}
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
