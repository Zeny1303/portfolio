import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import cortexImg from '../assests/cortex.png'
import taskflowImg from '../assests/taskflow.png'
import nexoraImg from '../assests/nexora.png'
import './WorkPage.css'

gsap.registerPlugin(ScrollTrigger)

// Particle Canvas Component for interactive subtle floating particles
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const particleCount = 50
    const colors = ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)']

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 2.5 + 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default function WorkPage() {
  const navigate = useNavigate()
  const [expandedExplanation, setExpandedExplanation] = useState({})
  const containerRef = useRef(null)
  const horizontalRef = useRef(null)
  const pinRef = useRef(null)

  const toggleExplanation = (index) => {
    setExpandedExplanation((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useLayoutEffect(() => {
    const scrollerEl = containerRef.current
    const horizontalTrack = horizontalRef.current
    const pinSection = pinRef.current

    if (!scrollerEl || !horizontalTrack || !pinSection) return

    // Initialize Lenis on scroller container (.work-page)
    const lenis = new Lenis({
      wrapper: scrollerEl,
      content: scrollerEl.firstElementChild || scrollerEl,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    const tickerCb = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // GSAP Horizontal Scroll animation pinned inside scrollerEl
    const ctx = gsap.context(() => {
      const getDistanceToScroll = () => {
        const totalScrollWidth = horizontalTrack.scrollWidth
        const visibleWidth = scrollerEl.clientWidth
        return Math.max(0, totalScrollWidth - visibleWidth + 120)
      }

      gsap.to(horizontalTrack, {
        x: () => -getDistanceToScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          scroller: scrollerEl,
          start: 'top top',
          end: () => '+=' + (getDistanceToScroll() + 300),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(timer)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  const projects = [
    {
      id: 'cortex',
      title: 'Cortex',
      subtitle: 'AI Interview platform',
      category: 'Real-Time AI Interview SaaS Platform',
      image: cortexImg,
      summary:
        'Built full-stack SaaS platform delivering real-time AI interview experiences with collaborative editor, voice pipeline, analytics, and WebSocket communication.',
      tags: ['JavaScript', 'Node.js', 'React', 'WebSocket', 'Docker', 'AI Voice Pipeline', 'Analytics'],
      bullets: [
        'Built full-stack SaaS platform delivering real-time AI interview experiences with collaborative editor, voice pipeline, analytics, and WebSocket communication.',
        'Engineered modular Node.js backend with WebSocket voice streaming, AI interviewer integration, RESTful APIs, authentication, containerized CI/CD, and observability monitoring.',
        'Designed collaborative in-browser code editor with real-time synchronization, scoring analytics, event-tracking pipeline, and latency-optimized architecture.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    },
    {
      id: 'taskflow',
      title: 'TaskFlow',
      subtitle: 'Task & Workflow Management',
      category: 'Full-Stack Task & Workflow Management Platform',
      image: taskflowImg,
      summary:
        'Engineered a full-stack task management platform utilizing React (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
      tags: ['React', 'TypeScript', 'Django', 'DRF', 'MongoDB', 'Docker', 'JWT', 'Nginx'],
      bullets: [
        'Engineered a full-stack task management platform utilizing React (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
        'Implemented role-based access control (RBAC) and optimized RESTful APIs for seamless CRUD operations, project analytics, and efficient data handling.',
        'Architected a multi-container Docker environment deployed via Railway and Nginx, integrating CI/CD pipelines, state management using AuthContext, and performance monitoring.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    },
    {
      id: 'coinpay',
      title: 'CoinPay',
      subtitle: 'P2P Digital Wallet Platform',
      category: 'Peer-to-Peer Digital Wallet & Payment Platform',
      image: nexoraImg,
      summary:
        'Architected and developed a secure peer-to-peer digital wallet platform enabling virtual credit transfers, QR-based payments, and persistent transaction history.',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'React Native', 'JWT', 'Docker', 'Swagger', 'Bcrypt'],
      bullets: [
        'Architected and developed a secure peer-to-peer digital wallet platform enabling virtual credit transfers using Node.js, Express.js, MongoDB, and React Native.',
        'Implemented JWT authentication, role-based access control (RBAC), QR-based payments, and persistent transaction history.',
        'Engineered 15+ RESTful APIs for authentication, wallet management, and transaction processing using modular MVC architecture with centralized middleware, request validation, bcrypt hashing, and Swagger documentation.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    }
  ]

  return (
    <div className="work-page" ref={containerRef}>
      <ParticleCanvas />

      <button className="work-back-btn" onClick={() => navigate('/')} aria-label="Back to home">
        ← Back to Home
      </button>

      <section className="intro">
        <div className="work-header">
          <span className="work-tag">Featured Works</span>
          <h1 className="work-title">Engineering Projects</h1>
          <p className="work-subtitle">
            Full-stack SaaS applications, real-time WebSocket platforms, microservices architectures, and mobile backend integrations.
          </p>
        </div>
      </section>

      {/* GSAP Horizontal Scroll Gallery */}
      <section id="horizontal-scroll" ref={pinRef}>
        <div className="horizontal-scroll-wrapper">
          <div className="horizontal" ref={horizontalRef}>
            {projects.map((project, index) => (
              <div key={project.id} className="horizontal-item">
                <article className="project-wireframe-card">
                  {/* Image Container at Top */}
                  <div className="project-wireframe-image-box">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="project-wireframe-img" loading="lazy" />
                    ) : (
                      <div className="project-img-placeholder">
                        <span>Image of the project</span>
                      </div>
                    )}
                  </div>

                  {/* Details Section Below Image */}
                  <div className="project-wireframe-details">
                    {/* Row 1: Title (Left) | Action Buttons (Right) */}
                    <div className="project-wireframe-row-1">
                      <div className="title-count-group">
                        <span className="project-count">0{index + 1}</span>
                        <h3 className="project-wireframe-title">{project.title}</h3>
                      </div>

                      <div className="project-wireframe-buttons-col">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wireframe-btn"
                        >
                          Live
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wireframe-btn"
                        >
                          Github
                        </a>
                        <button
                          type="button"
                          className={`wireframe-btn ${expandedExplanation[index] ? 'active' : ''}`}
                          onClick={() => toggleExplanation(index)}
                        >
                          Explanation {expandedExplanation[index] ? '▲' : '▼'}
                        </button>
                      </div>
                    </div>

                    {/* Row 2: Subtitle & Tech Stack Grid (Left Column) | Summary & Explanation (Right Column) */}
                    <div className="project-wireframe-row-2">
                      <div className="wireframe-left-col">
                        <p className="project-wireframe-subtitle">{project.subtitle}</p>

                        <div className="wireframe-tech-section">
                          <span className="wireframe-tech-label">Tech Stack</span>
                          <div className="wireframe-tech-grid">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="tech-badge">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="wireframe-summary-col">
                        <p className="wireframe-summary-text">{project.summary}</p>

                        {expandedExplanation[index] && (
                          <div className="wireframe-explanation-box">
                            <ul>
                              {project.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="work-footer">
        <h2 className="work-footer-title">Looking for a Full-Stack Engineer?</h2>
        <p className="work-footer-subtitle">Let's build something exceptional together.</p>
        <button className="work-footer-btn" onClick={() => navigate('/contact')}>
          Get In Touch →
        </button>
      </footer>
    </div>
  )
}
