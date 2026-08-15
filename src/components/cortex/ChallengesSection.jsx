import React from 'react'
import './CortexProjectDetail.css'

export function ChallengesSection() {
  const challenges = [
    {
      title: 'PDF Parsing & Text Sanitation',
      problem:
        'Extracting text from multi-page PDF resumes produced irregular formatting and extra whitespace that degraded LLM prompt quality.',
      solution:
        'Implemented pdfjs-dist text content mapping followed by regex normalization (`.replace(/\\s+/g, " ")`) to produce clean strings before LLM ingestion.',
      tradeoff: 'Complex multi-column PDF layouts may occasionally reorder text lines.',
    },
    {
      title: 'Speech Synthesis ↔ Video Avatar Sync',
      problem:
        'Coordinating native browser SpeechSynthesis voice output with DOM video avatar playback without desynchronizing state.',
      solution:
        'Wrapped SpeechSynthesisUtterance in Promises with explicit `onstart`/`onend` event handlers controlling DOM video play/pause directly.',
      tradeoff:
        'Speech synthesis relies on OS-installed voice fonts available on candidate devices.',
    },
    {
      title: 'Speech Recognition Interruptions',
      problem:
        'Browser SpeechRecognition auto-stopped after short candidate pauses, missing parts of spoken answers.',
      solution:
        'Set `recognition.continuous = true` with `interimResults = false`, appending new transcripts incrementally to React state.',
      tradeoff:
        'Candidate must manually click mute/unmute if background noise is present.',
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Hardest Engineering Problems</h2>
      <p className="cortex-section-subtitle">
        Real-world technical challenges faced while coordinating browser speech APIs, LLM prompts, and binary PDF parsing.
      </p>

      <div className="cortex-challenges-grid">
        {challenges.map((challenge, idx) => (
          <div key={idx} className="cortex-challenge-card">
            <div className="cortex-challenge-header">
              <div className="cortex-challenge-number">{idx + 1}</div>
              <h3 className="cortex-challenge-title">{challenge.title}</h3>
            </div>

            <div className="cortex-challenge-content">
              <div className="cortex-challenge-item">
                <span className="cortex-challenge-badge problem">Problem</span>
                <p>{challenge.problem}</p>
              </div>

              <div className="cortex-challenge-item">
                <span className="cortex-challenge-badge solution">Solution</span>
                <p>{challenge.solution}</p>
              </div>

              <div className="cortex-challenge-item">
                <span className="cortex-challenge-badge tradeoff">Trade-off</span>
                <p>{challenge.tradeoff}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
