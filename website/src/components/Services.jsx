import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/services.css'

const SERVICES = [
  { icon: '🏗️', title: 'Extensions & Structural Works', desc: 'Full structural modifications, rear and side extensions built to the highest standard.' },
  { icon: '🏢', title: 'Commercial Fit-Outs', desc: 'Bespoke commercial interiors designed to elevate your business environment.' },
  { icon: '🪟', title: 'Shopfront Installation', desc: 'High-impact shopfronts — aluminium, glass, and steel systems professionally installed.' },
  { icon: '🏠', title: 'Roofing & External Works', desc: 'Flat roof, pitched roof, and all external weatherproofing solutions.' },
  { icon: '🛁', title: 'Bathrooms & Wet Rooms', desc: 'Luxury bathroom design and installation with premium materials and gold finishes.' },
  { icon: '🔧', title: 'Plumbing & Gas Installations', desc: 'Gas Safe certified engineers for all plumbing, heating, and gas installation works.' },
  { icon: '⚡', title: 'Electrical Works', desc: 'Part P certified electricians. Rewires, consumer units, smart lighting systems.' },
  { icon: '🎨', title: 'Plastering & Decorating', desc: 'Perfect skims, feature walls, and premium decorating across all project types.' },
  { icon: '🪵', title: 'Tiling & Flooring', desc: 'LVT, porcelain, marble, and hardwood flooring — expertly laid and finished.' },
  { icon: '💨', title: 'Ventilation Systems', desc: 'MVHR and mechanical ventilation solutions for residential and commercial builds.' },
  { icon: '🔩', title: 'Steel & Structural Modifications', desc: 'RSJ installation, steel frames, load-bearing alterations with full calculations.' },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header > *', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header', start: 'top 80%' }
      })
      gsap.from('.service-card', {
        y: 60, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services section-pad">
      <div className="container">
        <div className="services-header">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">
            Full-Service <em>Construction</em><br />Expertise
          </h2>
          <p className="services-sub">
            From structural foundations to luxury finishing touches — everything under one roof.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-card-inner">
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
