import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NavPanel, SiteHeader } from './Navbar'
import WorkPage from './WorkPage'
import ContactBoard from './contactBoard/ContactBoard'
import TechnologySection from './TechnologySection'
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
          end: 'bottom bottom',
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
    if (label === 'Work') {
      const el = document.getElementById('work-section')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else navigate('/work')
    }
    if (label === 'About') {
      const el = containerRef.current?.querySelector('.about-section-card')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else navigate('/about')
    }
    if (label === 'Contact') {
      const el = document.getElementById('contact-section')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else navigate('/contact')
    }
    if (label === 'Home') {
      if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      else navigate('/')
    }
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

          {/* ═══════════════════════════════════════════
              1. HERO SECTION
          ═══════════════════════════════════════════ */}
          <section className="hh-hero">

            {/* ── Inner grid wrapper ── */}
            <div className="hh-grid">

              {/* ══ LEFT COLUMN ══ */}
              <div className="hh-left">

                {/* Eyebrow */}
                <div className="hh-eyebrow">
                  <span className="hh-eyebrow-line" />
                  <span className="hh-eyebrow-text">HI, I'M SNEHA</span>
                </div>

                {/* Main headline */}
                <h1 className="hh-headline">
                  <span>Curious</span>
                  <span>Full Stack</span>
                  <span>Developer</span>
                </h1>

                {/* Description */}
                <p className="hh-desc">
                  Full-stack developer building thoughtful<br />
                  digital experiences with modern web technologies.
                </p>

                {/* CTA row */}
                <div className="hh-cta-row">
                  
                  <button
                    className="hh-btn-ghost"
                    onClick={() => {
                      containerRef.current?.querySelector('.about-section-card')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Scroll to explore &nbsp;↓
                  </button>
                </div>

              </div>

              {/* ══ RIGHT COLUMN ══ */}
              <div className="hh-right">

                {/* Handwritten annotation */}
                <div className="hh-annotation" aria-hidden="true">
                  <svg viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="4" y="24"
                      fontFamily="'Caveat', 'Dancing Script', cursive, Georgia, serif"
                      fontSize="17" fill="#4a4540" fontStyle="italic" fontWeight="400"
                    >Building ideas</text>
                    <text x="4" y="48"
                      fontFamily="'Caveat', 'Dancing Script', cursive, Georgia, serif"
                      fontSize="17" fill="#4a4540" fontStyle="italic" fontWeight="400"
                    >that solve real</text>
                    <text x="4" y="72"
                      fontFamily="'Caveat', 'Dancing Script', cursive, Georgia, serif"
                      fontSize="17" fill="#4a4540" fontStyle="italic" fontWeight="400"
                    >problems</text>
                    {/* hand-drawn curved arrow pointing right toward the portrait */}
                    <path
                      d="M 110 60 C 135 48, 155 52, 168 62"
                      stroke="#888" strokeWidth="1.4" fill="none"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                    {/* arrowhead */}
                    <path
                      d="M 162 56 C 166 60, 168 62, 164 67"
                      stroke="#888" strokeWidth="1.4" fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Portrait stage — shape + image stacked */}
                <div className="hh-portrait-stage">

                  {/* Organic soft shape behind the portrait */}
                  <svg
                    className="hh-organic-shape"
                    viewBox="0 0 520 560"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="
                        M 260 30
                        C 370 20, 490 90, 505 220
                        C 518 340, 460 460, 340 510
                        C 230 555, 90 530, 40 410
                        C -10 295, 30 140, 120 75
                        C 170 42, 210 36, 260 30
                        Z
                      "
                      fill="#EDE5D8"
                      opacity="0.88"
                    />
                  </svg>

                  {/* Portrait */}
                  <img
                    src={heroImage}
                    alt="Sneha"
                    className="hh-portrait"
                    draggable="false"
                  />

                </div>

                {/* Availability tag */}
                <div className="hh-avail" aria-label="Based in India, available for work">
                  <span className="hh-avail-line" />
                  <div className="hh-avail-text">
                    <span>BASED IN INDIA</span>
                    <span>AVAILABLE FOR WORK</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="hh-bottom">
              <div className="hh-bottom-left">
                
              </div>
              <div className="hh-bottom-right">
                <a href="https://github.com/Zeny1303" target="_blank" rel="noopener noreferrer" className="hh-social-icon" aria-label="GitHub">
                  {/* GitHub icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/Sneha1309" target="_blank" rel="noopener noreferrer" className="hh-social-icon" aria-label="LinkedIn">
                  {/* LinkedIn icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="mailto:snehakashyap9920@gmail.com" className="hh-social-icon" aria-label="Email">
                  {/* Email icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
              </div>
            </div>

          </section>

          {/* ═══════════════════════════════════════════
              2. ABOUT SECTION CARD (SLIDES UP OVER HERO SECTION)
          ═══════════════════════════════════════════ */}
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

                  L 760 4300
                  "
                  stroke="#FFFF"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Spotlight Cards Section */}
            <div className="spotlight-section pb-36 md:pb-60" ref={spotlightRef}>
              <div className="journey-wrapper">
                {/* 2022 */}
                <article className="journey-row left-row">
                  <div className="journey-content">
                    <div className="journey-card card-purple">
                      <span className="card-label">THE BEGINNING</span>
                      <h2>I started exploring.</h2>
                      <p>
                        Joined Babu Banarasi Das Institute of Technology and Management for B.Tech in Computer Science Engineering with a Data Science specialization.
                      </p>
                      <p>
                        I explored core foundations across <strong>Data Science</strong> and <strong>Web Development</strong>.
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
                  <div className="year">2022</div>
                </article>

                {/* 2023 - 2024 */}
                <article className="journey-row right-row">
                  <div className="journey-content">
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
                  <div className="year">2023–24</div>
                </article>

                {/* 2024 - 2025 */}
                <article className="journey-row left-row">
                  <div className="journey-content">
                    <div className="journey-card card-orange">
                      <span className="card-label">THE DIRECTION</span>
                      <h2>Web development clicked.</h2>
                      <p>
                        I focused on core Web Development, transitioning from learning technologies to building real-world applications.
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
                  <div className="year">2024–25</div>
                </article>

                {/* 2025 */}
                <article className="journey-row right-row">
                  <div className="journey-content">
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
                  <div className="year">2025</div>
                </article>

                {/* 2026 */}
                <article className="journey-row left-row">
                  <div className="journey-content">
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
                    </div>
                  </div>
                  <div className="year">2026</div>
                </article>

              </div>
            </div>

            <TechnologySection scrollerRef={containerRef} />
          </section>

          {/* ═══════════════════════════════════════════
              3. WORK / PROJECTS SECTION CARD (SLIDES UP OVER SKILLS)
          ═══════════════════════════════════════════ */}
          <WorkPage scrollerRef={containerRef} embedded={true} />

          {/* ═══════════════════════════════════════════
              4. CONTACT SECTION CARD (SLIDES UP OVER WORK)
          ═══════════════════════════════════════════ */}
          <section className="contact-section-card" id="contact-section">
            <ContactBoard />
          </section>
        </div>
      </div>
    </>
  )
}