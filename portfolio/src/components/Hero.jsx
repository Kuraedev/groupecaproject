function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '120px 40px 80px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 70%), #080810',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        backgroundColor: 'rgba(168,85,247,0.08)',
        border: '1px solid rgba(168,85,247,0.2)',
        padding: '6px 16px', borderRadius: '999px',
        marginBottom: '32px',
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
        <span style={{ color: '#a855f7', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px' }}>
          DIGITAL TWIN PORTFOLIO — GROUP 2
        </span>
      </div>

      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: '900',
        lineHeight: 1.05,
        letterSpacing: '-2px',
        marginBottom: '24px',
        color: '#f0f0ff',
      }}>
        Hi, We're{' '}
        <span style={{
          background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Group 2
        </span>
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        color: '#9090b0',
        maxWidth: '580px',
        lineHeight: 1.8,
        marginBottom: '48px',
        fontWeight: '400',
      }}>
        We build smart, AI-powered digital experiences that highlight people's
        skills and achievements in a clear and engaging way.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#projects" style={{
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          color: '#fff', padding: '14px 32px',
          borderRadius: '10px', textDecoration: 'none',
          fontWeight: '600', fontSize: '0.95rem',
          boxShadow: '0 0 24px rgba(168,85,247,0.35)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
          View Projects →
        </a>
        <a href="#contact" style={{
          border: '1px solid rgba(168,85,247,0.4)',
          color: '#a855f7', padding: '14px 32px',
          borderRadius: '10px', textDecoration: 'none',
          fontWeight: '600', fontSize: '0.95rem',
          backgroundColor: 'rgba(168,85,247,0.05)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = 'rgba(168,85,247,0.12)'
          e.target.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = 'rgba(168,85,247,0.05)'
          e.target.style.transform = 'translateY(0)'
        }}>
          Contact Us
        </a>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: '48px', marginTop: '80px',
        padding: '24px 48px',
        border: '1px solid rgba(168,85,247,0.12)',
        borderRadius: '16px',
        backgroundColor: 'rgba(168,85,247,0.04)',
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {[['3+', 'Projects Built'], ['4', 'AI Agents'], ['100%', 'Open Source']].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#a855f7' }}>{num}</div>
            <div style={{ fontSize: '0.8rem', color: '#555570', fontWeight: '500', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero