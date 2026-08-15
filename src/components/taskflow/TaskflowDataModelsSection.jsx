import React from 'react'

export function TaskflowDataModelsSection() {
  const models = [
    {
      name: 'User Model',
      collection: 'users (Table)',
      fields: [
        { name: 'id', type: 'BigAutoField (PK)' },
        { name: 'name', type: 'CharField' },
        { name: 'email', type: 'EmailField (Unique)' },
        { name: 'hashed_password', type: 'CharField (Bcrypt)' },
        { name: 'created_at', type: 'DateTimeField' },
      ],
    },
    {
      name: 'Project Model',
      collection: 'projects (Table)',
      fields: [
        { name: 'id', type: 'BigAutoField (PK)' },
        { name: 'name', type: 'CharField' },
        { name: 'description', type: 'TextField' },
        { name: 'created_by_id', type: 'ForeignKey(User)' },
        { name: 'created_at', type: 'DateTimeField' },
      ],
    },
    {
      name: 'ProjectMember Model',
      collection: 'project_members (Table)',
      fields: [
        { name: 'id', type: 'BigAutoField (PK)' },
        { name: 'project_id', type: 'ForeignKey(Project)' },
        { name: 'user_id', type: 'ForeignKey(User)' },
        { name: 'role', type: 'CharField (Enum: Admin|Member)' },
        { name: 'joined_at', type: 'DateTimeField' },
      ],
    },
    {
      name: 'Task Model',
      collection: 'tasks (Table)',
      fields: [
        { name: 'id', type: 'BigAutoField (PK)' },
        { name: 'project_id', type: 'ForeignKey(Project)' },
        { name: 'title', type: 'CharField' },
        { name: 'description', type: 'TextField' },
        { name: 'status', type: 'CharField (todo|in_progress|done)' },
        { name: 'priority', type: 'CharField (low|medium|high)' },
        { name: 'assigned_to_id', type: 'ForeignKey(User)' },
        { name: 'due_date', type: 'DateTimeField' },
      ],
    },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">Database Models & Relational Schema</h2>
      <p className="taskflow-section-subtitle">
        Relational Django ORM schema enforcing foreign key integrity, project membership scoping, and cascade deletion.
      </p>

      <div className="taskflow-models-grid">
        {models.map((model, idx) => (
          <div key={idx} className="taskflow-model-card">
            <div className="taskflow-model-header">
              <span className="taskflow-model-name">{model.name}</span>
              <span className="taskflow-model-collection">{model.collection}</span>
            </div>
            <div className="taskflow-model-fields">
              {model.fields.map((f, i) => (
                <div key={i} className="taskflow-field-row">
                  <span className="taskflow-field-name">{f.name}:</span>
                  <span className="taskflow-field-type">{f.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
