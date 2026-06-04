import { useEffect, useRef } from 'react'
import '../styles/cursor.css'

export default function Cursor() {
  const houseRef = useRef(null)

  useEffect(() => {
    const el = houseRef.current

    /* Lift directly into <body> so GSAP parent transforms don't break fixed pos */
    document.body.appendChild(el)

    let mx = 0, my = 0
    let raf
    let visible = false

    el.style.opacity = '0'

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '1'
      }
    }

    const animate = () => {
      /* subtract half icon size so the centre of the 22px icon lands on the pointer */
      el.style.transform = `translate(${mx - 11}px, ${my - 11}px)`
      raf = requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener('mousemove', onMove, { passive: true })

    /* Hover state */
    const onEnter = () => el.classList.add('hovered')
    const onLeave = () => el.classList.remove('hovered')

    const attach = () => {
      document.querySelectorAll('a, button, .service-card, .project-card, [role="button"]')
        .forEach(node => {
          node.removeEventListener('mouseenter', onEnter)
          node.removeEventListener('mouseleave', onLeave)
          node.addEventListener('mouseenter', onEnter)
          node.addEventListener('mouseleave', onLeave)
        })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 10.5 12 3 21 10.5" />
        <rect x="5" y="10.5" width="14" height="10.5" rx="0.5" />
        <rect x="9.5" y="15" width="5" height="6" rx="0.3" />
        <rect x="15" y="5.5" width="2" height="4" rx="0.3" />
      </svg>
    </div>
  )
}
