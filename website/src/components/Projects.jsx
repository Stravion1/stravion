import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/projects.css'

const PROJECTS = [
  { img: '/assets/img-bath1.jpeg', title: 'Luxury Wet Room', category: 'residential', tag: 'Residential' },
  { img: '/assets/img-bath2.jpeg', title: 'Premium Bathroom Suite', category: 'residential', tag: 'Residential' },
  { img: '/assets/img-living.jpeg', title: 'Open Plan Living Space', category: 'residential', tag: 'Residential' },
  { img: '/assets/img-roof.jpeg', title: 'Full Roof Replacement', category: 'structural', tag: 'Structural' },
  { img: '/assets/img-p1.jpeg', title: 'Commercial Interior', category: 'commercial', tag: 'Commercial' },
  { img: '/assets/img-p2.jpeg', title: 'Shopfront Installation', category: 'commercial', tag: 'Commercial' },
  { img: '/assets/img-p3.jpeg', title: 'Structural Extension', category: 'structural', tag: 'Structural' },
  { img: '/assets/img-p4.jpeg', title: 'Luxury Tiling Project', category: 'residential', tag: 'Residential' },
  { img: '/assets/img-p5.jpeg', title: 'Steel Frame Works', category: 'structural', tag: 'Structural' },
]

const FILTERS = ['All', 'Residential', 'Commercial', 'Structural']

export default function Projects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tag === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-header', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.from('.proj-card', {
      y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out'
    })
  }, [active])

  return (
    <section id="projects" ref={sectionRef} className="projects section-pad">
      <div className="container">
        <div className="projects-header">
          <p className="section-label">Our Work</p>
          <h2 className="section-title">
            Featured <em>Projects</em>
          </h2>
          <p className="projects-sub">
            Every project reflects our commitment to craftsmanship, detail, and excellence.
          </p>
        </div>

        <div className="project-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p, i) => (
            <div key={p.title + i} className="proj-card">
              <div className="proj-img-wrap">
                <img src={p.img} alt={p.title} loading="lazy"
                  onError={e => { e.target.style.display='none'; e.target.parentNode.style.background='var(--charcoal)' }}
                />
                <div className="proj-overlay">
                  <span className="proj-tag">{p.tag}</span>
                  <h3 className="proj-title">{p.title}</h3>
                  <span className="proj-view">View Project →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
