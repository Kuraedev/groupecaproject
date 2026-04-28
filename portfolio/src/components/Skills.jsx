const skills = [
  { name: 'HTML',                   pct: 90 },
  { name: 'CSS',                    pct: 85 },
  { name: 'JavaScript',             pct: 80 },
  { name: 'React',                  pct: 75 },
  { name: 'Node.js',                pct: 70 },
  { name: 'AI / Prompt Engineering',pct: 88 },
]

export default function Skills() {
  return (
    <section id="skills" style={{
      padding: '120px 48px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div className="section-label">02 — Skills</div>
      <h2 className="display-heading" style={{ marginBottom: '64px' }}>
        What We Know
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {skills.map((s, i) => (
          <div key={s.name} className="card" style={{ padding: '28px 32px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: '20px',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: '500',
                fontSize: '0.9rem', color: 'var(--text)',
              }}>{s.name}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'var(--gold)', opacity: 0.8,
              }}>{s.pct}%</span>
            </div>
            {/* Track */}
            <div style={{
              height: '2px', background: 'rgba(201,168,76,0.08)',
              borderRadius: '99px', overflow: 'hidden',
            }}>
              <div style={{
                width: `${s.pct}%`, height: '100%',
                background: 'linear-gradient(90deg, rgba(201,168,76,0.5), var(--gold))',
                borderRadius: '99px',
                animation: `lineGrow 1s ${i * 0.1}s cubic-bezier(0.4,0,0.2,1) both`,
                transformOrigin: 'left',
              }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}