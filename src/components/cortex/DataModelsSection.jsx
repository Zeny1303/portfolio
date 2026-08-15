import React from 'react'

export function DataModelsSection() {
  const models = [
    {
      name: 'User Model',
      collection: 'users',
      fields: [
        { name: 'googleId', type: 'String (Unique Index)' },
        { name: 'email', type: 'String' },
        { name: 'name', type: 'String' },
        { name: 'credits', type: 'Number (default: 100)' },
        { name: 'timestamps', type: 'Date (createdAt/updatedAt)' },
      ],
    },
    {
      name: 'Interview Model',
      collection: 'interviews',
      fields: [
        { name: 'userId', type: 'ObjectId (ref: User)' },
        { name: 'role', type: 'String' },
        { name: 'experience', type: 'String' },
        { name: 'status', type: 'Enum ("Incompleted"|"Completed")' },
        { name: 'questions', type: 'Array [Embedded Question Schema]' },
        { name: 'overallScore', type: 'Number' },
      ],
    },
    {
      name: 'Question Sub-Schema',
      collection: 'embedded in Interview',
      fields: [
        { name: 'question', type: 'String' },
        { name: 'difficulty', type: 'Enum ("easy"|"medium"|"hard")' },
        { name: 'answer', type: 'String' },
        { name: 'confidenceScore', type: 'Number (0-10)' },
        { name: 'communicationScore', type: 'Number (0-10)' },
        { name: 'correctnessScore', type: 'Number (0-10)' },
        { name: 'feedback', type: 'String' },
      ],
    },
    {
      name: 'Payment Model',
      collection: 'payments',
      fields: [
        { name: 'userId', type: 'ObjectId (ref: User)' },
        { name: 'orderId', type: 'String (Razorpay Order ID)' },
        { name: 'paymentId', type: 'String (Razorpay Payment ID)' },
        { name: 'amount', type: 'Number' },
        { name: 'creditsAdded', type: 'Number' },
        { name: 'status', type: 'Enum ("created"|"paid"|"failed")' },
      ],
    },
  ]

  return (
    <section className="cortex-section">
      <h2 className="cortex-section-title">Database Models & Schemas</h2>
      <p className="cortex-section-subtitle">
        Structured Mongoose ODM document schemas featuring embedded question-feedback arrays and atomic credit management.
      </p>

      <div className="cortex-models-grid">
        {models.map((model, idx) => (
          <div key={idx} className="cortex-model-card">
            <div className="cortex-model-header">
              <span className="cortex-model-name">{model.name}</span>
              <span className="cortex-model-collection">{model.collection}</span>
            </div>
            <div className="cortex-model-fields">
              {model.fields.map((f, i) => (
                <div key={i} className="cortex-field-row">
                  <span className="cortex-field-name">{f.name}:</span>
                  <span className="cortex-field-type">{f.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
