import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import heroImage from '../assests/HeroImage.png'
import cortexImg from '../assests/cortex.png'
import taskflowImg from '../assests/taskflow.png'
import nexoraImg from '../assests/nexora.png'
import './FlipBookNav.css'

gsap.registerPlugin(CustomEase)
try {
  CustomEase.create('pageTurn', '.42,.05,.25,1')
} catch (e) {
  // If already created, ignore
}

export default function FlipBookNav({ initialPage = 0 }) {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [captionText, setCaptionText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const bookRef = useRef(null)
  const flipTweenRef = useRef(null)

  // Pages definition matching resume data & sections
  const pageData = [
    {
      id: 'home',
      title: '01 — SNEHA portfolio: Home Overview',
      route: '/',
      left: (
        <div className="spread-half left-spread">
          <div>
            <span className="book-badge">PORTFOLIO '26</span>
            <h1 className="book-hero-title">
              Curious<br />Full Stack<br />Developer
            </h1>
            <p className="book-body-text" style={{ marginTop: '12px' }}>
              Software Engineer specializing in React, TypeScript, Node.js, and Django REST Framework. Solved 500+ DSA problems.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="book-page-num">PAGE 01</span>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/'); }}
              style={{ padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Geist Mono', monospace", fontSize: '0.75rem' }}
            >
              Full Page ↗
            </button>
          </div>
        </div>
      ),
      right: (
        <div className="spread-half right-spread" style={{ padding: 0, overflow: 'hidden' }}>
          <img
            src={heroImage}
            alt="Sneha"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )
    },
    {
      id: 'about',
      title: '02 — About Me: Experience & Skills',
      route: '/about',
      left: (
        <div className="spread-half left-spread">
          <div>
            <span className="book-badge" style={{ background: '#646cff' }}>ABOUT & SKILLS</span>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', marginBottom: '10px' }}>
              Software Engineer
            </h2>
            <p className="book-body-text" style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
              B.Tech in CS (Data Science) @ AKTU (CGPA: 7.54). Ex-Software Engineer Intern @ XRG Consulting (Hyderabad).
            </p>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111' }}>LeetCode & Hackathon:</div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>• 500+ DSA Solved (Peak 1753)</div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>• Purple Tech Hackathon '26 (Round 2)</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="book-page-num">PAGE 02</span>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/about'); }}
              style={{ padding: '6px 12px', background: '#646cff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Geist Mono', monospace", fontSize: '0.75rem' }}
            >
              View About ↗
            </button>
          </div>
        </div>
      ),
      right: (
        <div className="spread-half right-spread" style={{ background: '#181b24', color: '#fff' }}>
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.8rem', color: '#646cff', marginBottom: '8px' }}>
              TECH STACK & CORE SKILLS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {['React.js', 'TypeScript', 'Node.js', 'Django', 'MongoDB', 'Docker', 'WebSockets', 'REST APIs', 'PostgreSQL', 'Tailwind'].map((s, i) => (
                <span key={i} style={{ background: 'rgba(100,108,255,0.2)', border: '1px solid rgba(100,108,255,0.4)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: "'Geist Mono', monospace" }}>
                  {s}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#b0b4be', lineHeight: 1.5 }}>
              • Built responsive Anvayaa KinCare UI modules with React & Tailwind.<br />
              • Django REST API integrations, search, pagination, Agile environment.
            </div>
          </div>
          <span className="book-page-num" style={{ color: '#666' }}>PAGE 03</span>
        </div>
      )
    },
    {
      id: 'work',
      title: '03 — Featured Projects & Work',
      route: '/work',
      left: (
        <div className="spread-half left-spread" style={{ background: '#0b0c10', color: '#fff' }}>
          <div>
            <span className="book-badge" style={{ background: '#00d2ff', color: '#000' }}>FEATURED PROJECTS</span>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>
              Cortex & TaskFlow
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#00d2ff', fontWeight: 600, marginBottom: '6px' }}>
              Cortex: Real-Time AI Interview SaaS
            </div>
            <p style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '12px', lineHeight: 1.4 }}>
              In-browser code editor, voice streaming, WebSockets, scoring analytics, Dockerized microservices.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#00d2ff', fontWeight: 600, marginBottom: '6px' }}>
              TaskFlow: Full-Stack Task Platform
            </div>
            <p style={{ fontSize: '0.78rem', color: '#aaa', lineHeight: 1.4 }}>
              Kanban boards, Django REST Framework, JWT auth, RBAC, Nginx & Railway deployment.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="book-page-num" style={{ color: '#555' }}>PAGE 04</span>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/work'); }}
              style={{ padding: '6px 12px', background: '#00d2ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Geist Mono', monospace", fontSize: '0.75rem' }}
            >
              All Projects ↗
            </button>
          </div>
        </div>
      ),
      right: (
        <div className="spread-half right-spread" style={{ padding: 0, background: '#14161e' }}>
          <img src={cortexImg} alt="Cortex Project" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
          <img src={taskflowImg} alt="TaskFlow Project" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        </div>
      )
    },
    {
      id: 'contact',
      title: '04 — Get In Touch & Contact',
      route: '/contact',
      left: (
        <div className="spread-half left-spread" style={{ background: '#0e1626', color: '#fff' }}>
          <div>
            <span className="book-badge" style={{ background: '#00e5ff', color: '#000' }}>LET'S CONNECT</span>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', marginBottom: '10px' }}>
              Contact Console
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#8a99ad', lineHeight: 1.5, marginBottom: '14px' }}>
              Available for Software Engineering opportunities, full-stack development, and tech collaborations.
            </p>
            <div style={{ fontSize: '0.82rem', fontFamily: "'Geist Mono', monospace", color: '#00e5ff' }}>
              📧 snehakashyap9920@gmail.com<br />
              📞 +91-9065787979<br />
              💻 GitHub: Zeny1303<br />
              🔗 LinkedIn: Sneha1309
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="book-page-num" style={{ color: '#555' }}>PAGE 06</span>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/contact'); }}
              style={{ padding: '6px 12px', background: '#00e5ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Geist Mono', monospace", fontSize: '0.75rem' }}
            >
              Open Console ↗
            </button>
          </div>
        </div>
      ),
      right: (
        <div className="spread-half right-spread" style={{ background: '#ffffff', color: '#111', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textCenter: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎛️</div>
          <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.6rem', marginBottom: '0.5rem' }}>
            Tactile Control Board
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#666', textAlign: 'center', marginBottom: '1.2rem' }}>
            Interactive Hardware Console, Voice Recorder, LED Display & Real-time Messaging.
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/contact'); }}
            style={{ padding: '8px 16px', background: '#0e1626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Geist Mono', monospace", fontSize: '0.8rem' }}
          >
            Launch Interactive Board
          </button>
        </div>
      )
    }
  ]

  useEffect(() => {
    setCaptionText(pageData[currentPage].title)
  }, [currentPage])

  const setCaption = (title) => {
    setCaptionText(title)
  }

  // 3D Flip animation using GSAP CustomEase
  const turnPage = (direction, duration = 0.85, ease = 'pageTurn', onDone) => {
    if (isAnimating) return
    setIsAnimating(true)

    if (flipTweenRef.current && flipTweenRef.current.isActive()) {
      flipTweenRef.current.progress(1)
    }

    const goingNext = direction === 'next'
    const targetPageIndex = (currentPage + (goingNext ? 1 : -1) + pageData.length) % pageData.length

    const liftSide = goingNext ? 'right' : 'left'
    const landSide = goingNext ? 'left' : 'right'

    const bookEl = bookRef.current
    if (!bookEl) return

    // Render turn markup
    const turnDiv = document.createElement('div')
    turnDiv.className = 'turn'

    // We use React HTML rendering or clone nodes for the flap faces
    const targetSpread = pageData[targetPageIndex]
    const currentSpread = pageData[currentPage]

    turnDiv.innerHTML = `
      <div class="half ${liftSide}">
        <div id="turn-target-half"></div>
      </div>
      <div class="flap ${goingNext ? 'next' : 'prev'}">
        <div class="face">
          <div id="turn-current-face"></div>
        </div>
        <div class="face back">
          <div id="turn-target-back"></div>
        </div>
      </div>
    `

    bookEl.appendChild(turnDiv)

    setCaption(targetSpread.title)

    flipTweenRef.current = gsap.to(bookEl.querySelector('.flap'), {
      rotationY: goingNext ? -180 : 180,
      transformOrigin: goingNext ? 'left center' : 'right center',
      duration: duration,
      ease: ease,
      onComplete() {
        setCurrentPage(targetPageIndex)
        turnDiv.remove()
        setIsAnimating(false)
        if (onDone) onDone()
      }
    })
  }

  const handleNavigate = (direction) => {
    turnPage(direction)
  }

  const handleBookClick = (event) => {
    if (!bookRef.current) return
    const rect = bookRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    if (clickX < rect.width / 2) {
      handleNavigate('prev')
    } else {
      handleNavigate('next')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNavigate('next')
      if (e.key === 'ArrowLeft') handleNavigate('prev')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, isAnimating])

  return (
    <div className="book-stage-container">
      {/* SVG Motion Blur Filters */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <filter id="motion-blur-light">
          <feGaussianBlur stdDeviation="5 0" />
        </filter>
        <filter id="motion-blur-heavy">
          <feGaussianBlur stdDeviation="14 0" />
        </filter>
      </svg>

      <h1 className="book-title-heading">Interactive Sketchbook</h1>

      <div className="stage">
        <button
          className="arrow"
          id="prevButton"
          onClick={() => handleNavigate('prev')}
          aria-label="Previous Page"
        >
          ‹
        </button>

        <div className="book" id="book" ref={bookRef} onClick={handleBookClick}>
          <div className="book-spine-line"></div>
          <div className="page" id="page">
            <div className="half left">{pageData[currentPage].left}</div>
            <div className="half right">{pageData[currentPage].right}</div>
          </div>
        </div>

        <button
          className="arrow"
          id="nextButton"
          onClick={() => handleNavigate('next')}
          aria-label="Next Page"
        >
          ›
        </button>
      </div>

      <p className="caption" id="caption">
        {captionText}
      </p>

      {/* Direct Page Selectors */}
      <div className="book-nav-tabs">
        {pageData.map((p, idx) => (
          <button
            key={p.id}
            className={`nav-tab-btn ${currentPage === idx ? 'active' : ''}`}
            onClick={() => {
              if (idx > currentPage) turnPage('next')
              else if (idx < currentPage) turnPage('prev')
            }}
          >
            {p.id.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
