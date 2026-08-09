import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journeyMilestones } from '../data/journeyData'
import JourneyCard from './JourneyCard'

gsap.registerPlugin(ScrollTrigger)

export default function Journey() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      if (!path) return

      const pathLength = path.getTotalLength()

      // Set up stroke dash array & offset
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      // Main path drawing scroll animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: '.editorial-about-wrapper',
          start: 'top 25%',
          end: 'bottom 85%',
          scrub: 1,
        },
      })

      // Animate each milestone (Year, Node & Card Reveal)
      const milestoneElements = gsap.utils.toArray('.journey-milestone-row')

      milestoneElements.forEach((el, index) => {
        const yearEl = el.querySelector('.journey-year-text')
        const lineEl = el.querySelector('.journey-year-line')
        const nodeEl = el.querySelector('.journey-node-circle')
        const cardEl = el.querySelector('.editorial-journey-card')

        // Initial hidden states for cards
        gsap.set(cardEl, { opacity: 0, y: 45, scale: 0.97 })
        gsap.set(yearEl, { opacity: 0.35, scale: 0.95, color: '#71717a' })
        if (lineEl) gsap.set(lineEl, { scaleX: 0, transformOrigin: 'left center' })

        ScrollTrigger.create({
          trigger: el,
          scroller: '.editorial-about-wrapper',
          start: 'top 65%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveIndex(index)
            gsap.to(cardEl, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', overwrite: 'auto' })
            gsap.to(yearEl, { opacity: 1, scale: 1.08, color: '#09090b', duration: 0.4, overwrite: 'auto' })
            if (lineEl) gsap.to(lineEl, { scaleX: 1, duration: 0.4, ease: 'power2.out' })
            if (nodeEl) gsap.to(nodeEl, { scale: 1.3, duration: 0.3, ease: 'back.out(2)' })
          },
          onLeaveBack: () => {
            if (index > 0) setActiveIndex(index - 1)
            gsap.to(cardEl, { opacity: 0, y: 35, scale: 0.97, duration: 0.5, ease: 'power2.in' })
            gsap.to(yearEl, { opacity: 0.35, scale: 0.95, color: '#71717a', duration: 0.3 })
            if (lineEl) gsap.to(lineEl, { scaleX: 0, duration: 0.3 })
            if (nodeEl) gsap.to(nodeEl, { scale: 1, duration: 0.3 })
          },
          onEnterBack: () => {
            setActiveIndex(index)
            gsap.to(cardEl, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' })
            gsap.to(yearEl, { opacity: 1, scale: 1.08, color: '#09090b', duration: 0.4 })
            if (lineEl) gsap.to(lineEl, { scaleX: 1, duration: 0.4 })
            if (nodeEl) gsap.to(nodeEl, { scale: 1.3, duration: 0.3 })
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Milestone node positions along the path
  const nodeYPositions = [120, 520, 920, 1320, 1720]

  return (
    <section className="journey-editorial-section" ref={sectionRef}>
      <div className="journey-container">
        {/* Organic Hand-Drawn SVG Journey Path */}
        <div className="journey-svg-wrapper">
          <svg
            viewBox="0 0 200 2000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="journey-svg-path"
            preserveAspectRatio="none"
          >
            {/* Background path guide */}
            <path
              d="M 100 50 C 40 180, 160 350, 100 520 C 40 680, 160 780, 100 920 C 40 1080, 160 1180, 100 1320 C 40 1480, 160 1580, 100 1720 C 60 1850, 140 1920, 100 1980"
              stroke="#E4E4E7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hand-drawn Animated Journey Blue Path */}
            <path
              ref={pathRef}
              d="M 100 50 C 40 180, 160 350, 100 520 C 40 680, 160 780, 100 920 C 40 1080, 160 1180, 100 1320 C 40 1480, 160 1580, 100 1720 C 60 1850, 140 1920, 100 1980"
              fill="none"
              stroke="#2938E8"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* SVG Milestone Nodes along path */}
            {nodeYPositions.map((yPos, i) => (
              <g key={i} className={`svg-node-group ${activeIndex === i ? 'active' : ''}`}>
                <circle
                  cx="100"
                  cy={yPos}
                  r="12"
                  className="node-ring-pulse"
                  fill="none"
                  stroke="#2938E8"
                  strokeWidth="2"
                  opacity={activeIndex === i ? 0.6 : 0}
                />
                <circle
                  cx="100"
                  cy={yPos}
                  r="6"
                  className="journey-node-circle"
                  fill={activeIndex === i ? '#2938E8' : '#A1A1AA'}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Milestones Content List */}
        <div className="journey-milestones-list">
          {journeyMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`journey-milestone-row ${activeIndex === index ? 'active-row' : ''}`}
            >
              {/* LEFT COLUMN: Year */}
              <div className="left-year-col">
                <div className={`journey-year-text ${activeIndex === index ? 'active' : ''}`}>
                  {milestone.year}
                </div>
                <div className="journey-year-line"></div>
              </div>

              {/* CENTER SPACER FOR SVG */}
              <div className="center-spine-col"></div>

              {/* RIGHT COLUMN: Journey Card */}
              <div className="right-card-col">
                <JourneyCard data={milestone} isActive={activeIndex === index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
