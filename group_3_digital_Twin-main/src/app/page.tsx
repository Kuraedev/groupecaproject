// Main landing page - Redirect to Artemis

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/artemis');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper via-paper-2 to-paper-3 flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-4 text-6xl animate-pulse">🚀</div>
        <h1 className="gradient-text text-3xl font-bold mb-2">Artemis</h1>
        <p className="text-ink-2">Loading...</p>
      </div>
    </div>
  );
}
