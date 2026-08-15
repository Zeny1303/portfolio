import React from 'react'

export function EngineeringDecisionsSection() {
  const decisions = [
    {
      num: '01',
      title: 'Client-Side Web Speech APIs vs Server Audio Streaming',
      desc: 'Utilizing browser-native `webkitSpeechRecognition` and `SpeechSynthesisUtterance` instead of streaming raw PCM audio to server Whisper/TTS models eliminates audio bandwidth transfer overhead, cuts cloud costs to zero, and delivers instant, zero-latency text-to-speech audio rendering.',
    },
    {
      num: '02',
      title: 'Multi-Stage Docker Container Architecture',
      desc: 'A 2-stage Alpine Docker build (`client-builder` -> `runner`) compiles static Vite assets and packages them directly into the Express Node.js process. This single-container approach eliminates the need for separate Nginx reverse proxies or complex CORS configurations during basic deployments.',
    },
    {
      num: '03',
      title: 'OpenRouter Abstraction for Model Agility',
      desc: 'Routing all LLM prompts through OpenRouter REST API using Axios rather than vendor-specific SDKs provides instant model flexibility. Cortex can switch between `openai/gpt-4o-mini`, `anthropic/claude-3-haiku`, or `meta-llama/llama-3` without modifying controller prompt logic.',
    },
    {
      num: '04',
      title: 'HMAC SHA-256 Cryptographic Payment Verification',
      desc: 'To prevent client-side payment forgery, Razorpay payment webhooks and callbacks are validated server-side using Node.js `crypto` HMAC SHA-256 hash comparison against `RAZORPAY_KEY_SECRET`. Credit balances are updated only after authentic gateway confirmation.',
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Architectural Deep Dive</h2>
      <p className="cortex-section-subtitle">
        Key engineering decisions and trade-offs solved during full-stack development and cloud service integration.
      </p>

      <div className="cortex-decisions-grid">
        {decisions.map((d, idx) => (
          <div key={idx} className="cortex-decision-card">
            <span className="cortex-decision-num">{d.num}</span>
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
