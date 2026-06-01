import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/process.css'

const STEPS = [
  { n: '01', title: 'Consultation', desc: 'We meet to understand your vision, requirements, site conditions, and budget in full detail.' },
  { n: '02', title: 'Planning', desc: 'Detailed project plans, structural drawings, and timelines are prepared and agreed upon.' },
  { n: '03', title: 'Design', desc: 'Material selections, technical specifications, and bespoke design concepts are finalised.' },
  { n: '04', title: 'Construction', desc: 'Our expert teams execute the build with precision, keeping you updated at every milestone.' },
  { n: '05', title: 'Delivery', desc: 'Final snagging, quality inspection, and handover — on time, on budget, to your satisfaction.' },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-header > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-header', start: 'top 80%' }
      })
      gsap.from('.step', {
        x: -40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 80%' }
      })
      gsap.from('.process-line-fill', {
        scaleY: 0, transformOrigin: 'top', duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 70%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="process section-pad">
      <div className="container process-layout">
        <div className="process-header">
          <p className="section-label">How We Work</p>
          <h2 className="section-title">Our <em>Process</em></h2>
          <div className="gold-rule" />
          <p className="process-intro">
            A transparent, structured approach that keeps every project running smoothly — from first call to final handover.
          </p>
        </div>
        <div className="process-steps">
          <div className="process-line">
            <div className="process-line-fill" />
          </div>
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <div className="step-body">
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
