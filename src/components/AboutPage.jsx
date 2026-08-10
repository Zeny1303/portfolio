import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NavPanel, SiteHeader } from './Navbar'
import heroImage from '../assests/HeroImage.png'
import bkBg from '../assests/bk.png'
import cloudsImg from '../assests/cloudss.png'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const spotlightRef = useRef(null)
  const aboutCardRef = useRef(null)
  const cloudLayerRef = useRef(null)
  const mainRef = useRef(null)
  const [navOpen, setNavOpen] = useState(false)

  const tilt = (xPercent, rotation) => {
    if (mainRef.current) {
      gsap.to(mainRef.current, { xPercent, rotation, duration: 0.77, ease: 'tilt', overwrite: true })
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      const spotlight = spotlightRef.current
      const aboutCard = aboutCardRef.current
      const cloudLayer = cloudLayerRef.current
      const rows = gsap.utils.toArray('.journey-row')

      if (!path || !containerRef.current || !spotlight) return

      const pathLength = path.getTotalLength()

      // Initial SVG path state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      // SVG path drawing triggered as About section card scrolls into view
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: spotlight,
          scroller: containerRef.current,
          start: 'top 80%',
          end: 'bottom 155%',
          scrub: true, // 1:1 instant sync with user scroll speed (no catch-up delay)
          invalidateOnRefresh: true,
        },
      })

      // Milestone Card Animations
      rows.forEach((row) => {
        const card = row.querySelector('.journey-card')
        if (!card) return

        ScrollTrigger.create({
          trigger: row,
          scroller: containerRef.current,
          start: 'top 75%',
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

      // Cloud parallax — clouds stay behind the title but drift subtly with scroll.
      if (cloudLayer && aboutCard) {
        gsap.to(cloudLayer, {
          y: 140,
          xPercent: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutCard,
            scroller: containerRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
      }

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

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
          gsap.to(navLinks.filter((el) => el.dataset.navLabel !== label), {
            opacity: 0,
            x: 30,
            duration: 0.2,
            ease: 'power2.in',
            stagger: 0.04,
          })
          gsap.delayedCall(0.25, () => {
            setNavOpen(false)
            handleNavLink(label)
          })
        }}
      />

      <div className="home-about-container" ref={containerRef}>
        <div ref={mainRef} style={{ width: '100%', position: 'relative' }}>
          <SiteHeader
            activePage="About"
            onNavigate={(path) => navigate(path)}
            onOpen={() => {
              setNavOpen(true)
              tilt(-50, 12)
            }}
          />

          {/* 1. STICKY HOME HERO SECTION */}
          <section className="home-hero-section">
            <div className="home-text-col">
              <h1 className="home-heading">
                <span className="home-line">Curious</span>
                <span className="home-line">Full Stack</span>
                <span className="home-line">Developer</span>
              </h1>
            </div>

            <div className="home-image-col">
              <img
                src={heroImage}
                alt="Sneha"
                className="home-hero-img"
                draggable="false"
              />
            </div>
          </section>

          {/* 2. ABOUT SECTION CARD (SLIDES UP OVER HERO SECTION) */}
          <section className="about-section-card" ref={aboutCardRef} style={{ backgroundImage: `url(${bkBg})` }}>
            {/* Decorative transparent cloud layer.
                The PNG already has transparency, so it floats directly over the blue
                background. z-index keeps it behind the Journey heading and timeline. */}
            <div className="journey-cloud-layer" ref={cloudLayerRef} aria-hidden="true">
              <img
                src={cloudsImg}
                alt=""
                className="journey-cloud-image"
                draggable="false"
              />
            </div>

            {/* Journey Title Header */}
            <div className="journey-title-section">
              <h2 className="journey-main-heading">
                The Journe<span className="word-y">y</span>
              </h2>
            </div>

            {/* Continuous SVG Path Layer */}
            <div className="continuous-svg-layer">
              <svg
                viewBox="0 0 1000 5000"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="continuous-journey-path"
                  ref={pathRef}
                  d="
                  M 960 20

                  C 640 220,
                    280 280,
                    250 520

                  C 220 760,
                    760 700,
                    760 1150

                  C 760 1460,
                    270 1450,
                    250 1940

                  C 230 2320,
                    760 2300,
                    760 2700

                  C 760 3080,
                    260 3070,
                    250 3480

                  C 240 3770,
                    760 3750,
                    760 4150
                  "
                  stroke="#F36B16"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Spotlight Cards Section */}
            <div className="spotlight-section" ref={spotlightRef}>
              <div className="journey-wrapper">
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
                </article>

                {/* 2023 - 2024 */}
                <article className="journey-row right-row">
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
                </article>

                {/* 2025 */}
                <article className="journey-row right-row">
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
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}