import React from 'react'

export function VybeApiEndpointsSection() {
  const endpoints = [
    { method: 'POST', endpoint: '/api/auth/callback', desc: 'Syncs Clerk authenticated user data to MongoDB', auth: 'User Auth' },
    { method: 'GET', endpoint: '/api/admin/check', desc: 'Verifies if current user primary email matches ADMIN_EMAIL', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/admin/songs', desc: 'Uploads audio & image to Cloudinary and saves Song document', auth: 'Admin Only' },
    { method: 'DELETE', endpoint: '/api/admin/songs/:id', desc: 'Deletes song from database and album references', auth: 'Admin Only' },
    { method: 'GET', endpoint: '/api/songs', desc: 'Fetches all playable songs in catalog', auth: 'Public' },
    { method: 'GET', endpoint: '/api/songs/featured', desc: 'Fetches featured audio tracks for landing page', auth: 'Public' },
    { method: 'GET', endpoint: '/api/jamendo/discover', desc: 'Queries Jamendo API v3.0 by mood tag & offset', auth: 'Public' },
    { method: 'GET', endpoint: '/api/search', desc: 'Unified multi-catalog search across Jamendo & Spotify', auth: 'Public' },
    { method: 'GET', endpoint: '/api/lyrics', desc: 'Resolves LRC synced lyrics via Jamendo & LRCLIB', auth: 'Public' },
    { method: 'GET', endpoint: '/api/library/playlists', desc: 'Fetches authenticated user\'s playlists', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/library/likes', desc: 'Toggles song like state for current user', auth: 'User Auth' },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">REST API Endpoints</h2>
      <p className="vybe-section-subtitle">
        Modular Express routing structure with middleware authorization guards and error handling pipelines.
      </p>

      <div className="vybe-table-wrapper">
        <table className="vybe-api-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
              <th>Access Level</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`vybe-method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                </td>
                <td className="vybe-endpoint-code">{ep.endpoint}</td>
                <td>{ep.desc}</td>
                <td>{ep.auth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
