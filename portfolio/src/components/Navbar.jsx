import { useState, useEffect } from 'react'

const links = ['Members', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '62px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 56px',
      backgroundColor: scrolled ? 'rgba(6,8,14,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(79,143,255,0.08)' : 'transparent'}`,
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }}>

      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #4f8fff22, #4f8fff44)',
          border: '1px solid rgba(79,143,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          fontWeight: '500', color: 'var(--blue)', letterSpacing: '0.05em',
        }}>G2</div>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.95rem',
          fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.01em',
        }}>Portfolio</span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem', fontWeight: '400',
            color: 'var(--text-2)',
            textDecoration: 'none', padding: '7px 16px', borderRadius: '8px',
            letterSpacing: '0.02em',
            transition: 'color 0.22s ease, background 0.22s ease',
          }}
          onMouseEnter={e => {
            e.target.style.color = 'var(--text)'
            e.target.style.background = 'rgba(79,143,255,0.07)'
          }}
          onMouseLeave={e => {
            e.target.style.color = 'var(--text-2)'
            e.target.style.background = 'transparent'
          }}>
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}
