import React from 'react'

export function TaskflowMetricsSection() {
  const metrics = [
    {
      value: 'React 19 + DRF',
      label: 'Decoupled Stack',
      desc: 'React 19 TypeScript SPA frontend paired with Django REST Framework backend APIs.',
    },
    {
      value: '100% TS',
      label: 'Strict Type Safety',
      desc: 'Full client-side type definitions matching backend serializers and model fields.',
    },
    {
      value: 'Server RBAC',
      label: 'Role-Based Access Control',
      desc: 'Strict server-side validation enforcing Admin vs Member workspace capabilities.',
    },
    {
      value: 'JWT Stateless',
      label: 'Bearer Authentication',
      desc: 'Custom Django authentication backend issuing HS256 tokens with Axios auto-injection.',
    },
    {
      value: 'Docker + Nginx',
      label: 'Multi-Container Stack',
      desc: 'Isolated containers for React SPA (Nginx), Gunicorn WSGI backend, and PostgreSQL DB.',
    },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">Key System Metrics</h2>
      <p className="taskflow-section-subtitle">
        Engineered for strict data isolation, role security, and real-time team workflow management.
      </p>

      <div className="taskflow-metrics-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="taskflow-metric-card">
            <span className="taskflow-metric-value">{m.value}</span>
            <span className="taskflow-metric-label">{m.label}</span>
            <span className="taskflow-metric-desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
