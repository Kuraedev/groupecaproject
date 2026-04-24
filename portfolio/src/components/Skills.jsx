const skills = [
  { name: 'HTML', level: 90, icon: '🌐' },
  { name: 'CSS', level: 85, icon: '🎨' },
  { name: 'JavaScript', level: 80, icon: '⚡' },
  { name: 'React', level: 75, icon: '⚛️' },
  { name: 'Node.js', level: 70, icon: '🟢' },
  { name: 'AI / Prompt Engineering', level: 88, icon: '🤖' },
]

function Skills() {
  return (
    <section id="skills" style={{
      padding: '120px 60px',
      backgroundColor: '#0d0d1a',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{
            color: '#a855f7', fontSize: '0.8rem', fontWeight: '700',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>What We Know</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800',
            color: '#f0f0ff', marginTop: '12px', letterSpacing: '-1px',
          }}>Our Skills</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '16px',
        }}>
          {skills.map((skill) => (
            <div key={skill.name} style={{
              backgroundColor: '#111127',
              border: '1px solid rgba(168,85,247,0.1)',
              borderRadius: '14px', padding: '24px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
              e.currentTarget.style.backgroundColor = '#161630'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.1)'
              e.currentTarget.style.backgroundColor = '#111127'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                  <span style={{ color: '#f0f0ff', fontWeight: '600', fontSize: '0.95rem' }}>{skill.name}</span>
                </div>
                <span style={{
                  color: '#a855f7', fontWeight: '700', fontSize: '0.9rem',
                  backgroundColor: 'rgba(168,85,247,0.1)',
                  padding: '2px 10px', borderRadius: '999px',
                }}>{skill.level}%</span>
              </div>
              <div style={{ backgroundColor: 'rgba(168,85,247,0.08)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${skill.level}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)',
                  height: '100%', borderRadius: '999px',
                  boxShadow: '0 0 10px rgba(168,85,247,0.5)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills