import React, { useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const spotlightRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      const spotlight = spotlightRef.current
      const rows = gsap.utils.toArray('.journey-row')

      if (!path || !spotlight || !containerRef.current) return

      const pathLength = path.getTotalLength()

      // Initial SVG path state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      // SVG path drawing linked to scroll position
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: spotlight,
          scroller: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Card & Row Animations
      rows.forEach((row) => {
        const card = row.querySelector('.journey-card')
        if (!card) return

        ScrollTrigger.create({
          trigger: row,
          scroller: containerRef.current,
          start: 'top 70%',
          end: 'bottom 35%',
          onEnter: () => activateRow(row, card),
          onEnterBack: () => activateRow(row, card),
          onLeaveBack: () => deactivateRow(row, card),
        })
      })

      function activateRow(row, card) {
        row.classList.add('active')
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      function deactivateRow(row, card) {
        row.classList.remove('active')
        gsap.to(card, {
          opacity: 0,
          y: 60,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="editorial-about-wrapper" ref={containerRef}>
      {/* Back to Home Button */}
      <button className="journey-back-nav" onClick={() => navigate('/')} aria-label="Back to Home">
        ← Home
      </button>

      {/* =====================================================
           HERO SECTION
      ====================================================== */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">ABOUT ME</p>
          <h1>
            Curiosity<br />
            drives me.
          </h1>
        </div>

        <div className="scroll-hint">
          <span>Scroll to explore</span>
          <span className="arrow">↓</span>
        </div>
      </section>

      {/* =====================================================
           SPOTLIGHT JOURNEY SECTION
      ====================================================== */}
      <section className="spotlight" ref={spotlightRef}>
        {/* SVG JOURNEY PATH */}
        <div className="svg-path">
          <svg
            viewBox="0 0 1000 5000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="journey-path"
              ref={pathRef}
              d="
              M 500 100

              C 500 250,
                280 300,
                250 520

              C 220 760,
                760 700,
                760 1000

              C 760 1260,
                270 1250,
                250 1540

              C 230 1820,
                760 1800,
                760 2100

              C 760 2380,
                260 2370,
                250 2680

              C 240 2970,
                760 2950,
                760 3250

              C 760 3520,
                280 3520,
                250 3830

              C 220 4140,
                720 4100,
                700 4400

              C 680 4620,
                500 4750,
                500 4900
              "
              stroke="#220AFA"
              strokeWidth="60"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* JOURNEY CONTENT */}
        <div className="journey">
          {/* 2022 */}
          <article className="journey-row left-row">
            <div className="journey-content">
              <div className="year">2022</div>
              <div className="journey-card card-purple">
                <span className="card-label">THE BEGINNING</span>
                <h2>I started exploring.</h2>
                <p>
                  Joined Babu Banarasi Das Institute of Technology and Management for B.Tech in Computer Science Engineering with a Data Science specialization.
                </p>
                <p>
                  I became curious about two different worlds: <strong>Data Science</strong> and <strong>Web Development</strong>.
                </p>
                <div className="tech-stack">
                  <span>Python</span>
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>C</span>
                  <span>C++</span>
                </div>
              </div>
            </div>

            <div className="journey-point">
              <span className="milestone-dot"></span>
            </div>
          </article>

          {/* 2023 - 2024 */}
          <article className="journey-row right-row">
            <div className="journey-point">
              <span className="milestone-dot"></span>
            </div>

            <div className="journey-content">
              <div className="year">2023–24</div>
              <div className="journey-card card-green">
                <span className="card-label">EXPLORATION</span>
                <h2>Finding what interests me.</h2>
                <p>
                  I spent this period experimenting with different areas of technology rather than forcing myself into one direction.
                </p>
                <p>
                  Slowly, I realized that I enjoyed <strong>building things</strong> more than simply studying them.
                </p>
                <div className="tech-stack">
                  <span>Machine Learning</span>
                  <span>Pandas</span>
                  <span>NumPy</span>
                  <span>JavaScript</span>
                  <span>React</span>
                </div>
              </div>
            </div>
          </article>

          {/* 2024 - 2025 */}
          <article className="journey-row left-row">
            <div className="journey-content">
              <div className="year">2024–25</div>
              <div className="journey-card card-orange">
                <span className="card-label">THE DIRECTION</span>
                <h2>Web development clicked.</h2>
                <p>
                  My curiosity became more focused. I started moving from learning technologies to actually building real websites and applications.
                </p>
                <div className="experience">
                  <div className="experience-title">Freelance Web Developer</div>
                  <div className="experience-company">Resolute Edu Institute · Feb 2025 – Jun 2025</div>
                </div>
                <p>
                  Built the institute's website, Student Zone, Scholarship Registration flow and dynamic Course Catalog.
                </p>
                <div className="tech-stack">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>Web Development</span>
                </div>
              </div>
            </div>

            <div className="journey-point">
              <span className="milestone-dot"></span>
            </div>
          </article>

          {/* 2025 */}
          <article className="journey-row right-row">
            <div className="journey-point">
              <span className="milestone-dot"></span>
            </div>

            <div className="journey-content">
              <div className="year">2025</div>
              <div className="journey-card card-blue">
                <span className="card-label">REAL SOFTWARE</span>
                <h2>From building alone to building with a team.</h2>
                <div className="experience">
                  <div className="experience-title">Software Engineer Intern</div>
                  <div className="experience-company">XRG Consulting Private Limited · Sep 2025 – Nov 2025</div>
                </div>
                <p>
                  Worked on Anvayaa KinCare using React, Tailwind CSS and Django REST APIs.
                </p>
                <p>
                  Built reusable UI modules, integrated APIs, implemented search, filtering, pagination and validation, and collaborated with senior developers and QA engineers.
                </p>
                <div className="tech-stack">
                  <span>React</span>
                  <span>Tailwind CSS</span>
                  <span>Django</span>
                  <span>DRF</span>
                  <span>REST API</span>
                </div>
              </div>
            </div>
          </article>

          {/* 2026 */}
          <article className="journey-row left-row">
            <div className="journey-content">
              <div className="year">2026</div>
              <div className="journey-card card-pink">
                <span className="card-label">NOW</span>
                <h2>The journey continues.</h2>
                <p>Graduated on June 18, 2026.</p>
                <p>
                  Now I'm looking for full-time opportunities where I can continue growing as a <strong>Full Stack / Backend Engineer</strong>.
                </p>
                <div className="tech-stack">
                  <span>Python</span>
                  <span>Django</span>
                  <span>DRF</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>React</span>
                  <span>JWT</span>
                  <span>DSA</span>
                </div>
                <div className="ending">
                  Still curious.<br />
                  Still building.
                </div>
              </div>
            </div>

            <div className="journey-point">
              <span className="milestone-dot"></span>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
