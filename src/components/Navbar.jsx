import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export function SiteHeader({ onOpen, activePage, onNavigate }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const currentPath = activePage || location.pathname

  const handleNav = (path, label) => {
    if (onNavigate) {
      onNavigate(path, label)
    } else {
      navigate(path)
    }
  }

  return (
    <header className="site-header">
      <div className="brand-logo" onClick={() => handleNav('/', 'Home')}>
        SNEHA
      </div>

      <nav className="header-nav">
        <button
          className={`nav-item-btn ${currentPath === '/' || currentPath === 'Home' ? 'active' : ''}`}
          onClick={() => handleNav('/', 'Home')}
        >
          Home
        </button>
        <button
          className={`nav-item-btn ${currentPath === '/about' || currentPath === 'About' ? 'active' : ''}`}
          onClick={() => handleNav('/about', 'About')}
        >
          About
        </button>
        <button
          className={`nav-item-btn ${currentPath === '/work' || currentPath === 'Work' ? 'active' : ''}`}
          onClick={() => handleNav('/work', 'Work')}
        >
          Projects
        </button>
        <button
          className={`nav-item-btn ${currentPath === '/contact' || currentPath === 'Contact' ? 'active' : ''}`}
          onClick={() => handleNav('/contact', 'Contact')}
        >
          Contact
        </button>

        <button className="menu-toggle-btn" onClick={onOpen}>
          📖 Book View
        </button>
      </nav>
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

        <div className="nav-panel-footer">
          <p>© {new Date().getFullYear()} Sneha — Software Engineer</p>
          <p style={{ marginTop: '4px', opacity: 0.7 }}>Flip Book & Page Navigation</p>
        </div>
      </div>
    </div>
  )
}
