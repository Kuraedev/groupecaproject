const members = [
  'Pearlshaline Gumiran',
  'Karl Andrei Castillo',
  'Aniceto Obina Jr',
  'Eunika Nicole Lasam',
  'Jake Cardenas',
  'Kurt Jakes Andrei Butay',
  'Michael Josh Jacinto',
  'Rexie Margarette Vargas',
  'Rhys Cristian Suyu',
]

export default function Members() {
  return (
    <section id="members" style={{
      padding: '120px 48px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div className="section-label">02 — Members</div>
      <h2 className="display-heading" style={{ marginBottom: '18px' }}>
        Our Team
      </h2>
      <p style={{
        color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.8,
        fontWeight: '300', maxWidth: '640px', marginBottom: '44px',
      }}>
        Meet the people behind the portfolio. This section lists the members included in the team profile.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {members.map((member, index) => (
          <div key={member} className="card" style={{ padding: '22px 20px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--text-3)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontWeight: '600',
              fontSize: '1.02rem', color: 'var(--text)', lineHeight: 1.35,
            }}>
              {member}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
