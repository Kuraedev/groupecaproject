import { useEffect, useRef } from 'react'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Kuraedev/groupecaproject',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z"/></svg>,
  },
]

export default function Hero() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      glowRef.current.style.background =
        `radial-gradient(900px circle at ${x}% ${y}%, rgba(79,143,255,0.055) 0%, transparent 60%)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '100px 72px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Atmospheric lighting */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 80% 70% at -10% 60%, rgba(79,143,255,0.12) 0%, transparent 55%)',
          'radial-gradient(ellipse 50% 40% at 100% 10%, rgba(79,143,255,0.05) 0%, transparent 60%)',
        ].join(', '),
      }} />

      {/* Mouse glow */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transition: 'background 0.15s ease',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(79,143,255,0.025) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(79,143,255,0.025) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 70% 90% at 0% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 0% 50%, black 20%, transparent 80%)',
      }} />

      {/* Noise grain */}
      <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.018,pointerEvents:'none' }} xmlns="http://www.w3.org/2000/svg">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)" fill="white"/>
      </svg>

      <div style={{ maxWidth: '740px', position: 'relative', zIndex: 1 }}>

        {/* Status badge */}
        <div className="fu" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(52,211,153,0.22)',
          background: 'rgba(52,211,153,0.06)',
          borderRadius: '99px',
          padding: '5px 14px 5px 10px',
          marginBottom: '36px',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--green)',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--green)', letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>IT Students — Actively Learning</span>
        </div>

        {/* Greeting */}
        <div className="fu1" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--text-2)', letterSpacing: '0.22em',
          textTransform: 'uppercase', marginBottom: '18px',
        }}>
          Hello, We Are
        </div>

        {/* Name */}
        <h1 className="fu2" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: '800',
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          marginBottom: '12px',
        }}>
          Group
          <span style={{
            display: 'block',
            WebkitTextStroke: '2px rgba(79,143,255,0.5)',
            color: 'transparent',
            letterSpacing: '-0.04em',
          }}>Two.</span>
        </h1>

        {/* Role */}
        <div className="fu3" style={{ marginBottom: '28px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            fontWeight: '300',
            color: 'var(--text-2)',
            display: 'flex', alignItems: 'center',
            flexWrap: 'wrap', gap: '10px',
          }}>
            A group of
            <span style={{
              color: 'var(--text)', fontWeight: '500',
              position: 'relative', display: 'inline-block',
            }}>
              Information Technology Students
              <span style={{
                position: 'absolute', bottom: '-2px', left: 0, right: 0,
                height: '1.5px',
                background: 'linear-gradient(90deg, var(--blue), var(--blue-light))',
                borderRadius: '99px',
                animation: 'scaleLine 1s 0.6s var(--ease) both',
                transformOrigin: 'left',
              }} />
            </span>
          </p>
        </div>

        {/* Social icons */}
        <div className="fu4" style={{ display: 'flex', gap: '8px', marginBottom: '36px' }}>
          {socials.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px',
                border: '1px solid rgba(79,143,255,0.13)',
                background: 'rgba(79,143,255,0.04)',
                color: 'var(--text-2)',
                textDecoration: 'none',
                transition: 'all 0.25s var(--ease)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.color = 'var(--blue-light)'
                el.style.borderColor = 'rgba(79,143,255,0.45)'
                el.style.background = 'rgba(79,143,255,0.1)'
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 8px 24px rgba(79,143,255,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.color = 'var(--text-2)'
                el.style.borderColor = 'rgba(79,143,255,0.13)'
                el.style.background = 'rgba(79,143,255,0.04)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}>
              {icon}
            </a>
          ))}
        </div>

        {/* Description */}
        <p className="fu5" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem', fontWeight: '300',
          color: 'var(--text-2)', lineHeight: 1.9,
          maxWidth: '480px', marginBottom: '44px',
        }}>
          We're a team of IT students who love turning ideas into real, working software.
          From databases to APIs to full-stack apps — we're still learning,
          but we build things that actually work.
        </p>

        {/* CTA */}
        <div className="fu6" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary">
            See Our Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </div>

        {/* Stats */}
        <div className="fi" style={{
          display: 'flex', gap: '0',
          marginTop: '68px', paddingTop: '28px',
          borderTop: '1px solid rgba(79,143,255,0.08)',
        }}>
          {[
            { num: 'IT',   sub: 'Students'     },
            { num: '3+',   sub: 'Projects Built' },
            { num: '100%', sub: 'Open Source'   },
          ].map(({ num, sub }, i, arr) => (
            <div key={sub} style={{
              paddingRight: i < arr.length - 1 ? '36px' : 0,
              marginRight:  i < arr.length - 1 ? '36px' : 0,
              borderRight:  i < arr.length - 1 ? '1px solid rgba(79,143,255,0.07)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem', fontWeight: '700',
                color: 'var(--text)', lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>{num}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem', color: 'var(--text-2)',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                marginTop: '7px',
              }}>{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
