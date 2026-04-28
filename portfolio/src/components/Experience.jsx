const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    period: '2024 – Present',
    desc: 'Built AI-powered web applications and portfolio platforms for clients using React, Node.js, and Claude API.',
    tags: ['React', 'Node.js', 'Claude AI'],
  },
  {
    role: 'AI Research Assistant',
    company: 'Digital Twin Nexus',
    period: '2024 – Present',
    desc: 'Researched and implemented AI agent architectures for dynamic portfolio generation and audience-tailored content.',
    tags: ['AI Agents', 'Prompt Engineering'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2023 – 2024',
    desc: 'Developed responsive UI components using React and Tailwind CSS, improving page load speed by 40%.',
    tags: ['React', 'CSS', 'Performance'],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '120px 48px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div className="section-label">03 — Experience</div>
      <h2 className="display-heading" style={{ marginBottom: '64px' }}>
        Where We've Been
      </h2>

      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 0, top: '8px', bottom: '0',
          width: '1px',
          background: 'linear-gradient(180deg, var(--gold) 0%, rgba(201,168,76,0.05) 100%)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experiences.map((exp, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-34px', top: '20px',
                width: '10px', height: '10px', borderRadius: '50%',
                background: 'var(--bg)',
                border: '1.5px solid var(--gold)',
                boxShadow: '0 0 10px rgba(201,168,76,0.4)',
                animation: 'pulse-gold 3s infinite',
                animationDelay: `${i * 0.8}s`,
              }} />

              <div className="card" style={{ padding: '32px 36px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap',
                  gap: '12px', marginBottom: '16px',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: '600', fontSize: '1.3rem',
                      color: 'var(--text)', marginBottom: '4px',
                    }}>{exp.role}</h3>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem', color: 'var(--gold)',
                      letterSpacing: '0.08em',
                    }}>{exp.company}</p>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem', color: 'var(--text-2)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    padding: '4px 12px', borderRadius: '99px',
                    letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{exp.period}</span>
                </div>

                <p style={{
                  color: 'var(--text-2)', fontSize: '0.875rem',
                  lineHeight: 1.8, marginBottom: '20px', fontWeight: '300',
                }}>{exp.desc}</p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {exp.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}