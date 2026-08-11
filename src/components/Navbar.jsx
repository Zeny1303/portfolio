import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export function SiteHeader({ onOpen, activePage, onNavigate }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  const currentPath = activePage || location.pathname

  const handleNav = (path, label) => {
    if (onNavigate) {
      onNavigate(path, label)
    } else {
      navigate(path)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`naked-navbar-backdrop ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
      <div className="navbar-background"></div>

      <div className="navbar-items">
        {/* Left Side Links */}
        <div className="navbar-links left-links">
          <button
            className={`nav-link-btn ${currentPath === '/' || currentPath === 'Home' ? 'active' : ''}`}
            onClick={() => handleNav('/', 'Home')}
          >
            Home
          </button>
          <button
            className={`nav-link-btn ${currentPath === '/about' || currentPath === 'About' ? 'active' : ''}`}
            onClick={() => handleNav('/about', 'About')}
          >
            About
          </button>
        </div>

        {/* Center Brand Logo */}
        <div className="navbar-logo" onClick={() => handleNav('/', 'Home')}>
          <span className="logo-brand">SNEHA</span>
        </div>

        {/* Right Side Links */}
        <div className="navbar-links right-links">
          <button
            className={`nav-link-btn ${currentPath === '/work' || currentPath === 'Work' || currentPath.startsWith('/work') ? 'active' : ''}`}
            onClick={() => handleNav('/work', 'Work')}
          >
            Projects
          </button>
          <button
            className={`nav-link-btn ${currentPath === '/contact' || currentPath === 'Contact' ? 'active' : ''}`}
            onClick={() => handleNav('/contact', 'Contact')}
          >
            Contact
          </button>

          <button className="menu-toggle-btn" onClick={onOpen} aria-label="Toggle Menu">
            MENU
          </button>
        </div>
      </div>
    </header>
  )
}

export function NavPanel({ isOpen, onClose, onLinkClick }) {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Contact', path: '/contact' },
  ]

  const handleClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link.label)
    } else {
      navigate(link.path)
    }
    if (onClose) onClose()
  }

  return (
    <div className={`nav-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="nav-panel-content" onClick={(e) => e.stopPropagation()}>
        <div className="nav-panel-header">
          <span className="nav-panel-title">Navigation</span>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>

        <div className="nav-panel-links">
          {links.map((link) => (
            <button
              key={link.label}
              data-nav-label={link.label}
              className={`nav-panel-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => handleClick(link)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
