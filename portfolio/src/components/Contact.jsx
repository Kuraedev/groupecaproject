export default function Contact() {
  return (
    <section id="contact" style={{
      padding: '120px 48px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <div className="section-label">05 — Contact</div>
          <h2 className="display-heading" style={{ marginBottom: '24px' }}>
            Let's Work<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Together.</span>
          </h2>
          <p style={{
            color: 'var(--text-2)', fontSize: '0.9rem',
            lineHeight: 1.85, fontWeight: '300', maxWidth: '360px',
            marginBottom: '48px',
          }}>
            Have a project in mind or want to collaborate? We'd love to hear from you.
            Send us a message and we'll get back to you shortly.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'GitHub', val: 'Kuraedev/groupecaproject', href: 'https://github.com/Kuraedev/groupecaproject' },
              { label: 'Email',  val: 'group2@portfolio.dev',    href: 'mailto:group2@portfolio.dev' },
            ].map(({ label, val, href }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text-3)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginBottom: '4px',
                }}>{label}</div>
                <a href={href} target="_blank" rel="noreferrer" style={{
                  color: 'var(--text-2)', fontSize: '0.875rem',
                  textDecoration: 'none', fontWeight: '300',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>
                  {val}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input className="form-input" type="text" placeholder="Your Name" />
            <input className="form-input" type="email" placeholder="Your Email" />
            <textarea className="form-input" placeholder="Your Message" rows={5}
              style={{ resize: 'vertical' }} />
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}>
              Send Message →
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        marginTop: '100px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--text-3)', letterSpacing: '0.1em',
        }}>© 2026 GROUP 2 — DIGITAL TWIN PORTFOLIO</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--text-3)', letterSpacing: '0.1em',
        }}>BUILT WITH REACT + VITE</span>
      </div>
    </section>
  )
}