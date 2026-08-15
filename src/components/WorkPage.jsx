import { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { projects } from '../data/projectsData'
import { SiteHeader, NavPanel } from './Navbar'
import './WorkPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPage({ scrollerRef, embedded = false }) {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const containerRef = useRef(null)
  const horizontalRef = useRef(null)
  const pinRef = useRef(null)

  useLayoutEffect(() => {
    const horizontalTrack = horizontalRef.current
    const pinSection = pinRef.current

    if (!horizontalTrack || !pinSection) return

    let lenis = null
    let tickerCb = null

    // Initialize Lenis only if standalone (not embedded)
    if (!embedded) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', () => {
        ScrollTrigger.update()
      })

      tickerCb = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerCb)
      gsap.ticker.lagSmoothing(0)
    }

    // GSAP Horizontal Scroll animation pinned inside scrollerEl
    const ctx = gsap.context(() => {
      const getDistanceToScroll = () => {
        const trackWidth = horizontalTrack.scrollWidth
        const viewportWidth = horizontalTrack.parentElement.clientWidth
        return Math.max(0, trackWidth - viewportWidth)
      }

      gsap.to(horizontalTrack, {
        x: () => -getDistanceToScroll(),
        ease: "none",

        scrollTrigger: {
          trigger: pinSection,
          ...(embedded && scrollerRef?.current ? { scroller: scrollerRef.current } : {}),
          start: "top top",
          end: () => `+=${getDistanceToScroll()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef)

    const handleRefresh = () => {
      ScrollTrigger.refresh()
    }

    const timer1 = setTimeout(handleRefresh, 300)
    const timer2 = setTimeout(handleRefresh, 1000)
    window.addEventListener('load', handleRefresh)
    window.addEventListener('resize', handleRefresh)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('load', handleRefresh)
      window.removeEventListener('resize', handleRefresh)
      if (tickerCb) gsap.ticker.remove(tickerCb)
      if (lenis) lenis.destroy()
      ctx.revert()
    }
  }, [scrollerRef, embedded])

  return (
    <div className={embedded ? 'work-section-card' : 'work-page'} ref={containerRef} id="work-section">
      {!embedded && (
        <>
          <SiteHeader onOpen={() => setNavOpen(true)} />
          <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />
        </>
      )}

      <section className="intro">
        <div className="work-header">
          <h1 className="work-title">Projects</h1>
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
                        {project.demo && project.demo !== '#' ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wireframe-btn"
                          >
                            Live
                          </a>
                        ) : (
                          <span className="wireframe-btn" style={{ opacity: 0.65, cursor: 'default' }}>
                            Soon Live
                          </span>
                        )}
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
                          className="wireframe-btn details-btn"
                          onClick={() => navigate(`/work/${project.id}`)}
                        >
                          Details →
                        </button>
                      </div>
                    </div>

                    {/* Row 2: Subtitle & Tech Stack Grid (Left Column) | Summary (Right Column) */}
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
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CODING & GITHUB STATS SECTION (AFTER PROJECTS SCROLL)
      ========================================================= */}
      <section className="coding-stats-section">
        <div className="coding-stats-header">
          <span className="coding-tag">Problem Solving & Open Source</span>
          <h2 className="coding-title">DSA & GitHub Contributions</h2>
          <p className="coding-subtitle">500+ Algorithms Problems Solved & 525+ GitHub Contributions in 2026</p>
        </div>

        <div className="coding-cards-grid">
          {/* LeetCode Card */}
          <div className="coding-card leetcode-card">
            <div className="coding-card-top">
              <div className="coding-card-title">
                <span className="coding-icon leetcode-icon">⚡</span>
                <div>
                  <h3>LeetCode</h3>
                  <span className="coding-handle">@Sneha09 (Zeny1303)</span>
                </div>
              </div>
              <span className="badge-pill">50 Days Badge 2026</span>
            </div>

            <div className="coding-main-stat">
              <div className="stat-large">
                <span className="stat-num">340</span>
                <span className="stat-total">/ 4,018</span>
              </div>
              <span className="stat-lbl">Problems Solved</span>
            </div>

            <div className="difficulty-bars">
              <div className="diff-item diff-easy">
                <div className="diff-info">
                  <span>Easy</span>
                  <strong>133 / 958</strong>
                </div>
                <div className="diff-progress-bg">
                  <div className="diff-progress-fill easy-fill" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div className="diff-item diff-medium">
                <div className="diff-info">
                  <span>Medium</span>
                  <strong>155 / 2,098</strong>
                </div>
                <div className="diff-progress-bg">
                  <div className="diff-progress-fill medium-fill" style={{ width: '8%' }}></div>
                </div>
              </div>

              <div className="diff-item diff-hard">
                <div className="diff-info">
                  <span>Hard</span>
                  <strong>52 / 962</strong>
                </div>
                <div className="diff-progress-bg">
                  <div className="diff-progress-fill hard-fill" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>

            <div className="coding-extra-metrics">
              <div className="extra-metric">
                <span className="extra-val">1,479</span>
                <span className="extra-lbl">Contest Rating (Top 51%)</span>
              </div>
              <div className="extra-metric">
                <span className="extra-val">522</span>
                <span className="extra-lbl">Past Year Submissions</span>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/Zeny1303/"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-link-btn"
            >
              View LeetCode Profile ↗
            </a>
          </div>

          {/* GitHub Card */}
          <div className="coding-card github-card">
            <div className="coding-card-top">
              <div className="coding-card-title">
                <span className="coding-icon github-icon">🐙</span>
                <div>
                  <h3>GitHub</h3>
                  <span className="coding-handle">@Zeny1303</span>
                </div>
              </div>
              <span className="badge-pill github-pill">525 Contributions in 2026</span>
            </div>

            <div className="coding-main-stat">
              <div className="stat-large">
                <span className="stat-num">27</span>
                <span className="stat-total">Repositories</span>
              </div>
              <span className="stat-lbl">Open Source & Backend Engineering</span>
            </div>

            <div className="dsa-topics-list">
              <span className="dsa-topic-tag">Node.js + Express.js</span>
              <span className="dsa-topic-tag">Django REST Framework</span>
              <span className="dsa-topic-tag">FastAPI</span>
              <span className="dsa-topic-tag">MongoDB & PostgreSQL</span>
              <span className="dsa-topic-tag">React / MERN Stack</span>
              <span className="dsa-topic-tag">Docker Containerization</span>
            </div>

            <div className="coding-extra-metrics">
              <div className="extra-metric">
                <span className="extra-val">525</span>
                <span className="extra-lbl">2026 Contributions</span>
              </div>
              <div className="extra-metric">
                <span className="extra-val">11</span>
                <span className="extra-lbl">Stars Earned</span>
              </div>
            </div>

            <a
              href="https://github.com/Zeny1303"
              target="_blank"
              rel="noopener noreferrer"
              className="coding-link-btn"
            >
              View GitHub Profile ↗
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT DETAIL SHOWCASE MODAL OVERLAY
      ========================================================= */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-category">{selectedProject.category}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-tagline">{selectedProject.details.tagline}</p>

              <div className="modal-action-bar">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-btn github-btn">
                  View Source Code on GitHub ↗
                </a>
                {selectedProject.demo !== '#' && (
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="modal-btn demo-btn">
                    Launch Live Demo ↗
                  </a>
                )}
              </div>
            </div>

            {selectedProject.image && (
              <div className="modal-image-container">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
            )}

            <div className="modal-body-grid">
              {/* Left Column: Overview & Architecture */}
              <div className="modal-left-col">
                <div className="modal-section">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.details.overview}</p>
                </div>

                <div className="modal-section">
                  <h3>System Architecture & Design</h3>
                  <ul>
                    {selectedProject.details.architecture.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3>Key Engineering Accomplishments</h3>
                  <ul>
                    {selectedProject.details.keyFeatures.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Metrics & Tech Stack */}
              <div className="modal-right-col">
                <div className="modal-metrics-card">
                  <h3>Key Specifications</h3>
                  <div className="metrics-list">
                    {selectedProject.details.metrics.map((m, idx) => (
                      <div key={idx} className="metric-row">
                        <span className="metric-lbl">{m.label}</span>
                        <strong className="metric-val">{m.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-tech-card">
                  <h3>Technologies Used</h3>
                  <div className="modal-tech-tags">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="modal-tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  )
}
