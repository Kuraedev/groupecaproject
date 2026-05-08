import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-header">
        <div>
          <p className="eyebrow">Connected Experience</p>
          <h1>Portfolio</h1>
          <p>The portfolio site is now linked from the digital twin app and served inside this route.</p>
        </div>
        <Link href="/" className="portfolio-link">
          Back to Digital Twin
        </Link>
      </header>

      <section className="portfolio-embed-wrap">
        <iframe
          title="Group 2 Portfolio"
          src="/portfolio/index.html"
          className="portfolio-embed"
        />
      </section>
    </main>
  );
}
