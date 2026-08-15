import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projects } from '../../data/projectsData'

export function FinalCTA() {
  const navigate = useNavigate()
  const currentIndex = projects.findIndex((p) => p.id.toLowerCase() === 'cortex')
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <div className="cortex-cta-section">
        <h2>Interested in building intelligent AI-powered platforms?</h2>
        <p>Let's connect and discuss full-stack engineering, LLM orchestration, and speech systems.</p>
        <button onClick={() => navigate('/contact')} className="cortex-cta-btn">
          Get In Touch →
        </button>
      </div>

      <nav className="cortex-nav-footer">
        {prevProject && (
          <Link to={`/work/${prevProject.id}`} className="cortex-nav-link prev">
            <span className="cortex-nav-dir">← Previous Project</span>
            <span className="cortex-nav-title">{prevProject.title}</span>
          </Link>
        )}
        {nextProject && (
          <Link to={`/work/${nextProject.id}`} className="cortex-nav-link next" style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <span className="cortex-nav-dir">Next Project →</span>
            <span className="cortex-nav-title">{nextProject.title}</span>
          </Link>
        )}
      </nav>
    </>
  )
}
