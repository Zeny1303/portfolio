import React from 'react'

export function WorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'Google OAuth & Identity',
      desc: 'Candidate authenticates via Firebase Google Auth. Server issues an HTTP-only JWT cookie with sameSite: strict flags.',
    },
    {
      num: '02',
      title: 'PDF Resume Text Extraction',
      desc: 'Candidate uploads resume PDF. Express backend uses pdfjs-dist and regex cleanup to extract plain text for GPT-4o-Mini skill parsing.',
    },
    {
      num: '03',
      title: 'Adaptive Question Generation',
      desc: 'Backend verifies User.credits >= 50, deducts credits atomically, and generates 5 difficulty-progressive questions (easy -> medium -> hard).',
    },
    {
      num: '04',
      title: 'Voice-Guided Interview Session',
      desc: 'Browser SpeechSynthesis reads questions aloud with synchronized video avatar animation while webkitSpeechRecognition streams candidate spoken answers.',
    },
    {
      num: '05',
      title: 'Dimensional LLM Scoring',
      desc: 'OpenRouter API evaluates submitted responses against Confidence, Communication, and Correctness (0-10 scale) with concise human-like feedback.',
    },
    {
      num: '06',
      title: 'Analytics & PDF Export',
      desc: 'Aggregates interview performance trends using Recharts area graphs and progress bars, allowing client-side PDF export via jsPDF.',
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Interview Session Lifecycle</h2>
      <p className="cortex-section-subtitle">
        A seamless 6-step interactive workflow bridging resume parsing, hands-free voice practice, and automated evaluation.
      </p>

      <div className="cortex-workflow-container">
        {steps.map((step, idx) => (
          <div key={idx} className="cortex-workflow-card">
            <div className="cortex-workflow-step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
