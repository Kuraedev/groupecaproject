function Contact() {
  return (
    <section id="contact" style={{
      padding: '120px 60px',
      backgroundColor: '#080810',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: '-200px', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            color: '#a855f7', fontSize: '0.8rem', fontWeight: '700',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>Get In Touch</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800',
            color: '#f0f0ff', marginTop: '12px', letterSpacing: '-1px',
          }}>Contact Us</h2>
          <p style={{ color: '#9090b0', marginTop: '16px', lineHeight: 1.7 }}>
            Have a project in mind or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div style={{
          backgroundColor: '#111127',
          border: '1px solid rgba(168,85,247,0.15)',
          borderRadius: '20px', padding: '40px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {[
            { placeholder: 'Your Name', type: 'text' },
            { placeholder: 'Your Email', type: 'email' },
          ].map(({ placeholder, type }) => (
            <input key={placeholder} type={type} placeholder={placeholder} style={{
              width: '100%', padding: '14px 18px',
              backgroundColor: 'rgba(168,85,247,0.04)',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: '10px', color: '#f0f0ff',
              fontSize: '0.9rem', outline: 'none',
              transition: 'border-color 0.2s ease',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.15)'} />
          ))}
          <textarea placeholder="Your Message" rows={5} style={{
            width: '100%', padding: '14px 18px',
            backgroundColor: 'rgba(168,85,247,0.04)',
            border: '1px solid rgba(168,85,247,0.15)',
            borderRadius: '10px', color: '#f0f0ff',
            fontSize: '0.9rem', outline: 'none', resize: 'vertical',
            transition: 'border-color 0.2s ease',
            fontFamily: 'Inter, sans-serif',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.15)'} />
          <button style={{
            width: '100%', padding: '15px',
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            color: '#fff', border: 'none', borderRadius: '10px',
            fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer',
            boxShadow: '0 0 24px rgba(168,85,247,0.3)',
            transition: 'all 0.3s ease',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 0 32px rgba(168,85,247,0.5)'
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 0 24px rgba(168,85,247,0.3)'
          }}>
            Send Message →
          </button>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '40px',
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Kuraedev/groupecaproject' },
            { label: 'Email', href: 'mailto:your@email.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              color: '#555570', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: '500',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.target.style.color = '#a855f7'}
            onMouseLeave={e => e.target.style.color = '#555570'}>
              {label} →
            </a>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#333350', fontSize: '0.8rem', marginTop: '48px' }}>
          © 2026 Group 2 Digital Twin Portfolio. Built with React + Vite.
        </p>
      </div>
    </section>
  )
}

export default Contact