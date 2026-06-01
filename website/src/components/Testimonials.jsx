import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/testimonials.css'

const REVIEWS = [
  { name: 'James Thornton', role: 'Homeowner, North London', text: "STRAVION transformed our entire ground floor — the open plan extension and new bathroom are exceptional. Finished on time, on budget, and to a standard we couldn't have imagined.", rating: 5 },
  { name: 'Sarah Mitchell', role: 'Director, SRM Retail Ltd', text: "Our new shopfront and commercial fit-out were delivered flawlessly. The team was professional, communicative, and the quality speaks for itself. Highly recommend for any commercial project.", rating: 5 },
  { name: 'David Okonkwo', role: 'Property Developer', text: "I've used STRAVION across three development projects now. Their structural work is impeccable and their project management is second to none. A truly premium construction partner.", rating: 5 },
  { name: 'Emma Clarke', role: 'Interior Designer', text: "The tiling and wet room installation STRAVION delivered was absolutely stunning — gold trim finishes, perfect grouting, flawless results. My clients were blown away.", rating: 5 },
  { name: 'Michael Hassan', role: 'Landlord, East London', text: "Reliable, honest, and brilliant craftsmanship. STRAVION handled a full roof replacement and electrical rewire — both done cleanly and with minimal disruption. Will use again.", rating: 5 },
]

const Stars = () => <span className="stars">★★★★★</span>

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const sectionRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo('.testimonial-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [idx])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx(prev => (prev + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const r = REVIEWS[idx]

  return (
    <section ref={sectionRef} className="testimonials section-pad">
      <div className="container">
        <div className="testimonials-header">
          <p className="section-label">Client Voices</p>
          <h2 className="section-title">What Our <em>Clients</em> Say</h2>
        </div>

        <div className="testimonials-wrap">
          <div className="testimonial-card active">
            <Stars />
            <blockquote className="testimonial-text">&ldquo;{r.text}&rdquo;</blockquote>
            <div className="testimonial-author">
              <div className="author-avatar">{r.name[0]}</div>
              <div>
                <strong className="author-name">{r.name}</strong>
                <span className="author-role">{r.role}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`dot${i === idx ? ' active' : ''}`}
                onClick={() => { clearInterval(timerRef.current); setIdx(i) }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
