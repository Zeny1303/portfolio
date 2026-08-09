import { useRef, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { NavPanel, SiteHeader } from './components/Navbar'
import Home from './components/Home'
import WorkPage from './components/WorkPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import FlipBookNav from './components/FlipBookNav'
import './App.css'

gsap.registerPlugin(CustomEase)
try {
  CustomEase.create('tilt', 'M0,0 C0.55,0 0.45,1 1,1')
} catch (e) {
  // Ignore if registered
}

/* ── Home layout with tilt nav & Header ── */
function HomeLayout() {
  const navigate = useNavigate()
  const mainRef = useRef(null)
  const [navOpen, setNavOpen] = useState(false)

  const tilt = (xPercent, rotation) =>
    gsap.to(mainRef.current, { xPercent, rotation, duration: 0.77, ease: 'tilt', overwrite: true })

  function handleNavLink(label) {
    tilt(0, 0)
    if (label === 'Work') navigate('/work')
    if (label === 'About') navigate('/about')
    if (label === 'Contact') navigate('/contact')
    if (label === 'Home') navigate('/')
  }

  return (
    <>
      <NavPanel
        isOpen={navOpen}
        onClose={() => {
          setNavOpen(false)
          tilt(0, 0)
        }}
        onLinkClick={(label) => {
          const navLinks = [...document.querySelectorAll('[data-nav-label]')]
          gsap.killTweensOf(navLinks)
          gsap.to(navLinks.filter(el => el.dataset.navLabel !== label), {
            opacity: 0, x: 30, duration: 0.2, ease: 'power2.in', stagger: 0.04,
          })
          gsap.delayedCall(0.25, () => {
            setNavOpen(false)
            handleNavLink(label)
          })
        }}
      />

      <main ref={mainRef} className="main-surface">
        <SiteHeader
          activePage="Home"
          onNavigate={(path) => navigate(path)}
          onOpen={() => {
            setNavOpen(true)
            tilt(-50, 12)
          }}
        />
        <Home />
      </main>
    </>
  )
}

/* ── Book Navigation View ── */
function BookView({ initialPage = 0 }) {
  const navigate = useNavigate()
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          padding: '8px 18px',
          borderRadius: '20px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1.1rem',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease'
        }}
      >
        ← Standard View
      </button>
      <FlipBookNav initialPage={initialPage} />
    </div>
  )
}

/* ── Root App ── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/book" element={<BookView initialPage={0} />} />
    </Routes>
  )
}
