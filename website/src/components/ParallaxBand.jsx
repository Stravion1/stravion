import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/parallax.css'

export default function ParallaxBand() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.parallax-img', { yPercent: -15 }, {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      gsap.from('.parallax-text-line', {
        yPercent: 60, opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="parallax-band">
      <div className="parallax-img-wrap">
        <img className="parallax-img" src="/assets/img-roof.jpeg" alt="STRAVION construction project" loading="lazy"
          onError={e => { e.target.parentNode.style.background = 'var(--charcoal)'; e.target.style.display='none' }}
        />
      </div>
      <div className="parallax-overlay" />
      <div className="parallax-content">
        <div className="parallax-text-line">
          <span className="section-label" style={{ justifyContent: 'center', marginBottom: 0 }}>Our Commitment</span>
        </div>
        <h2 className="parallax-heading parallax-text-line">
          Precision<br /><em>In Every</em><br />Detail.
        </h2>
        <p className="parallax-sub parallax-text-line">
          From the first brick to the final finish — uncompromising quality at every stage.
        </p>
        <div className="parallax-text-line">
          <a href="#footer" className="btn-gold" onClick={(e) => { e.preventDefault(); document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' }) }}>
            <span>Start Your Project</span>
          </a>
        </div>
      </div>
    </section>
  )
}
