import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import WhatsAppFloat from './components/WhatsAppFloat'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import ContactPage from './pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)
  const location = useLocation()

  // Init Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
    }
  }, [])

  // Scroll to top on EVERY route change
  useEffect(() => {
    // 1. Stop any ongoing Lenis momentum
    if (lenisRef.current) {
      lenisRef.current.stop()
    }
    // 2. Instantly jump native scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // 3. Reset Lenis position to top
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true })
      // Resume Lenis after reset
      lenisRef.current.start()
    }
    // 4. Refresh ScrollTrigger after DOM has settled
    const t = setTimeout(() => ScrollTrigger.refresh(), 80)
    return () => clearTimeout(t)
  }, [location.pathname])

  // Scroll progress bar
  useEffect(() => {
    if (!loaded) return
    const bar = document.getElementById('scroll-bar')
    const update = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (bar) bar.style.width = (pct * 100) + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [loaded])

  return (
    <>
      <div id="scroll-bar" style={{
        position: 'fixed', top: 0, left: 0, height: '2px', width: '0%',
        background: 'linear-gradient(90deg, #8E6C3F, #D6B06A, #E4C98A)',
        zIndex: 9998, transition: 'width 0.1s linear', pointerEvents: 'none'
      }} />
      <Cursor />
      {!loaded && (
        <Preloader
          onComplete={() => {
            setLoaded(true)
            // Refresh scroll triggers now that content is fully visible
            setTimeout(() => ScrollTrigger.refresh(), 100)
          }}
        />
      )}

      {/* Navbar is ALWAYS visible — never hidden by preloader opacity */}
      <Navbar />

      {/* Site content — always visible under the panels */}
      <div id="site-content">
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/projects"   element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact"    element={<ContactPage />} />
        </Routes>
        <WhatsAppFloat />
      </div>
    </>
  )
}
