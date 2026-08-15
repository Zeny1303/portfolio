import React from 'react'

export function TaskflowArchitectureDiagram() {
  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">System Architecture</h2>
      <p className="taskflow-section-subtitle">
        Decoupled Microservice Architecture — React 19 SPA + Nginx Web Server communicating via REST APIs with Gunicorn WSGI + Django DRF + PostgreSQL.
      </p>

      <div className="taskflow-arch-box">
        <div className="taskflow-arch-header">
          <h3>Architectural Topology</h3>
          <span className="taskflow-arch-tag">React 19 + Python 3.11 + Django DRF + PostgreSQL</span>
        </div>

        <div className="taskflow-arch-nodes">
          <div className="taskflow-arch-node">
            <div className="taskflow-arch-node-title">
              <span>💻</span> Frontend SPA Layer
            </div>
            <div className="taskflow-arch-node-pills">
              <span className="taskflow-arch-pill">React 19</span>
              <span className="taskflow-arch-pill">TypeScript 4.9</span>
              <span className="taskflow-arch-pill">AuthContext</span>
              <span className="taskflow-arch-pill">ThemeContext</span>
              <span className="taskflow-arch-pill">Axios Interceptors</span>
              <span className="taskflow-arch-pill">Recharts</span>
              <span className="taskflow-arch-pill">Nginx Container</span>
            </div>
          </div>

          <div className="taskflow-arch-node">
            <div className="taskflow-arch-node-title">
              <span>⚙️</span> Backend API Layer
            </div>
            <div className="taskflow-arch-node-pills">
              <span className="taskflow-arch-pill">Python 3.11+</span>
              <span className="taskflow-arch-pill">Django 4.2+</span>
              <span className="taskflow-arch-pill">Django REST Framework</span>
              <span className="taskflow-arch-pill">Custom JWTAuth</span>
              <span className="taskflow-arch-pill">Gunicorn WSGI</span>
              <span className="taskflow-arch-pill">PassLib & Bcrypt</span>
            </div>
          </div>

          <div className="taskflow-arch-node">
            <div className="taskflow-arch-node-title">
              <span>🛡️</span> Security & RBAC
            </div>
            <div className="taskflow-arch-node-pills">
              <span className="taskflow-arch-pill">Server-Enforced RBAC</span>
              <span className="taskflow-arch-pill">Stateless Bearer JWT</span>
              <span className="taskflow-arch-pill">Project Isolation</span>
              <span className="taskflow-arch-pill">CORS Headers Guard</span>
            </div>
          </div>

          <div className="taskflow-arch-node">
            <div className="taskflow-arch-node-title">
              <span>💾</span> Database & DevOps
            </div>
            <div className="taskflow-arch-node-pills">
              <span className="taskflow-arch-pill">PostgreSQL 15+</span>
              <span className="taskflow-arch-pill">Django ORM</span>
              <span className="taskflow-arch-pill">Docker Compose</span>
              <span className="taskflow-arch-pill">Railway / Nginx</span>
            </div>
          </div>
        </div>

        <div className="taskflow-arch-flow">
{`+-----------------------------------------------------------------------------------+
|                           REACT 19 SPA (TYPESCRIPT)                               |
|   AuthContext | ThemeContext | Axios Interceptor | Recharts Analytics | Nginx Container|
+-----------------------------------------------------------------------------------+
                                          |
                              HTTP REST (Authorization: Bearer <token>)
                                          v
+-----------------------------------------------------------------------------------+
|                        DJANGO REST FRAMEWORK BACKEND                              |
|   CorsHeaders | Custom JWTAuthentication | DRF Serializers | Gunicorn WSGI Server |
+-----------------------------------------------------------------------------------+
     |                             |                             |
     v                             v                             v
+------------------+     +------------------+          +-------------------+
| User Model       |     | Project Model    |          | Task Model        |
| (Django ORM)     |     | & Member Roster  |          | & Status Tracker  |
+------------------+     +------------------+          +-------------------+
                                   |
                                   v
+-----------------------------------------------------------------------------------+
|                           POSTGRESQL DATABASE                                     |
|            Foreign Key Constraints | Index Scans | Relational Tables              |
+-----------------------------------------------------------------------------------+`}
        </div>
      </div>
    </section>
  )
}
