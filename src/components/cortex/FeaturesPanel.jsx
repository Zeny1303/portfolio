import React from 'react'

export function FeaturesPanel() {
  const features = [
    {
      icon: '📄',
      title: 'PDF Resume Parsing & Context Extraction',
      desc: 'Candidates upload a resume PDF to auto-populate target role, experience level, key projects, and core technical skills via pdfjs-dist and GPT-4o-Mini.',
      highlights: ['Multer File Upload', 'pdfjs-dist Text Extraction', 'Regex Normalization Pipeline'],
    },
    {
      icon: '❓',
      title: 'Contextual Progressive Questioning',
      desc: 'Generates 5 tailored, single-sentence interview questions adapted to candidate role, experience, mode (Technical vs HR), and progressive difficulty scaling.',
      highlights: ['Progressive Difficulty (Easy->Hard)', '15-25 Word Sentence Bounds', 'Timed Question Limits (60s-120s)'],
    },
    {
      icon: '🎤',
      title: 'Hands-Free Voice Interviewing & Avatar',
      desc: 'Candidates listen to AI interviewer read questions aloud via SpeechSynthesis (configured for human cadence) and speak responses hands-free via webkitSpeechRecognition.',
      highlights: ['Client-Side Web Speech STT/TTS', 'Synchronized Avatar Animation', 'Continuous Transcript Streaming'],
    },
    {
      icon: '🤖',
      title: 'Dimensional LLM Answer Scoring',
      desc: 'Every submitted answer receives instant evaluation across Confidence, Communication, and Correctness (0-10 scale) via OpenRouter structured JSON prompts.',
      highlights: ['Triple Dimension Evaluation', 'Canned Fallbacks for Missing Answers', '15-Word Concise Feedback'],
    },
    {
      icon: '💳',
      title: 'Credit System & Razorpay Monetization',
      desc: 'Users manage credit balances ($ \ge 50$ per session) and purchase additional credits via secure online payments with cryptographic HMAC SHA-256 verification.',
      highlights: ['Atomic Balance Increment ($inc)', 'HMAC SHA-256 Webhook Verification', 'Razorpay Gateway Orders'],
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard & PDF Report Export',
      desc: 'View visual performance trends across dimensions rendered with Recharts area graphs and circular progress indicators, exported directly to PDF format via jsPDF.',
      highlights: ['Recharts SVG Area Graphs', 'jsPDF Client Export', 'jspdf-autotable Summary'],
    },
  ]

  return (
    <section id="features" className="cortex-section">
      <h2 className="cortex-section-title">Core Feature Architecture</h2>
      <p className="cortex-section-subtitle">
        Combining generative AI prompts, browser-native speech processing, and secure monetization to automate technical interview preparation.
      </p>

      <div className="cortex-features-grid">
        {features.map((f, idx) => (
          <div key={idx} className="cortex-feature-card">
            <span className="cortex-feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="cortex-feature-list">
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
