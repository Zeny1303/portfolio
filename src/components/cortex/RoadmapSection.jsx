import React from 'react'
import './CortexProjectDetail.css'

export function RoadmapSection() {
  const roadmapItems = [
    {
      phase: 'Asynchronous Job Processing',
      description:
        'Refactor evaluation logic using BullMQ and Redis so answer scoring happens asynchronously without blocking HTTP response cycles.',
      impact: 'Reduced API latency, improved concurrent user capacity',
    },
    {
      phase: 'WebRTC Audio Pipeline',
      description:
        'Replace browser Web Speech APIs with server-side WebRTC pipeline feeding into OpenAI Whisper for higher accuracy across all browsers and languages.',
      impact: 'Cross-browser compatibility, multi-language support, higher accuracy',
    },
    {
      phase: 'Automated Test Suite',
      description:
        'Write end-to-end API integration tests using Supertest/Jest and frontend component tests using React Testing Library.',
      impact: 'Production-ready confidence, faster refactoring cycles',
    },
    {
      phase: 'Session Resilience & Reconnection',
      description:
        'Implement state recovery so candidates can resume interrupted interview sessions from any device seamlessly with localStorage persistence.',
      impact: 'Better UX on unreliable networks, zero lost progress',
    },
    {
      phase: 'Advanced Analytics & Dashboards',
      description:
        'Add machine learning models to predict interview success rates, identify skill gaps, and provide AI-coached follow-up recommendations.',
      impact: 'Deeper insights, personalized improvement paths',
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Future Technical Roadmap</h2>
      <p className="cortex-section-subtitle">
        Architectural improvements and feature expansions planned for scalable enterprise deployment.
      </p>

      <div className="cortex-roadmap-grid">
        {roadmapItems.map((item, idx) => (
          <div key={idx} className="cortex-roadmap-card">
            <div className="cortex-roadmap-number">{idx + 1}</div>
            <h3 className="cortex-roadmap-phase">{item.phase}</h3>
            <p className="cortex-roadmap-description">{item.description}</p>
            <div className="cortex-roadmap-impact">
              <span className="impact-tag">Impact:</span> {item.impact}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
