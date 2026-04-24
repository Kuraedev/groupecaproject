import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'Skills', 'Experience', 'Projects', 'Contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 60px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: scrolled ? 'rgba(8,8,16,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(168,85,247,0.1)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: '800', color: 'white'
        }}>G2</div>
        <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f0f0ff', letterSpacing: '-0.3px' }}>
          Group 2 <span style={{ color: '#a855f7' }}>Portfolio</span>
        </span>
      </div>
      <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
        {links.map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{
              color: '#9090b0',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'block',
            }}
            onMouseEnter={e => {
              e.target.style.color = '#f0f0ff'
              e.target.style.backgroundColor = 'rgba(168,85,247,0.1)'
            }}
            onMouseLeave={e => {
              e.target.style.color = '#9090b0'
              e.target.style.backgroundColor = 'transparent'
            }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar