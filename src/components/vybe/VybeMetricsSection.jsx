import React from 'react'

export function VybeMetricsSection() {
  const metrics = [
    {
      value: '< 100ms',
      label: 'Real-time Latency',
      desc: 'Sub-100ms bi-directional Socket.IO updates for live listening activity and 1-on-1 chat.',
    },
    {
      value: 'Dual Engine',
      label: 'Multi-Catalog Discovery',
      desc: 'Streams Jamendo CC audio directly while searching Spotify & MusicBrainz metadata.',
    },
    {
      value: 'Synced LRC',
      label: 'Karaoke Lyrics Parser',
      desc: 'Millisecond-accurate line highlighting powered by dual LRCLIB and Jamendo APIs.',
    },
    {
      value: '5 Min Cache',
      label: 'In-Memory Query TTL',
      desc: 'High-performance backend CatalogService caching for instant unified search results.',
    },
    {
      value: 'Clerk RBAC',
      label: 'Role-Based Security',
      desc: 'JWT bearer tokens, route gates, and primary email verification for admin media uploads.',
    },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">Key System Metrics</h2>
      <p className="vybe-section-subtitle">
        Engineered for high concurrency, low latency playback synchronization, and responsive social media exploration.
      </p>

      <div className="vybe-metrics-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="vybe-metric-card">
            <span className="vybe-metric-value">{m.value}</span>
            <span className="vybe-metric-label">{m.label}</span>
            <span className="vybe-metric-desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
