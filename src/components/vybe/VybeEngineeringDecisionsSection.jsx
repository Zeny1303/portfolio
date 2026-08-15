import React from 'react'

export function VybeEngineeringDecisionsSection() {
  const decisions = [
    {
      num: '01',
      title: 'Dual-Layer Catalog Search Engine',
      desc: 'Licensing global music streams is cost-prohibitive. VYBE overcomes this by splitting search results into playable streams (via Jamendo API & Cloudinary uploads) and external metadata exploration (via Spotify Web API & MusicBrainz). Relevance ranking algorithms score title/artist matches while in-memory 5-minute caching prevents API rate limits.',
    },
    {
      num: '02',
      title: 'Socket.IO Social Activity & Chat State',
      desc: 'To deliver a live social music experience without polling, VYBE maintains in-memory socket maps (`userSockets` & `userActivities`). When a user plays a track, `update_activity` socket events push live track details and animated soundwave indicators to all connected clients, enabling live track sharing and direct messaging.',
    },
    {
      num: '03',
      title: 'Synchronized LRC Lyrics Reader',
      desc: 'Audio playback without lyrics lacks engagement. VYBE incorporates an LRC parser that transforms timestamp strings into structured time bounds `[{ start: number, text: string }]`. The engine queries Jamendo Lyrics API first, falling back to LRCLIB to highlight active lines in real-time as the audio player updates `currentTime`.',
    },
    {
      num: '04',
      title: 'Progressive Auth Gating & Admin Security',
      desc: 'Instead of forcing guests to sign in immediately, VYBE allows full public music playback. Attempting personal actions (Liking songs, messaging, viewing playlists) opens non-disruptive `AuthModal` prompts. Admin controls verify Clerk JWT bearer tokens against `ADMIN_EMAIL` on the backend before enabling Cloudinary media uploads.',
    },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">Architectural Deep Dive</h2>
      <p className="vybe-section-subtitle">
        Key engineering decisions and trade-offs solved during full-stack development and cloud service integration.
      </p>

      <div className="vybe-decisions-grid">
        {decisions.map((d, idx) => (
          <div key={idx} className="vybe-decision-card">
            <span className="vybe-decision-num">{d.num}</span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
