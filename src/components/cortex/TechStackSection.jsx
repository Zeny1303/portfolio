import React from 'react'

export function TechStackSection() {
  const stack = [
    {
      category: 'Frontend Engineering',
      icon: '🎨',
      items: ['React 18', 'Vite', 'Redux Toolkit', 'TailwindCSS', 'Motion', 'Recharts', 'jsPDF', 'jspdf-autotable'],
    },
    {
      category: 'Backend & Server',
      icon: '⚙️',
      items: ['Node.js', 'Express.js 4', 'Multer (File Upload)', 'pdfjs-dist (Mozilla)', 'isAuth JWT Middleware', 'Mongoose ODM'],
    },
    {
      category: 'AI & Browser Speech APIs',
      icon: '🤖',
      items: ['OpenRouter API', 'GPT-4o-Mini Model', 'webkitSpeechRecognition (STT)', 'SpeechSynthesisUtterance (TTS)'],
    },
    {
      category: 'Database & Security',
      icon: '🔐',
      items: ['MongoDB Atlas', 'Firebase Google OAuth', 'HTTP-Only JWT Cookies', 'Razorpay Node SDK', 'HMAC SHA-256 Crypto'],
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Technology Stack</h2>
      <p className="cortex-section-subtitle">
        Carefully selected full-stack tools optimized for low-latency voice practice, generative AI integration, and secure monetization.
      </p>

      <div className="cortex-tech-grid">
        {stack.map((group, idx) => (
          <div key={idx} className="cortex-tech-card">
            <h3>
              <span>{group.icon}</span> {group.category}
            </h3>
            <div className="cortex-tech-pills">
              {group.items.map((item, i) => (
                <span key={i} className="cortex-tech-pill">
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
