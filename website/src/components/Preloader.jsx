import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const rootRef  = useRef(null)
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const logoRef  = useRef(null)
  const textRef  = useRef(null)
  const lineRef  = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const root  = rootRef.current
    const left  = leftRef.current
    const right = rightRef.current
    const logo  = logoRef.current
    const text  = textRef.current
    const line  = lineRef.current

    /* ─── Spawn gold dust particles ─── */
    for (let i = 0; i < 55; i++) {
      const p = document.createElement('div')
      p.className = 'pl-dust'
      p.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `animation-delay:${Math.random() * 3}s`,
        `animation-duration:${2.5 + Math.random() * 3}s`,
        `width:${1 + Math.random() * 1.5}px`,
        `height:${1 + Math.random() * 1.5}px`,
        `opacity:${0.2 + Math.random() * 0.5}`,
      ].join(';')
      root.appendChild(p)
    }

    /* ─── Set initial states ─── */
    gsap.set(logo, { scale: 0.82, opacity: 0, y: 8 })
    gsap.set(text, { opacity: 0, y: 18 })
    gsap.set(line, { scaleX: 0 })
    gsap.set('.pl-scan', { opacity: 0 })

    /* ─── Master timeline ─── */
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    /* Phase 1 — Logo rises in (0.3s) */
    tl.to(logo, {
        opacity: 1, scale: 1, y: 0,
        duration: 1.1, ease: 'power3.out',
      }, 0.3)

    /* Phase 1b — Scan line sweeps across logo (0.7s) */
    tl.to('.pl-scan', { opacity: 1, duration: 0.15 }, 0.7)
      .to('.pl-scan', { x: '110%', duration: 0.9, ease: 'power2.inOut' }, 0.7)
      .to('.pl-scan', { opacity: 0, duration: 0.2 }, 1.45)

    /* Phase 2 — Text + line appear (1.3s) */
    tl.to(text, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 1.35)
      .to(line, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 1.55)

    /* Phase 3 — Brief hold, then exit (2.75s) */

    /* Logo pulses gold outward */
    tl.to(logo, {
        filter: 'drop-shadow(0 0 36px rgba(228,201,138,0.9)) drop-shadow(0 0 72px rgba(214,176,106,0.5))',
        scale: 1.06,
        duration: 0.35,
        ease: 'power2.out',
      }, 2.75)
      .to([text, line], { opacity: 0, duration: 0.3 }, 2.8)

    /* Logo scales & fades — panels begin to split */
    tl.to(logo, {
        scale: 1.22, opacity: 0,
        duration: 0.5, ease: 'power3.in',
      }, 2.95)

    /* Panels slide out — left goes left, right goes right */
    tl.to(left, {
        xPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, 3.1)
      .to(right, {
        xPercent: 100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, 3.1)

    /* Entire root slides up as a final wipe — belt & suspenders */
    tl.to(root, {
        yPercent: -100,
        duration: 0.0,
        ease: 'none',
      }, 4.0)

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  /* ─── Hero delay sync ─── */
  // Hero.jsx timeline starts at delay:3.4 — panels fully gone by ~4.0s

  return (
    <div id="preloader" ref={rootRef}>

      {/* ── LEFT PANEL ── */}
      <div className="pl-panel pl-panel-left" ref={leftRef}>
        {/* Subtle texture overlay */}
        <div className="pl-noise" />
        {/* Right-edge gold accent stripe */}
        <div className="pl-edge pl-edge-right" />
        {/* Corner mark */}
        <div className="pl-corner pl-corner-tl" />
        <div className="pl-corner pl-corner-bl" />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="pl-panel pl-panel-right" ref={rightRef}>
        <div className="pl-noise" />
        {/* Left-edge gold accent stripe */}
        <div className="pl-edge pl-edge-left" />
        <div className="pl-corner pl-corner-tr" />
        <div className="pl-corner pl-corner-br" />
      </div>

      {/* ── CENTER — above both panels ── */}
      <div className="pl-center">

        {/* Logo + scan effect */}
        <div className="pl-logo-wrap" ref={logoRef}>
          {/* Actual brand mark image */}
          <img
            src="/assets/logo-symbol.png"
            className="pl-logo-img"
            alt="Stravion Construction Group"
          />
          {/* Horizontal scan line sweep */}
          <div className="pl-scan" />
          {/* Soft radial glow behind */}
          <div className="pl-logo-glow" />
        </div>

        {/* Brand name */}
        <div className="pl-text" ref={textRef}>
          <span className="pl-name">STRAVION</span>
          <span className="pl-sub">Construction Group</span>
        </div>

        {/* Gold divider */}
        <div className="pl-line-wrap">
          <div className="pl-line" ref={lineRef} />
        </div>

      </div>

    </div>
  )
}
