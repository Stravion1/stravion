import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/about.css'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-img-wrap', {
        xPercent: -8, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
      gsap.from('.about-content > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
      gsap.to('.about-img-wrap img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: true,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about section-pad">
      <div className="container about-grid">
        <div className="about-img-wrap">
          <img src="/assets/proj-b8.jpeg" alt="STRAVION luxury construction project" loading="lazy" />
          <div className="about-img-badge">
            <span className="badge-num">15+</span>
            <span className="badge-txt">Years of Excellence</span>
          </div>
        </div>

        <div className="about-content">
          <p className="section-label">About Stravion</p>
          <h2 className="section-title">
            Built for <em>High-End Living</em><br />
            &amp; Commercial Excellence
          </h2>
          <div className="gold-rule" />

          <p className="about-body">
            STRAVION is a premium construction and project management company delivering
            high-quality turnkey solutions across residential and commercial sectors
            throughout the United Kingdom.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
            From initial planning and project coordination to foundations, structural works,
            fit-outs and final finishes, we provide complete end-to-end construction services
            under one trusted partner. Our integrated approach ensures seamless project delivery,
            clear communication and complete accountability throughout every stage of the build.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
            We specialise in luxury residential developments, high-end bathrooms, bespoke
            interiors, property transformations, extensions, refurbishments and commercial
            construction projects. Whether undertaking a premium home renovation or delivering
            a large-scale commercial development, our focus remains the same — exceptional
            quality, meticulous attention to detail and outstanding client experience.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
            Our project management expertise allows us to coordinate contractors, suppliers,
            schedules and budgets efficiently, ensuring projects are delivered safely, on time
            and to the highest standards. By combining skilled craftsmanship with professional
            project leadership, we create spaces that enhance value, functionality and
            long-term performance.
          </p>

          <ul className="about-pillars">
            {[
              ['Turnkey Solutions', 'One team. Full end-to-end delivery.'],
              ['Project Management', 'Coordinated, on time and on budget.'],
              ['Complete Accountability', 'Fully licensed, insured & transparent.'],
            ].map(([title, sub]) => (
              <li key={title} className="pillar">
                <div className="pillar-dot" />
                <div>
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="about-tagline">
            Complete Turnkey Construction &amp; Project Management Solutions.<br />
            <em>Built for High-End Living &amp; Commercial Excellence.</em>
          </p>

          <div className="about-ctas">
            <Link to="/about" className="btn-gold">
              <span>Our Story</span>
            </Link>
            <a href="tel:07706938064" className="btn-outline">
              <span>Call Us Today</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
