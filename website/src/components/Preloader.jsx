import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const rootRef    = useRef(null)
  const innerRef   = useRef(null)
  const logoRef    = useRef(null)
  const textRef    = useRef(null)
  const lineRef    = useRef(null)
  const glowRef    = useRef(null)
  const ringRef    = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const root  = rootRef.current
    const inner = innerRef.current
    const logo  = logoRef.current
    const text  = textRef.current
    const line  = lineRef.current
    const glow  = glowRef.current
    const ring  = ringRef.current

    /* ─── Initial states ─── */
    gsap.set(root,  { opacity: 1 })
    gsap.set(inner, { scale: 1, opacity: 1 })
    gsap.set(logo,  { scale: 0.65, opacity: 0, y: 14, rotationY: 15 })
    gsap.set(text,  { opacity: 0, y: 18, letterSpacing: '0.55em' })
    gsap.set(line,  { scaleX: 0, transformOrigin: 'center' })
    gsap.set(glow,  { scale: 0.5, opacity: 0 })
    gsap.set(ring,  { scale: 0.1, opacity: 0, transformOrigin: 'center' })

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    /* ── PHASE 1 — Glow blooms (0 → 0.9s) ── */
    tl.to(glow, {
      opacity: 1, scale: 1,
      duration: 0.9, ease: 'power2.out',
    }, 0)

    /* ── PHASE 1b — Logo rises in with 3D rotation ── */
    tl.to(logo, {
      opacity: 1, scale: 1, y: 0, rotationY: 0,
      duration: 1.05, ease: 'power3.out',
    }, 0.15)

    /* ── PHASE 2 — Portal ring expands outward ── */
    tl.to(ring, {
      scale: 2.8, opacity: 0.7,
      duration: 1.2, ease: 'power2.out',
    }, 0.7)
    tl.to(ring, {
      opacity: 0,
      duration: 0.5, ease: 'power2.in',
    }, 1.6)

    /* ── PHASE 2b — Gold line draws, name appears ── */
    tl.to(line, {
      scaleX: 1,
      duration: 0.7, ease: 'power2.inOut',
    }, 0.95)
    tl.to(text, {
      opacity: 1, y: 0, letterSpacing: '0.38em',
      duration: 0.7, ease: 'power3.out',
    }, 1.1)

    /* ── PHASE 3 — Hold at 2.5s then BUILD exit tension ── */
    /* Slight logo pulse — telegraphing the rush */
    tl.to(logo, {
      scale: 1.08,
      filter: 'drop-shadow(0 0 32px rgba(228,201,138,1)) drop-shadow(0 0 80px rgba(214,176,106,0.7))',
      duration: 0.4, ease: 'power2.out',
    }, 2.5)

    /* Text + line fade away first */
    tl.to([text, line, glow], {
      opacity: 0,
      duration: 0.25, ease: 'power2.in',
    }, 2.65)

    /* ── PHASE 4 — PORTAL RUSH: everything zooms INTO viewer ── */
    /* Second ring burst — portal opening */
    tl.to(ring, {
      scale: 0.01, opacity: 0.9,
      duration: 0.01,
    }, 2.7)
    tl.to(ring, {
      scale: 12, opacity: 0,
      duration: 0.7, ease: 'expo.in',
    }, 2.72)

    /* Logo ROCKETS forward — scale to infinity */
    tl.to(logo, {
      scale: 18,
      opacity: 0,
      duration: 0.65,
      ease: 'expo.in',
    }, 2.72)

    /* The entire inner panel crashes toward viewer (3D Z-push) */
    tl.to(inner, {
      scale: 1.35,
      opacity: 0,
      duration: 0.55,
      ease: 'expo.in',
    }, 2.82)

    /* Black bg fades last — leaves website underneath */
    tl.to(root, {
      opacity: 0,
      duration: 0.3,
      ease: 'none',
    }, 3.1)

    tl.set(root, { display: 'none' }, 3.45)

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div id="preloader" ref={rootRef}>
      <div className="pl-bg" />

      {/* Portal ring */}
      <div className="pl-ring" ref={ringRef} />

      {/* All center content in one inner for the rush exit */}
      <div className="pl-inner" ref={innerRef}>

        {/* Radial glow */}
        <div className="pl-logo-glow" ref={glowRef} />

        {/* Logo */}
        <div className="pl-logo-wrap" ref={logoRef}>
          <img
            src="/assets/logo-symbol.png"
            className="pl-logo-img"
            alt="Stravion Construction Group"
          />
        </div>

        {/* Gold line */}
        <div className="pl-line-wrap">
          <div className="pl-line" ref={lineRef} />
        </div>

        {/* Brand name */}
        <div className="pl-text" ref={textRef}>
          <span className="pl-name">STRAVION</span>
          <span className="pl-sub">Construction Group</span>
        </div>

      </div>
    </div>
  )
}
