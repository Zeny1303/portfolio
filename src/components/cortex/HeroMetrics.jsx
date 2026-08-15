import React from 'react'

export function HeroMetrics() {
  const metrics = [
    {
      value: 'GPT-4o-Mini',
      label: 'LLM Orchestration',
      desc: 'OpenRouter prompt engineering for context parsing & single-sentence question generation.',
    },
    {
      value: 'STT / TTS',
      label: 'Web Speech Pipeline',
      desc: 'Client-side SpeechSynthesis voice prompting paired with continuous webkitSpeechRecognition.',
    },
    {
      value: 'pdfjs-dist',
      label: 'Resume Extraction',
      desc: 'Server-side PDF text extraction and regex normalization for automated skill matching.',
    },
    {
      value: '50 Credits',
      label: 'Atomic Session Cost',
      desc: 'Atomic balance verification and credit deduction per 5-question interview session.',
    },
    {
      value: 'HMAC SHA256',
      label: 'Payment Security',
      desc: 'Cryptographic signature verification for Razorpay payment webhooks and credit updates.',
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Key System Metrics</h2>
      <p className="cortex-section-subtitle">
        High-performance AI orchestration, browser-native speech processing, and secure credit monetization.
      </p>

      <div className="cortex-metrics-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="cortex-metric-card">
            <span className="cortex-metric-value">{m.value}</span>
            <span className="cortex-metric-label">{m.label}</span>
            <span className="cortex-metric-desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
