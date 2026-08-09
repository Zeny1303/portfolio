import React from 'react'

export default function JourneyCard({ data, isActive }) {
  return (
    <div className={`editorial-journey-card ${isActive ? 'active' : ''}`}>
      <div className="card-header">
        <span className="card-year-tag">{data.year}</span>
        <h3 className="card-heading-title">{data.heading}</h3>
        {data.subtitle && <p className="card-subheading">{data.subtitle}</p>}
      </div>

      {data.institution && (
        <div className="card-institution">
          <span className="inst-icon">🎓</span> {data.institution}
        </div>
      )}

      <p className="card-body-text">{data.description}</p>

      {/* Role & Company Details if present */}
      {data.role && (
        <div className="card-experience-box">
          <div className="role-title">{data.role}</div>
          <div className="company-name">{data.company}</div>
          {data.duration && <div className="duration-tag">{data.duration}</div>}
        </div>
      )}

      {/* Bullets if present */}
      {data.bullets && data.bullets.length > 0 && (
        <ul className="card-bullet-list">
          {data.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}

      {/* Current Focus Grid for 2026 */}
      {data.currentFocus && (
        <div className="current-focus-block">
          <div className="focus-title">Current Direction & Focus:</div>
          <div className="focus-grid">
            {data.currentFocus.map((focus, i) => (
              <span key={i} className="focus-pill">
                ✓ {focus}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech Tags */}
      {data.techTags && data.techTags.length > 0 && (
        <div className="card-tech-footer">
          {data.techTags.map((tech, idx) => (
            <span key={idx} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
