import { useNavigate } from 'react-router-dom'
import cortexImg from '../assests/cortex.png'
import taskflowImg from '../assests/taskflow.png'
import nexoraImg from '../assests/nexora.png'
import './WorkPage.css'

export default function WorkPage() {
  const navigate = useNavigate()

  const projects = [
    {
      title: 'Cortex',
      subtitle: 'Real-Time AI Interview SaaS Platform',
      image: cortexImg,
      tags: ['JavaScript', 'Node.js', 'React', 'WebSocket', 'Docker', 'AI Voice Pipeline', 'Analytics'],
      bullets: [
        'Built full-stack SaaS platform delivering real-time AI interview experiences with collaborative editor, voice pipeline, analytics, and WebSocket communication.',
        'Engineered modular Node.js backend with WebSocket voice streaming, AI interviewer integration, RESTful APIs, authentication, containerized CI/CD, and observability monitoring.',
        'Designed collaborative in-browser code editor with real-time synchronization, scoring analytics, event-tracking pipeline, and latency-optimized architecture.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    },
    {
      title: 'TaskFlow',
      subtitle: 'Full-Stack Task & Workflow Management Platform',
      image: taskflowImg,
      tags: ['React', 'TypeScript', 'Django', 'Django REST Framework', 'MongoDB', 'Docker', 'JWT', 'Nginx'],
      bullets: [
        'Engineered a full-stack task management platform utilizing React (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
        'Implemented role-based access control (RBAC) and optimized RESTful APIs for seamless CRUD operations, project analytics, and efficient data handling.',
        'Architected a multi-container Docker environment deployed via Railway and Nginx, integrating CI/CD pipelines, state management using AuthContext, and performance monitoring.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    },
    {
      title: 'CoinPay',
      subtitle: 'Peer-to-Peer Digital Wallet & Payment Platform',
      image: nexoraImg,
      tags: ['Node.js', 'Express.js', 'MongoDB', 'React Native', 'JWT', 'Docker', 'Swagger', 'Bcrypt'],
      bullets: [
        'Architected and developed a secure peer-to-peer digital wallet platform enabling virtual credit transfers using Node.js, Express.js, MongoDB, and React Native.',
        'Implemented JWT authentication, role-based access control (RBAC), QR-based payments, and persistent transaction history.',
        'Engineered 15+ RESTful APIs for authentication, wallet management, and transaction processing using modular MVC architecture with centralized middleware, request validation, bcrypt hashing, and Swagger documentation.'
      ],
      github: 'https://github.com/Zeny1303',
      demo: '#'
    }
  ]

  return (
    <div className="work-page">
      <button className="work-back-btn" onClick={() => navigate('/')} aria-label="Back to home">
        ← Back to Home
      </button>

      <div className="work-container">
        <header className="work-header">
          <span className="work-tag">Featured Works</span>
          <h1 className="work-title">Engineering Projects</h1>
          <p className="work-subtitle">
            Full-stack SaaS applications, real-time WebSocket platforms, microservices architectures, and mobile backend integrations built with clean code and modern frameworks.
          </p>
        </header>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${index % 2 === 1 ? 'reverse' : ''}`}>
              <div className="project-image-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                  <div className="project-img-placeholder">
                    <span>💳</span>
                    <span style={{ fontSize: '1rem', color: '#9aa0a6' }}>{project.title}</span>
                  </div>
                )}
              </div>

              <div className="project-content">
                <div>
                  <div className="project-title">
                    <span>{project.title}</span>
                    <span style={{ fontSize: '0.85rem', color: '#00d2ff', fontFamily: "'Geist Mono', monospace" }}>
                      0{index + 1}
                    </span>
                  </div>
                  <p style={{ color: '#8a8d97', fontSize: '0.95rem', marginBottom: '1rem' }}>
                    {project.subtitle}
                  </p>

                  <div className="project-tech-stack">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="project-bullets">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn primary">
                    <span>GitHub Code</span> ↗
                  </a>
                  <button className="project-btn secondary" onClick={() => alert(`Details for ${project.title}`)}>
                    View Architecture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
