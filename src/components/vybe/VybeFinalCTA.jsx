import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projects } from '../../data/projectsData'

export function VybeFinalCTA() {
  const navigate = useNavigate()
  const currentIndex = projects.findIndex((p) => p.id.toLowerCase() === 'vybe')
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <div className="vybe-cta-section">
        <h2>Interested in building scalable real-time applications?</h2>
        <p>Let's connect and discuss full-stack, WebSockets, and backend system architecture.</p>
        <button onClick={() => navigate('/contact')} className="vybe-cta-btn">
          Get In Touch →
        </button>
      </div>

      <nav className="vybe-nav-footer">
        {prevProject && (
          <Link to={`/work/${prevProject.id}`} className="vybe-nav-link prev">
            <span className="vybe-nav-dir">← Previous Project</span>
            <span className="vybe-nav-title">{prevProject.title}</span>
          </Link>
        )}
        {nextProject && (
          <Link to={`/work/${nextProject.id}`} className="vybe-nav-link next" style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <span className="vybe-nav-dir">Next Project →</span>
            <span className="vybe-nav-title">{nextProject.title}</span>
          </Link>
        )}
      </nav>
    </>
  )
}
