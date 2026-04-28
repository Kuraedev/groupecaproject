const projects = [
  {
    num: '001',
    title: 'Digital Twin Portfolio',
    desc: 'An AI-powered platform that creates a dynamic digital twin of a person, showcasing their skills and achievements with audience-tailored content.',
    tech: ['React', 'Node.js', 'Claude AI'],
    status: 'Live',
    link: 'https://github.com/Kuraedev/groupecaproject',
  },
  {
    num: '002',
    title: 'AI Content Generator',
    desc: 'A tool that uses Claude API to generate professional bios, skill summaries, and project descriptions from raw user input.',
    tech: ['JavaScript', 'Claude API', 'CSS'],
    status: 'In Progress',
    link: '#',
  },
  {
    num: '003',
    title: 'Portfolio Dashboard',
    desc: 'A real-time analytics dashboard tracking portfolio views, link clicks, and audience engagement for portfolio owners.',
    tech: ['React', 'PostgreSQL', 'PostHog'],
    status: 'Planned',
    link: '#',
  },
]

const statusStyle = {
  'Live':        { color: '#6ee7b7', bg: 'rgba(110,231,183,0.08)' },
  'In Progress': { color: 'var(--gold)', bg: 'var(--gold-glow)' },
  'Planned':     { color: 'var(--text-2)', bg: 'rgba(136,136,153,0.08)' },
}

export default function Projects() {
  return (
    <section id="projects" style={{
      padding: '120px 48px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div className="section-label">04 — Projects</div>
      <h2 className="display-heading" style={{ marginBottom: '64px' }}>
        What We've Built
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {projects.map(p => {
          const s = statusStyle[p.status]
          return (
            <div key={p.num} className="card" style={{
              padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text-3)', letterSpacing: '0.1em',
                }}>{p.num}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: s.color, background: s.bg,
                  padding: '3px 10px', borderRadius: '99px',
                  letterSpacing: '0.06em',
                }}>{p.status}</span>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: '600',
                  fontSize: '1.25rem', color: 'var(--text)',
                  marginBottom: '12px', lineHeight: 1.3,
                }}>{p.title}</h3>
                <p style={{
                  color: 'var(--text-2)', fontSize: '0.85rem',
                  lineHeight: 1.8, fontWeight: '300',
                }}>{p.desc}</p>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <a href={p.link} target="_blank" rel="noreferrer" style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'var(--gold)', textDecoration: 'none',
                letterSpacing: '0.08em',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'gap 0.25s ease, opacity 0.25s ease',
                borderTop: '1px solid rgba(201,168,76,0.08)',
                paddingTop: '16px', opacity: 0.8,
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '12px'; e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.gap = '6px'; e.currentTarget.style.opacity = '0.8' }}>
                VIEW PROJECT <span>→</span>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}