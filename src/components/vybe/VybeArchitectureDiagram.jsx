import React from 'react'

export function VybeArchitectureDiagram() {
  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">System Architecture</h2>
      <p className="vybe-section-subtitle">
        Monolithic SPA + REST API + Integrated Socket.IO WebSocket Server powering real-time media streaming & social interaction.
      </p>

      <div className="vybe-arch-box">
        <div className="vybe-arch-header">
          <h3>Architectural Topology</h3>
          <span className="vybe-arch-tag">React 18 + Express.js + Socket.IO + MongoDB</span>
        </div>

        <div className="vybe-arch-nodes">
          <div className="vybe-arch-node">
            <div className="vybe-arch-node-title">
              <span>💻</span> Frontend SPA Layer
            </div>
            <div className="vybe-arch-node-pills">
              <span className="vybe-arch-pill">React 18</span>
              <span className="vybe-arch-pill">Vite 5</span>
              <span className="vybe-arch-pill">TypeScript 5.6</span>
              <span className="vybe-arch-pill">Zustand 5</span>
              <span className="vybe-arch-pill">Tailwind CSS</span>
              <span className="vybe-arch-pill">Socket.IO Client</span>
            </div>
          </div>

          <div className="vybe-arch-node">
            <div className="vybe-arch-node-title">
              <span>⚙️</span> Express Backend API
            </div>
            <div className="vybe-arch-node-pills">
              <span className="vybe-arch-pill">Node.js</span>
              <span className="vybe-arch-pill">Express 4</span>
              <span className="vybe-arch-pill">@clerk/express</span>
              <span className="vybe-arch-pill">Catalog Cache</span>
              <span className="vybe-arch-pill">express-fileupload</span>
              <span className="vybe-arch-pill">node-cron</span>
            </div>
          </div>

          <div className="vybe-arch-node">
            <div className="vybe-arch-node-title">
              <span>⚡</span> Real-time WebSockets
            </div>
            <div className="vybe-arch-node-pills">
              <span className="vybe-arch-pill">Socket.IO 4</span>
              <span className="vybe-arch-pill">userSockets Map</span>
              <span className="vybe-arch-pill">userActivities Map</span>
              <span className="vybe-arch-pill">Live Presence</span>
              <span className="vybe-arch-pill">Direct Messaging</span>
            </div>
          </div>

          <div className="vybe-arch-node">
            <div className="vybe-arch-node-title">
              <span>☁️</span> Microservices & APIs
            </div>
            <div className="vybe-arch-node-pills">
              <span className="vybe-arch-pill">MongoDB / Mongoose</span>
              <span className="vybe-arch-pill">Cloudinary SDK</span>
              <span className="vybe-arch-pill">Jamendo v3.0 API</span>
              <span className="vybe-arch-pill">Spotify Web API</span>
              <span className="vybe-arch-pill">LRCLIB Synced LRC</span>
            </div>
          </div>
        </div>

        <div className="vybe-arch-flow">
{`+-----------------------------------------------------------------------------------+
|                                  REACT 18 FRONTEND                                |
|  React Router v6 | Zustand State Stores | Tailwind CSS | Radix UI | Socket.IO Client |
+-----------------------------------------------------------------------------------+
                                   |           ^
                           HTTP / REST        WebSockets
                                   v           |
+-----------------------------------------------------------------------------------+
|                                 EXPRESS.JS BACKEND                                |
|   Clerk Middleware | FileUpload (tmp) | Admin Auth Guards | Node-Cron Temp Cleaner|
+-----------------------------------------------------------------------------------+
     |              |               |               |                |
     v              v               v               v                v
+----------+  +-----------+  +------------+  +--------------+  +---------------+
| MongoDB  |  | Cloudinary|  |Jamendo API |  | Spotify API  |  | LRCLIB Service|
| Mongoose |  | Media S3  |  | (Audio CC) |  | (Metadata)   |  | (Synced LRC)  |
+----------+  +-----------+  +------------+  +--------------+  +---------------+`}
        </div>
      </div>
    </section>
  )
}
