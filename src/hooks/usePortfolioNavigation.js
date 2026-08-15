import { useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export const NAV_TARGETS = {
  Home: { route: '/', sectionId: 'hero' },
  About: { route: '/about', sectionId: 'about' },
  Work: { route: '/work', sectionId: 'work-section' },
  Projects: { route: '/work', sectionId: 'work-section' },
  Contact: { route: '/contact', sectionId: 'contact-section' },
}

export const isMainRoute = (pathname) => {
  const cleanPath = pathname.split('#')[0].split('?')[0]
  return cleanPath === '/' || cleanPath === '/about' || cleanPath === '/work' || cleanPath === '/contact'
}

export const isProjectDetailRoute = (pathname) => {
  const cleanPath = pathname.split('#')[0].split('?')[0]
  return cleanPath.startsWith('/work/') && cleanPath !== '/work/' && cleanPath !== '/work'
}

export function usePortfolioNavigation({ stageRef, containerRef } = {}) {
  const navigate = useNavigate()
  const location = useLocation()

  // Tilt animation helper for stage ref
  const tiltStage = useCallback((xPercent, rotation) => {
    const stageEl = stageRef?.current || containerRef?.current
    if (stageEl) {
      gsap.to(stageEl, {
        xPercent,
        rotation,
        duration: 0.77,
        ease: 'power3.out',
        overwrite: true,
      })
    }
  }, [stageRef, containerRef])

  // Scroll to section element
  const scrollToSection = useCallback((sectionId) => {
    if (!sectionId) return

    let attempts = 0
    const maxAttempts = 30

    const attemptScroll = () => {
      const el = document.getElementById(sectionId) || document.querySelector('.' + sectionId)
      if (el) {
        const scroller = containerRef?.current || el.closest('.home-about-container') || el.closest('.work-page')
        if (scroller && typeof scroller.scrollTo === 'function' && scroller !== window) {
          scroller.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (attempts < maxAttempts) {
        attempts++
        requestAnimationFrame(attemptScroll)
      }
    }

    requestAnimationFrame(attemptScroll)
  }, [containerRef])

  // Central Navigation Handler
  const navigateTo = useCallback((targetLabelOrPath, options = {}) => {
    const currentPath = location.pathname.split('#')[0]

    let targetRoute = '/'
    let targetSectionId = 'hero'

    if (NAV_TARGETS[targetLabelOrPath]) {
      targetRoute = NAV_TARGETS[targetLabelOrPath].route
      targetSectionId = NAV_TARGETS[targetLabelOrPath].sectionId
    } else if (typeof targetLabelOrPath === 'string') {
      const [path, hash] = targetLabelOrPath.split('#')
      targetRoute = path || '/'
      targetSectionId = hash || 'hero'
    }

    const isCurrentProjectDetail = isProjectDetailRoute(currentPath)
    const isTargetProjectDetail = isProjectDetailRoute(targetRoute)
    const currentIsContinuousPage = currentPath === '/' || currentPath === '/about'

    // RULE 3: Project Detail Navigation — Direct navigation, NO tilt/overlay transition
    if (isCurrentProjectDetail || isTargetProjectDetail) {
      tiltStage(0, 0)
      if (options.onCloseMenu) options.onCloseMenu()
      navigate(`${targetRoute}${targetSectionId ? '#' + targetSectionId : ''}`)
      return
    }

    // RULE 1: Same-Page Section Navigation
    // If on continuous home page (/ or /about), all sections exist right on this page!
    const isSamePage = (currentIsContinuousPage && (targetRoute === '/' || targetRoute === '/about' || targetRoute === '/work' || targetRoute === '/contact')) ||
                      (currentPath === targetRoute)

    if (isSamePage && !options.forceRoute) {
      tiltStage(0, 0)
      if (options.onCloseMenu) options.onCloseMenu()

      // If target label is Home and we are on continuous home page, scroll to top
      if (targetLabelOrPath === 'Home' && containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        scrollToSection(targetSectionId)
      }
      return
    }

    // RULE 2: Main-Page Cross Navigation with Overlay/Tilt Transition
    const navLinks = [...document.querySelectorAll('[data-nav-label]')]
    if (navLinks.length > 0) {
      gsap.killTweensOf(navLinks)
      gsap.to(navLinks.filter((el) => el.dataset.navLabel !== targetLabelOrPath), {
        opacity: 0,
        x: 30,
        duration: 0.2,
        ease: 'power2.in',
        stagger: 0.04,
      })
    }

    gsap.delayedCall(0.25, () => {
      if (options.onCloseMenu) options.onCloseMenu()
      tiltStage(0, 0)
      navigate(`${targetRoute}#${targetSectionId}`, {
        state: { scrollTo: targetSectionId }
      })
    })
  }, [location.pathname, containerRef, tiltStage, scrollToSection, navigate])

  // Scroll Target Persistence Effect on Mount / Location Change
  useEffect(() => {
    const hashSection = location.hash ? location.hash.replace('#', '') : null
    const stateSection = location.state?.scrollTo
    const targetId = hashSection || stateSection

    if (targetId) {
      scrollToSection(targetId)
    }
  }, [location.pathname, location.hash, location.state, scrollToSection])

  return {
    navigateTo,
    tiltStage,
    scrollToSection,
  }
}
