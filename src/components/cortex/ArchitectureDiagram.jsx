import React from 'react'

export function ArchitectureDiagram() {
  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">System Architecture</h2>
      <p className="cortex-section-subtitle">
        Client Layer SPA + Express REST API Monolith + Firebase Auth + OpenRouter AI Service & Razorpay Gateway.
      </p>

      <div className="cortex-arch-box">
        <div className="cortex-arch-header">
          <h3>Architectural Topology</h3>
          <span className="cortex-arch-tag">React 18 + Express.js + OpenRouter GPT-4o-Mini + MongoDB</span>
        </div>

        <div className="cortex-arch-nodes">
          <div className="cortex-arch-node">
            <div className="cortex-arch-node-title">
              <span>💻</span> Client Layer (SPA)
            </div>
            <div className="cortex-arch-node-pills">
              <span className="cortex-arch-pill">React 18</span>
              <span className="cortex-arch-pill">Vite</span>
              <span className="cortex-arch-pill">Redux Toolkit</span>
              <span className="cortex-arch-pill">Tailwind CSS</span>
              <span className="cortex-arch-pill">Web Speech STT/TTS</span>
              <span className="cortex-arch-pill">Recharts</span>
              <span className="cortex-arch-pill">jsPDF</span>
            </div>
          </div>

          <div className="cortex-arch-node">
            <div className="cortex-arch-node-title">
              <span>⚙️</span> Express REST Backend
            </div>
            <div className="cortex-arch-node-pills">
              <span className="cortex-arch-pill">Node.js</span>
              <span className="cortex-arch-pill">Express.js</span>
              <span className="cortex-arch-pill">isAuth JWT Middleware</span>
              <span className="cortex-arch-pill">Multer File Upload</span>
              <span className="cortex-arch-pill">pdfjs-dist Parser</span>
            </div>
          </div>

          <div className="cortex-arch-node">
            <div className="cortex-arch-node-title">
              <span>🔐</span> Auth & Security
            </div>
            <div className="cortex-arch-node-pills">
              <span className="cortex-arch-pill">Firebase Google Auth</span>
              <span className="cortex-arch-pill">HTTP-Only JWT Cookie</span>
              <span className="cortex-arch-pill">HMAC SHA-256 Crypto</span>
              <span className="cortex-arch-pill">SameSite Strict Cookies</span>
            </div>
          </div>

          <div className="cortex-arch-node">
            <div className="cortex-arch-node-title">
              <span>☁️</span> Cloud APIs & Services
            </div>
            <div className="cortex-arch-node-pills">
              <span className="cortex-arch-pill">MongoDB Atlas</span>
              <span className="cortex-arch-pill">OpenRouter API</span>
              <span className="cortex-arch-pill">GPT-4o-Mini Model</span>
              <span className="cortex-arch-pill">Razorpay Orders API</span>
            </div>
          </div>
        </div>

        <div className="cortex-arch-flow">
{`+-----------------------------------------------------------------------------------+
|                                  REACT 18 FRONTEND                                |
|  Redux Toolkit Store | Web Speech STT/TTS | Recharts Analytics | jsPDF Export Engine|
+-----------------------------------------------------------------------------------+
                                   |           ^
                           HTTP / REST        Audio Synthesis / Speech Capture
                                   v           |
+-----------------------------------------------------------------------------------+
|                                 EXPRESS.JS BACKEND                                |
|   isAuth JWT Middleware | Multer Upload (PDF) | OpenRouter Service | Razorpay SDK |
+-----------------------------------------------------------------------------------+
     |              |               |               |                |
     v              v               v               v                v
+----------+  +-----------+  +------------+  +--------------+  +---------------+
| MongoDB  |  | PDF.js    |  | OpenRouter |  | Firebase Auth|  | Razorpay Gateway|
| Mongoose |  | Extractor |  | (GPT-4o)   |  | (Google SSO) |  | (HMAC SHA-256)|
+----------+  +-----------+  +------------+  +--------------+  +---------------+`}
        </div>
      </div>
    </section>
  )
}
