import React from 'react'

export function TaskflowEngineeringDecisionsSection() {
  const decisions = [
    {
      num: '01',
      title: 'Server-Enforced RBAC at DRF View Layer',
      desc: 'UI permission hiding can easily be bypassed by malicious HTTP clients. TaskFlow enforces role validation directly inside Django REST Framework API views (`ProjectDetailView`, `TaskDetailView`), rejecting unauthorized requests at the ORM layer with HTTP 403 Forbidden.',
    },
    {
      num: '02',
      title: 'Decoupled Nginx + WSGI Containerization',
      desc: 'To achieve independent scalability, TaskFlow builds the React 19 SPA into optimized static bundles served via Nginx, while running the Django backend under Gunicorn WSGI. This decouples static asset delivery from Python API request processing.',
    },
    {
      num: '03',
      title: 'Stateless Custom JWT Token Interceptor',
      desc: 'By implementing custom PyJWT `JWTAuthentication` with Axios request/response interceptors, TaskFlow avoids session state storage overhead on the server. If a 401 response occurs, custom browser events gracefully reset UI state without full page reloads.',
    },
    {
      num: '04',
      title: 'Relational Schema Cascading Integrity',
      desc: 'Using Django ORM `on_delete=models.CASCADE` relationships across `Project`, `ProjectMember`, and `Task` models guarantees zero orphaned database records when a project workspace or user account is deleted.',
    },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">Architectural Deep Dive</h2>
      <p className="taskflow-section-subtitle">
        Key engineering decisions and security trade-offs solved during full-stack development and multi-container deployment.
      </p>

      <div className="taskflow-decisions-grid">
        {decisions.map((d, idx) => (
          <div key={idx} className="taskflow-decision-card">
            <span className="taskflow-decision-num">{d.num}</span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
