import heroImage from '../assests/HeroImage.png'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Home.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const homeRef = useRef(null)
  const pathRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current

      if (!path) return

      const pathLength = path.getTotalLength()

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      gsap.to(path, {
        strokeDashoffset: 0,

        ease: 'none',

        scrollTrigger: {
          trigger: homeRef.current,

          start: 'top top',
          end: 'bottom bottom',

          scrub: 1,
        },
      })

      ScrollTrigger.refresh()
    }, homeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={homeRef}
      className={styles.homeHero}
    >

      {/* =========================================
          LEFT — HERO TEXT
      ========================================= */}

      <div className={styles.textCol}>

        <h1 className={styles.heading}>

          <span>Curious</span>

          <span>Full Stack</span>

          <span>Developer</span>

        </h1>

      </div>


      {/* =========================================
          RIGHT — HERO IMAGE
      ========================================= */}

      <div className={styles.imageCol}>

        <img
          src={heroImage}
          alt="Sneha"
          className={styles.heroImg}
          draggable="false"
        />


        {/* =========================================
            PATH COMING FROM BEHIND THE IMAGE
        ========================================= */}

        <div className={styles.heroPath}>

          <svg
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >

            <path
              ref={pathRef}
              d="
                M 720 510

                C 720 580,
                  680 620,
                  620 660

                C 540 715,
                  450 730,
                  455 790

                C 460 850,
                  600 835,
                  700 875

                C 780 905,
                  760 950,
                  700 1000
              "
              stroke="#ffffff"
              strokeWidth="200"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          </svg>

        </div>

      </div>


      {/* =========================================
          SCROLL INDICATOR
      ========================================= */}

      <div className={styles.scrollHint}>

        <span>Scroll to explore</span>

        <span className={styles.arrow}>
          ↓
        </span>

      </div>

    </section>
  )
} 