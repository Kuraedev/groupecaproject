const projects = [
  {
    title: 'Digital Twin Portfolio',
    description: 'An AI-powered platform that creates a dynamic digital twin of a person, showcasing their skills, experience, and achievements with audience-tailored content.',
    tech: ['React', 'Node.js', 'Claude AI'],
    link: 'https://github.com/Kuraedev/groupecaproject',
    status: 'Live',
  },
  {
    title: 'AI Content Generator',
    description: 'A tool that uses Claude API to generate professional bios, skill summaries, and project descriptions from raw user input.',
    tech: ['JavaScript', 'Claude API', 'CSS'],
    link: '#',
    status: 'In Progress',
  },
  {
    title: 'Portfolio Dashboard',
    description: 'A real-time analytics dashboard that tracks portfolio views, link clicks, and audience engagement for portfolio owners.',
    tech: ['React', 'PostgreSQL', 'PostHog'],
    link: '#',
    status: 'Planned',
  },
]

const statusColors = {
  'Live': { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', dot: '#22c55e' },
  'In Progress': { bg: 'rgba(168,85,247,0.1)', color: '#a855f7', dot: '#a855f7' },
  'Planned': { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', dot: '#94a3b8' },
}

function Projects() {
  return (
    <section id="projects" style={{
      padding: '120px 60px',
      backgroundColor: '#0d0d1a',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{
            color: '#a855f7', fontSize: '0.8rem', fontWeight: '700',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>What We've Built</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800',
            color: '#f0f0ff', marginTop: '12px', letterSpacing: '-1px',
          }}>Projects</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '20px',
        }}>
          {projects.map((project) => {
            const s = statusColors[project.status]
            return (
              <div key={project.title} style={{
                backgroundColor: '#111127',
                border: '1px solid rgba(168,85,247,0.1)',
                borderRadius: '16px', padding: '28px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                e.currentTarget.style.backgroundColor = '#161630'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168,85,247,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.1)'
                e.currentTarget.style.backgroundColor = '#111127'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ color: '#f0f0ff', fontWeight: '700', fontSize: '1.05rem', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    fontSize: '0.75rem', fontWeight: '600',
                    color: s.color, backgroundColor: s.bg,
                    padding: '3px 10px', borderRadius: '999px',
                    whiteSpace: 'nowrap', marginLeft: '12px',
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: s.dot }} />
                    {project.status}
                  </span>
                </div>
                <p style={{ color: '#9090b0', fontSize: '0.875rem', lineHeight: 1.7, flexGrow: 1 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '0.75rem', fontWeight: '600',
                      color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.08)',
                      border: '1px solid rgba(168,85,247,0.15)',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>{t}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" style={{
                  color: '#a855f7', textDecoration: 'none',
                  fontWeight: '600', fontSize: '0.875rem',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                  View Project <span>→</span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects