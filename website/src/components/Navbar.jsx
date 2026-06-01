import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#footer' },
]

const LogoSVG = () => (
  <svg width="38" height="38" viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="navgld" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8E6C3F"/>
        <stop offset="50%" stopColor="#E4C98A"/>
        <stop offset="100%" stopColor="#D6B06A"/>
      </linearGradient>
    </defs>
    <path d="M40 4 L55 4 L55 20 L45 20 L45 36 L58 36 L58 52 L43 52 L43 68 L58 68 L58 76 L22 76 L22 60 L36 60 L36 44 L22 44 L22 28 L36 28 L36 12 L22 12 L22 4 Z" fill="url(#navgld)"/>
    <path d="M20 76 L60 76" stroke="url(#navgld)" strokeWidth="1.5"/>
  </svg>
)

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.from(navRef.current, { yPercent: -100, duration: 1, ease: 'power3.out', delay: 3.2 })
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <LogoSVG />
          <div className="nav-logo-text">
            <span className="nav-logo-name">STRAVION</span>
            <span className="nav-logo-sub">Construction Group</span>
          </div>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="tel:07706938064" className="nav-cta">
          <span>07706 938064</span>
        </a>

        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul>
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-contact">
          <a href="tel:07706938064">07706 938064</a>
          <a href="mailto:info@stravion.co.uk">info@stravion.co.uk</a>
        </div>
      </div>
    </>
  )
}
