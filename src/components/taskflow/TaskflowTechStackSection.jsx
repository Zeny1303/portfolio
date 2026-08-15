import React from 'react'

export function TaskflowTechStackSection() {
  const stack = [
    {
      category: 'Frontend Engineering',
      icon: '🎨',
      items: ['React 19', 'TypeScript 4.9', 'React Router v6', 'Axios 1.x Interceptors', 'Recharts 3.x', 'Lucide React Icons', 'Nginx SPA Server'],
    },
    {
      category: 'Backend Framework',
      icon: '⚙️',
      items: ['Python 3.11+', 'Django 4.2+', 'Django REST Framework 3.14+', 'Gunicorn 21.2+ WSGI', 'Custom JWTAuth (PyJWT 2.8+)'],
    },
    {
      category: 'Database & ORM',
      icon: '💾',
      items: ['PostgreSQL 15+ (Production)', 'SQLite 3 (Development)', 'Django ORM Abstractions', 'Foreign Key Relational Constraints'],
    },
    {
      category: 'DevOps & Security',
      icon: '🛡️',
      items: ['Docker & Docker Compose', 'Stateless JWT Bearer Auth', 'PassLib & Bcrypt Hashing', 'django-cors-headers', 'Railway / Render Deployment'],
    },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">Technology Stack</h2>
      <p className="taskflow-section-subtitle">
        Decoupled React 19 and Django REST Framework microservices built for strict type safety, fast API serialization, and enterprise scalability.
      </p>

      <div className="taskflow-tech-grid">
        {stack.map((group, idx) => (
          <div key={idx} className="taskflow-tech-card">
            <h3>
              <span>{group.icon}</span> {group.category}
            </h3>
            <div className="taskflow-tech-pills">
              {group.items.map((item, i) => (
                <span key={i} className="taskflow-tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
