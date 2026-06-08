import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const rootRef    = useRef(null)
  const logoRef    = useRef(null)
  const textRef    = useRef(null)
  const lineRef    = useRef(null)
  const glowRef    = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const root = rootRef.current
    const logo = logoRef.current
    const text = textRef.current
    const line = lineRef.current
    const glow = glowRef.current

    /* ─── Initial states ─── */
    gsap.set(root, { scale: 1, opacity: 1 })
    gsap.set(logo, { scale: 0.72, opacity: 0, y: 10 })
    gsap.set(text, { opacity: 0, y: 16 })
    gsap.set(line, { scaleX: 0, transformOrigin: 'center' })
    gsap.set(glow, { scale: 0.8, opacity: 0 })

    /* ─── Master timeline ─── */
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    /* Phase 1 — glow blooms behind logo */
    tl.to(glow, {
        opacity: 1, scale: 1,
        duration: 1.0, ease: 'power2.out',
      }, 0.1)

    /* Phase 1b — logo rises and sharpens in */
    tl.to(logo, {
        opacity: 1, scale: 1, y: 0,
        duration: 1.1, ease: 'power3.out',
      }, 0.2)

    /* Phase 2 — gold line draws across */
    tl.to(line, {
        scaleX: 1,
        duration: 0.75, ease: 'power2.inOut',
      }, 1.0)

    /* Phase 2b — brand name fades up */
    tl.to(text, {
        opacity: 1, y: 0,
        duration: 0.65, ease: 'power3.out',
      }, 1.1)

    /* Phase 3 — brief hold at 2.3s, then exit */

    /* Logo pulses outward briefly */
    tl.to(logo, {
        filter: 'drop-shadow(0 0 40px rgba(228,201,138,0.95)) drop-shadow(0 0 80px rgba(214,176,106,0.5))',
        scale: 1.06,
        duration: 0.3, ease: 'power2.out',
      }, 2.3)
      .to([text, line, glow], { opacity: 0, duration: 0.25 }, 2.35)
      .to(logo, {
        scale: 1.18, opacity: 0,
        duration: 0.4, ease: 'power3.in',
      }, 2.45)

    /* Exit — entire preloader scales DOWN to nothing (iris-close / "from inside" effect) */
    tl.to(root, {
        scale: 0,
        duration: 0.65,
        ease: 'expo.in',
        transformOrigin: 'center center',
      }, 2.7)

    /* Safety: hide after animation */
    tl.set(root, { display: 'none' }, 3.4)

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div id="preloader" ref={rootRef}>

      {/* ── FULL BLACK BACKGROUND ── */}
      <div className="pl-bg" />

      {/* ── CENTER CONTENT ── */}
      <div className="pl-center">

        {/* Radial glow layer behind logo */}
        <div className="pl-logo-glow" ref={glowRef} />

        {/* Logo */}
        <div className="pl-logo-wrap" ref={logoRef}>
          <img
            src="/assets/logo-symbol.png"
            className="pl-logo-img"
            alt="Stravion Construction Group"
          />
        </div>

        {/* Gold divider line */}
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
