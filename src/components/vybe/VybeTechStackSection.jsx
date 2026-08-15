import React from 'react'

export function VybeTechStackSection() {
  const stack = [
    {
      category: 'Frontend Engineering',
      icon: '🎨',
      items: ['React 18', 'Vite 5', 'TypeScript 5.6', 'Tailwind CSS 3.4', 'Zustand 5', 'React Router v6', 'Socket.IO Client', 'Lucide Icons'],
    },
    {
      category: 'Backend & Server',
      icon: '⚙️',
      items: ['Node.js', 'Express.js 4', 'Socket.IO Server 4', '@clerk/express', 'express-fileupload', 'node-cron', 'Mongoose ODM'],
    },
    {
      category: 'Databases & Storage',
      icon: '💾',
      items: ['MongoDB Atlas', 'Cloudinary Media Storage', 'In-Memory UserSockets Map', 'In-Memory UserActivities Map', 'Catalog Query Cache'],
    },
    {
      category: 'External Services & APIs',
      icon: '🌐',
      items: ['Jamendo API v3.0 (CC Audio)', 'Spotify Web API (Metadata)', 'MusicBrainz API (Fallback)', 'LRCLIB API (Synced LRC)', 'Clerk Authentication'],
    },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">Technology Stack</h2>
      <p className="vybe-section-subtitle">
        Curated modern web technologies delivering high performance, type safety, modular backend architecture, and seamless cloud integrations.
      </p>

      <div className="vybe-tech-grid">
        {stack.map((group, idx) => (
          <div key={idx} className="vybe-tech-card">
            <h3>
              <span>{group.icon}</span> {group.category}
            </h3>
            <div className="vybe-tech-pills">
              {group.items.map((item, i) => (
                <span key={i} className="vybe-tech-pill">
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
