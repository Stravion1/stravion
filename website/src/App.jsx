import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import ParallaxBand from './components/ParallaxBand'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

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
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

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
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Stats />
          <Projects />
          <ParallaxBand />
          <Process />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
