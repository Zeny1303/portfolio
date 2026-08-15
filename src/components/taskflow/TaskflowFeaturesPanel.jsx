import React from 'react'

export function TaskflowFeaturesPanel() {
  const features = [
    {
      icon: '🔐',
      title: 'Stateless JWT Authentication',
      desc: 'Custom Django authentication backend evaluating Bearer tokens with client-side auto-injection via Axios request interceptors and decoupled 401 logout resets.',
      highlights: ['HS256 Bearer Tokens', 'PassLib & Bcrypt Password Hashing', 'Axios Interceptor Pipeline'],
    },
    {
      icon: '📁',
      title: 'Project & Workspace Isolation',
      desc: 'Dynamic project creation with automatic creator promotion to Admin, email invitation workflows, project roster isolation, and cascading project deletion.',
      highlights: ['Multi-Tenant Workspace Scoping', 'Member Email Invitation', 'Cascading Deletion Rules'],
    },
    {
      icon: '✅',
      title: '3-Stage Kanban Workflow Board',
      desc: 'Interactive Kanban board supporting status progression (To Do -> In Progress -> Done), Low/Medium/High priority badges, overdue date highlights, and assignee avatars.',
      highlights: ['3-Stage Status Cycling', 'Priority & Overdue Highlighting', 'Assignee Provenance Tracking'],
    },
    {
      icon: '📊',
      title: 'Executive Analytics Dashboard',
      desc: 'Live metric cards, Recharts status distribution donut charts, team member workload balance bar graphs, and an interactive table for overdue task triage.',
      highlights: ['Recharts Donut & Bar Charts', 'Real-Time Overdue Triage Table', 'Team Workload Distribution'],
    },
    {
      icon: '🛡️',
      title: 'Server-Enforced RBAC Security',
      desc: 'Strict backend permission checks inside Django REST Framework API views ensuring members can only view assigned tasks and update status columns.',
      highlights: ['DRF Custom Permission Classes', 'View-Level Role Validation', 'Database-Level Protection'],
    },
    {
      icon: '🌓',
      title: 'Design System & Theme Engine',
      desc: 'Custom CSS variable design system supporting instant Dark/Light mode toggling, responsive mobile navigation drawer, and polished micro-animations.',
      highlights: ['Dark / Light Mode Toggling', 'CSS Custom Variables', 'Responsive Mobile Drawer'],
    },
  ]

  return (
    <section id="features" className="taskflow-section">
      <h2 className="taskflow-section-title">Core Feature Architecture</h2>
      <p className="taskflow-section-subtitle">
        Engineered for enterprise teams demanding strict data security, clear visual workflow tracking, and responsive task analytics.
      </p>

      <div className="taskflow-features-grid">
        {features.map((f, idx) => (
          <div key={idx} className="taskflow-feature-card">
            <span className="taskflow-feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="taskflow-feature-list">
              {f.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
