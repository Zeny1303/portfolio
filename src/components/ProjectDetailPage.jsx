import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { projects } from '../data/projectsData'
import { SiteHeader, NavPanel } from './Navbar'
import './ProjectDetailPage.css'

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [navOpen, setNavOpen] = useState(false)

  const project = projects.find((p) => p.id.toLowerCase() === (projectId || '').toLowerCase())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  if (!project) {
    return (
      <div className="project-not-found">
        <SiteHeader onOpen={() => setNavOpen(true)} />
        <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />
        <h2>Project Not Found</h2>
        <p>The project "{projectId}" could not be found.</p>
        <button onClick={() => navigate('/work')} className="project-detail-back">
          ← Return to All Projects
        </button>
      </div>
    )
  }

  const currentIndex = projects.findIndex((p) => p.id.toLowerCase() === project.id.toLowerCase())
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="project-detail-page">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

      {/* Hero Header Section */}
      <header className="project-detail-hero">
        <div className="project-detail-hero-content">
          <span className="project-detail-category">{project.category}</span>
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-tagline">{project.details.tagline}</p>

          <div className="project-detail-actions">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="detail-action-btn github">
              View Source Code on GitHub ↗
            </a>
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="detail-action-btn live">
                Launch Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {/* High Resolution Image Preview */}
      {project.image && (
        <div className="project-detail-media-container">
          <img src={project.image} alt={project.title} className="project-detail-img" />
        </div>
      )}

      {/* Main Content Grid */}
      <main className="project-detail-container">
        <div className="project-detail-grid">
          {/* Left Column: Deep Dive Narrative */}
          <div className="project-detail-main-col">
            <section className="detail-card-section">
              <h2>Project Overview</h2>
              <p className="overview-text">{project.details.overview}</p>
            </section>

            <section className="detail-card-section">
              <h2>System Architecture & Design</h2>
              <ul className="detail-list">
                {project.details.architecture.map((item, idx) => (
                  <li key={idx}>
                    <span className="list-icon">⚡</span>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-card-section">
              <h2>Key Engineering Accomplishments</h2>
              <ul className="detail-list">
                {project.details.keyFeatures.map((feat, idx) => (
                  <li key={idx}>
                    <span className="list-icon">✓</span>
                    <div>{feat}</div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Specs & Tech Stack */}
          <aside className="project-detail-sidebar">
            <div className="sidebar-card metrics-card">
              <h3>Technical Specs</h3>
              <div className="metrics-grid">
                {project.details.metrics.map((m, idx) => (
                  <div key={idx} className="metric-row">
                    <span className="metric-lbl">{m.label}</span>
                    <strong className="metric-val">{m.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card tech-card">
              <h3>Tech Stack & Tools</h3>
              <div className="tech-tags-grid">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="detail-tech-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Next / Previous Project Navigation */}
        <nav className="project-nav-footer">
          <Link to={`/work/${prevProject.id}`} className="project-nav-link prev">
            <span className="nav-dir">← Previous Project</span>
            <span className="nav-title">{prevProject.title}</span>
          </Link>
          <Link to={`/work/${nextProject.id}`} className="project-nav-link next">
            <span className="nav-dir">Next Project →</span>
            <span className="nav-title">{nextProject.title}</span>
          </Link>
        </nav>
      </main>

      {/* Footer CTA */}
      <footer className="project-detail-footer">
        <h2>Interested in building something together?</h2>
        <p>Let's discuss full-stack & backend engineering roles.</p>
        <button onClick={() => navigate('/contact')} className="footer-contact-btn">
          Get In Touch →
        </button>
      </footer>
    </div>
  )
}
