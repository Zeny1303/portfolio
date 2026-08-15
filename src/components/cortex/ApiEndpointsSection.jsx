import React from 'react'

export function ApiEndpointsSection() {
  const endpoints = [
    { method: 'POST', endpoint: '/api/auth/google', desc: 'Exchanges Firebase ID token for HTTP-only JWT cookie', auth: 'Public' },
    { method: 'POST', endpoint: '/api/auth/logout', desc: 'Clears JWT authentication cookie from client session', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/interview/resume', desc: 'Uploads PDF resume, extracts text via pdfjs-dist & parses skills', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/interview/generate-questions', desc: 'Deducts 50 credits and generates 5 difficulty-progressive questions', auth: 'User Auth ($ \ge 50$ credits)' },
    { method: 'POST', endpoint: '/api/interview/submit-answer', desc: 'Evaluates spoken answer against Confidence, Comm & Correctness', auth: 'User Auth' },
    { method: 'GET', endpoint: '/api/interview/history', desc: 'Fetches candidate past interview sessions and score trends', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/payment/create-order', desc: 'Creates Razorpay order for purchasing credit packages', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/payment/verify', desc: 'Validates HMAC SHA-256 signature & atomically updates credits', auth: 'User Auth' },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">REST API Endpoints</h2>
      <p className="cortex-section-subtitle">
        Modular Express controllers handling authentication, multipart PDF uploads, LLM orchestration, and Razorpay webhooks.
      </p>

      <div className="cortex-table-wrapper">
        <table className="cortex-api-table">
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
                  <span className={`cortex-method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                </td>
                <td className="cortex-endpoint-code">{ep.endpoint}</td>
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
