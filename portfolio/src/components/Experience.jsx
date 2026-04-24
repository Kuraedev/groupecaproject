const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    period: '2024 – Present',
    description: 'Built AI-powered web applications and portfolio platforms for clients using React, Node.js, and Claude API.',
    tags: ['React', 'Node.js', 'Claude AI'],
  },
  {
    role: 'AI Research Assistant',
    company: 'Digital Twin Nexus Project',
    period: '2024 – Present',
    description: 'Researched and implemented AI agent architectures for dynamic portfolio generation and audience-tailored content.',
    tags: ['AI Agents', 'Prompt Engineering', 'Research'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2023 – 2024',
    description: 'Developed responsive UI components using React and Tailwind CSS, improving page load speed by 40%.',
    tags: ['React', 'CSS', 'Performance'],
  },
]

function Experience() {
  return (
    <section id="experience" style={{
      padding: '120px 60px',
      backgroundColor: '#080810',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{
            color: '#a855f7', fontSize: '0.8rem', fontWeight: '700',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>Where We've Been</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800',
            color: '#f0f0ff', marginTop: '12px', letterSpacing: '-1px',
          }}>Experience</h2>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: '0', top: '8px', bottom: '8px',
            width: '2px',
            background: 'linear-gradient(180deg, #a855f7, transparent)',
            marginLeft: '0',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingLeft: '32px' }}>
            {experiences.map((exp, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-39px', top: '6px',
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  boxShadow: '0 0 12px rgba(168,85,247,0.6)',
                  border: '2px solid #080810',
                }} />
                <div style={{
                  backgroundColor: '#111127',
                  border: '1px solid rgba(168,85,247,0.1)',
                  borderRadius: '16px', padding: '28px 32px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(168,85,247,0.35)'
                  e.currentTarget.style.transform = 'translateX(6px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(168,85,247,0.1)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ color: '#f0f0ff', fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>{exp.role}</h3>
                      <p style={{ color: '#a855f7', fontSize: '0.875rem', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{
                      color: '#9090b0', fontSize: '0.8rem', fontWeight: '500',
                      backgroundColor: 'rgba(168,85,247,0.06)',
                      border: '1px solid rgba(168,85,247,0.15)',
                      padding: '4px 12px', borderRadius: '999px', whiteSpace: 'nowrap',
                    }}>{exp.period}</span>
                  </div>
                  <p style={{ color: '#9090b0', lineHeight: 1.7, fontSize: '0.9rem', margin: '16px 0' }}>{exp.description}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.75rem', fontWeight: '600',
                        color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.08)',
                        border: '1px solid rgba(168,85,247,0.15)',
                        padding: '3px 10px', borderRadius: '999px',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience