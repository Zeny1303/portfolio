import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projects } from '../../data/projectsData'

export function TaskflowFinalCTA() {
  const navigate = useNavigate()
  const currentIndex = projects.findIndex((p) => p.id.toLowerCase() === 'taskflow')
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <div className="taskflow-cta-section">
        <h2>Interested in building enterprise task & workflow systems?</h2>
        <p>Let's connect and discuss full-stack React 19, Django REST Framework, and multi-container Docker deployments.</p>
        <button onClick={() => navigate('/contact')} className="taskflow-cta-btn">
          Get In Touch →
        </button>
      </div>

      <nav className="taskflow-nav-footer">
        {prevProject && (
          <Link to={`/work/${prevProject.id}`} className="taskflow-nav-link prev">
            <span className="taskflow-nav-dir">← Previous Project</span>
            <span className="taskflow-nav-title">{prevProject.title}</span>
          </Link>
        )}
        {nextProject && (
          <Link to={`/work/${nextProject.id}`} className="taskflow-nav-link next" style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <span className="taskflow-nav-dir">Next Project →</span>
            <span className="taskflow-nav-title">{nextProject.title}</span>
          </Link>
        )}
      </nav>
    </>
  )
}
