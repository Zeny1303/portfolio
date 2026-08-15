import React from 'react'

export function VybeFeaturesPanel() {
  const features = [
    {
      icon: '🎵',
      title: 'Persistent Audio Engine',
      desc: 'Bottom playback controls with Play/Pause, Seekbar, Volume control, Shuffle, Repeat (One/All), queue management, and soundwave equalizer animations.',
      highlights: ['HTML5 Audio Integration', 'Zustand State Store', 'Dynamic Track Queue'],
    },
    {
      icon: '⚡',
      title: 'Mood Discovery Engine',
      desc: '"What\'s Your Vybe?" Instant mood tag filtering across Energy Boost, Chill Mode, Focus Flow, Late Night, Party Vibes, Melancholy, Road Trip, and Feel Good profiles.',
      highlights: ['8 Vibe Configurations', 'Jamendo Tag Filtering', 'Infinite Pagination'],
    },
    {
      icon: '🔍',
      title: 'Unified Multicategory Search',
      desc: 'Server-side ranked search querying playable Creative Commons audio alongside Spotify & MusicBrainz metadata with fuzzy relevance scoring.',
      highlights: ['Jamendo + Spotify Web API', 'In-Memory Query Cache', 'Playable Flag Scopes'],
    },
    {
      icon: '💬',
      title: 'Real-Time Social & Chat',
      desc: 'Socket.IO WebSocket layer pushing live user presence, active track broadcasting, soundwave equalizers, and 1-on-1 direct track-sharing messages.',
      highlights: ['WebSockets (Socket.IO)', 'Live User Presence', 'In-Chat Track Sharing'],
    },
    {
      icon: '📜',
      title: 'Synchronized LRC Lyrics',
      desc: 'Line-by-line synced lyrics reader parsing timestamped LRC tags with dual-provider fallback via LRCLIB and Jamendo APIs.',
      highlights: ['LRC Timestamp Parser', 'LRCLIB API Fallback', 'Millisecond Highlighting'],
    },
    {
      icon: '🛡️',
      title: 'Protected Admin Dashboard',
      desc: 'Clerk role-based route security allowing authorized admins to upload audio & cover images directly to Cloudinary and manage the MongoDB catalog.',
      highlights: ['Cloudinary File Uploads', 'Clerk Email Authorization', 'Catalog Stats Dashboard'],
    },
  ]

  return (
    <section id="features" className="vybe-section">
      <h2 className="vybe-section-title">Core Feature Architecture</h2>
      <p className="vybe-section-subtitle">
        Designed from the ground up to combine rich audio playback, real-time WebSockets, and scalable multi-provider cloud integrations.
      </p>

      <div className="vybe-features-grid">
        {features.map((f, idx) => (
          <div key={idx} className="vybe-feature-card">
            <span className="vybe-feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="vybe-feature-list">
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
