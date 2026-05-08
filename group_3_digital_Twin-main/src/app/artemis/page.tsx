// Artemis Landing Page

'use client';

import Link from 'next/link';

export default function ArtemisLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-paper via-paper-2 to-paper-3">
      {/* Navigation */}
      <nav className="border-b border-rule bg-paper/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="gradient-text font-serif text-xl md:text-2xl font-bold">Group 3</div>
          <Link
            href="/chat"
            className="rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white shadow-md transition-opacity hover:opacity-85 whitespace-nowrap"
          >
            Launch Chat →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 md:mb-6 text-xs uppercase tracking-widest text-ink-3">
            Welcome to
          </div>

          <h1 className="gradient-text font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Group 3 Digital Twin
          </h1>

          <p className="text-lg md:text-xl text-ink-2 mb-3 md:mb-4 font-light leading-relaxed">
            An AI-powered digital twin representing Group 3 — IT students building the future
          </p>

          <p className="text-base md:text-lg text-ink-3 mb-8 md:mb-10 leading-relaxed">
            Skilled in HTML, CSS, JavaScript, SQL, Laravel, Next.js, React, and PostgreSQL
          </p>

          <Link
            href="/chat"
            className="inline-block rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-medium text-white shadow-lg transition-all hover:opacity-85 hover:shadow-xl active:scale-95"
          >
            Chat with our Digital Twin →
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Innovation */}
          <div className="rounded-card border border-purple-500/20 bg-paper p-6 md:p-8 hover:border-purple-500/40 transition-all">
            <div className="gradient-text mb-3 md:mb-4 text-2xl md:text-3xl font-bold">🚀</div>
            <h3 className="text-lg md:text-xl font-semibold text-ink mb-2 md:mb-3">Innovation</h3>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed">
              Pushing boundaries and exploring new ideas. We embrace creativity and encourage out-of-the-box thinking.
            </p>
          </div>

          {/* Collaboration */}
          <div className="rounded-card border border-purple-500/20 bg-paper p-6 md:p-8 hover:border-purple-500/40 transition-all">
            <div className="gradient-text mb-3 md:mb-4 text-2xl md:text-3xl font-bold">🤝</div>
            <h3 className="text-lg md:text-xl font-semibold text-ink mb-2 md:mb-3">Collaboration</h3>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed">
              Building together as one. We believe in the power of teamwork and peer learning to achieve great things.
            </p>
          </div>

          {/* Growth */}
          <div className="rounded-card border border-purple-500/20 bg-paper p-6 md:p-8 hover:border-purple-500/40 transition-all">
            <div className="gradient-text mb-3 md:mb-4 text-2xl md:text-3xl font-bold">📈</div>
            <h3 className="text-lg md:text-xl font-semibold text-ink mb-2 md:mb-3">Growth</h3>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed">
              Continuous improvement and development. We support each other to reach new heights and unlock potential.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-card border border-purple-500/25 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 md:p-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-3 md:mb-4">
              Want to learn more?
            </h2>
            <p className="text-base md:text-lg text-ink-2 mb-6 md:mb-8 leading-relaxed">
              Chat with our Digital Twin to learn about Group 3, our skills, our portfolio, and how to become a full-stack developer.
            </p>
            <Link
              href="/chat"
              className="inline-block rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-6 md:px-8 py-3 md:py-3.5 text-xs md:text-sm font-medium text-white shadow-lg transition-all hover:opacity-85 active:scale-95"
            >
              Start Conversation →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-paper/50 py-6 md:py-8 px-4 md:px-6 text-center text-xs md:text-sm text-ink-3">
        <p>Group 3 Digital Twin · Powered by OpenRouter AI · Built with Next.js + Neon</p>
      </footer>
    </div>
  );
}
