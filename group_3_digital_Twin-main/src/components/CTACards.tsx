// CTA cards components

'use client';

import { useState } from 'react';
import { validateEmail } from '@/utils/helpers';

interface CTAScheduleProps {
  onClick?: () => void;
}

export function CTASchedule({ onClick }: CTAScheduleProps) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-card border border-purple-500/25 bg-gradient-to-r from-purple-500/6 to-pink-500/6 p-4">
      <div className="text-sm text-ink-2">
        <strong className="text-ink">Let&apos;s talk.</strong> Book a 30-min intro call directly on my calendar.
      </div>
      <button
        onClick={onClick}
        className="flex-shrink-0 rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-4 py-2 text-sm font-medium text-white shadow-md transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        Book a call →
      </button>
    </div>
  );
}

interface LeadFormProps {
  conversationId: string;
  onSubmitSuccess?: () => void;
}

export function LeadForm({ conversationId, onSubmitSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    const isValidEmail = await validateEmail(formData.email);
    if (!isValidEmail) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          conversationId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit lead');
      }

      setSubmitted(true);
      onSubmitSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 rounded-card border border-purple-500/25 bg-paper p-4 text-center text-sm text-ink-2">
        ✓ Got it — I&apos;ll be in touch soon. Thanks, <strong>{formData.name}</strong>!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-card border border-purple-500/20 bg-paper p-5">
      <div className="mb-3 text-sm font-medium text-ink">Drop your details and I&apos;ll follow up within 24 hours.</div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="col-span-1 rounded-btn border border-purple-500/20 bg-paper-2 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
        <input
          type="email"
          name="email"
          placeholder="Work email"
          value={formData.email}
          onChange={handleChange}
          className="col-span-1 rounded-btn border border-purple-500/20 bg-paper-2 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="col-span-1 rounded-btn border border-purple-500/20 bg-paper-2 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
        <input
          type="text"
          name="role"
          placeholder="Role / context"
          value={formData.role}
          onChange={handleChange}
          className="col-span-1 rounded-btn border border-purple-500/20 bg-paper-2 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      {error && <div className="mb-2 text-xs text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-btn bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-3 py-2.5 text-sm font-medium text-white shadow-md transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send →'}
      </button>
    </form>
  );
}
