import { useEffect, useRef } from 'react'
import '../styles/cursor.css'

export default function Cursor() {
  const houseRef = useRef(null)

  useEffect(() => {
    const el = houseRef.current

    /* Move directly into <body> so no GSAP parent transform breaks fixed positioning */
    document.body.appendChild(el)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let raf
    let visible = false

    /* Hide until first mouse movement */
    el.style.opacity = '0'

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '1'
      }
    }

    const draw = () => {
      /*
       * The SVG roof peak is at x=12, y=3 in a 24-unit viewBox, rendered at 22px.
       * In pixels: peak_x = 11px from left, peak_y = 2.75px from top.
       * Subtracting these offsets puts the ROOF TIP exactly on the pointer —
       * so clicking feels perfectly accurate (like a native arrow cursor).
       */
      el.style.transform = `translate(${mx - 11}px, ${my - 3}px)`
      raf = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (document.body.contains(el)) document.body.removeChild(el)
    }
  }, [])

  return (
    <div ref={houseRef} className="cursor-house">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="22" height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* roof — peak at (12,3) is the cursor hotspot */}
        <polyline points="3 10.5 12 3 21 10.5" />
        {/* walls */}
        <rect x="5" y="10.5" width="14" height="10.5" rx="0.5" />
        {/* door */}
        <rect x="9.5" y="15" width="5" height="6" rx="0.3" />
        {/* chimney */}
        <rect x="15" y="5.5" width="2" height="4" rx="0.3" />
      </svg>
    </div>
  )
}
