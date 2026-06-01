import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/hero.css'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.4 })
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.5')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.hero-btns', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.hero-scroll', { opacity: 1, duration: 0.6 }, '-=0.3')

    // Parallax on scroll
    gsap.to('.hero-video-wrap', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero">
      {/* Video background */}
      <div className="hero-video-wrap">
        <video autoPlay muted loop playsInline>
          <source src="/assets/vid1.mp4" type="video/mp4" />
          <source src="/assets/vid2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="line" />
          London&apos;s Premier Construction Group
          <span className="line" />
        </div>

        <h1 className="hero-title">
          Luxury <em>Construction.</em><br />
          Built To Impress.
        </h1>

        <p className="hero-sub">
          Delivering high-end residential, commercial, and structural<br />
          construction projects across the United Kingdom.
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn-gold" onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }) }}>
            <span>View Projects</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="#footer" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' }) }}>
            <span>Get A Quote</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
