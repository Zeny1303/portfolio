import React from 'react'

export function VybeWorkflowSection() {
  const guestSteps = [
    { title: 'Landing & Browsing', desc: 'Guest enters VYBE, exploring Home, Explore, Vibes, and Search pages.' },
    { title: 'Audio Playback', desc: 'Plays legal Creative Commons tracks via Jamendo API without requiring log-in.' },
    { title: 'Personal Action Trigger', desc: 'Clicking "Like", "Save to Playlist", or "Messages" intercepts action.' },
    { title: 'Progressive Auth Gate', desc: 'AuthModal or AuthGate prompts Clerk Sign-In / Sign-Up seamlessly.' },
  ]

  const authSteps = [
    { title: 'Clerk OAuth Sync', desc: 'User logs in via Clerk SSO. Callback syncs clerkId, profile picture, and email to MongoDB.' },
    { title: 'Personalized Workspace', desc: 'Renders custom dashboard ("Good evening, Sneha ⚡") with user playlists and liked tracks.' },
    { title: 'Real-Time Social Feed', desc: 'Socket.IO automatically broadcasts live "Now Playing" activity and soundwaves to online friends.' },
    { title: 'Admin Capabilities', desc: 'If email matches ADMIN_EMAIL, unlocks Cloudinary media upload dashboard for song/album publishing.' },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">User Journey & Workflows</h2>
      <p className="vybe-section-subtitle">
        Progressive UX design allowing frictionless guest music streaming while cleanly protecting personal social features.
      </p>

      <div className="vybe-workflow-container">
        <div className="vybe-workflow-card">
          <span className="vybe-workflow-badge guest">Guest Mode</span>
          <h3 className="vybe-workflow-title">Frictionless Listener Experience</h3>
          <div className="vybe-workflow-steps">
            {guestSteps.map((step, idx) => (
              <div key={idx} className="vybe-workflow-step">
                <div className="vybe-step-num">{idx + 1}</div>
                <div className="vybe-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vybe-workflow-card">
          <span className="vybe-workflow-badge auth">Authenticated Mode</span>
          <h3 className="vybe-workflow-title">Social & Library Experience</h3>
          <div className="vybe-workflow-steps">
            {authSteps.map((step, idx) => (
              <div key={idx} className="vybe-workflow-step">
                <div className="vybe-step-num">{idx + 1}</div>
                <div className="vybe-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
