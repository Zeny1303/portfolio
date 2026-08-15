import React from 'react'
import './CortexProjectDetail.css'

export function PerformanceSection() {
  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Performance & Architecture Limits</h2>
      <p className="cortex-section-subtitle">
        System response benchmarks, execution boundaries, and production scaling strategy.
      </p>

      <div className="cortex-performance-grid">
        <div className="cortex-performance-card">
          <h3>AI Request Latency</h3>
          <div className="cortex-performance-metric">1.5s – 3.5s</div>
          <p>
            External OpenRouter API latency for question generation and answer evaluation depends on model load.
          </p>
        </div>

        <div className="cortex-performance-card">
          <h3>Session Completion Time</h3>
          <div className="cortex-performance-metric">15 – 30 mins</div>
          <p>
            5 questions × (60s–120s per question + 2s evaluation + feedback synthesis).
          </p>
        </div>

        <div className="cortex-performance-card">
          <h3>Current Architecture Limits</h3>
          <ul className="cortex-performance-list">
            <li>Single Express container (no horizontal scaling)</li>
            <li>Primary MongoDB instance (no read replicas)</li>
            <li>Synchronous answer evaluation (blocks HTTP response)</li>
            <li>Static file serving from Node.js (no CDN)</li>
          </ul>
        </div>

        <div className="cortex-performance-card">
          <h3>System Bottlenecks</h3>
          <ul className="cortex-performance-list">
            <li>External AI API rate limits</li>
            <li>Database single-instance throughput</li>
            <li>Browser voice recognition accuracy variance</li>
            <li>PDF parsing complexity for malformed documents</li>
          </ul>
        </div>
      </div>

      <div className="cortex-scaling-note">
        <strong>🚀 Production Scaling Strategy:</strong> Introducing Redis caching for pre-generated questions, BullMQ background worker queues for async evaluation, MongoDB replica sets for read splitting, and AWS ALB/ECS auto-scaling behind CloudFront CDN supports 10,000+ concurrent interview sessions.
      </div>
    </section>
  )
}
