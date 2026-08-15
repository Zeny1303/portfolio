import React from 'react'

export function TaskflowApiEndpointsSection() {
  const endpoints = [
    { method: 'POST', endpoint: '/api/auth/signup', desc: 'Registers new user account with hashed password', auth: 'Public' },
    { method: 'POST', endpoint: '/api/auth/login', desc: 'Authenticates credentials & issues stateless JWT token', auth: 'Public' },
    { method: 'GET', endpoint: '/api/auth/me', desc: 'Fetches current authenticated user profile & roles', auth: 'User Auth' },
    { method: 'GET', endpoint: '/api/projects', desc: 'Lists projects where current user is a member', auth: 'User Auth' },
    { method: 'POST', endpoint: '/api/projects', desc: 'Creates new project (creator promoted to Admin)', auth: 'User Auth' },
    { method: 'GET', endpoint: '/api/projects/:id', desc: 'Retrieves project details, tasks & member roster', auth: 'Project Member' },
    { method: 'POST', endpoint: '/api/projects/:id/members', desc: 'Invites member to project by email with role', auth: 'Project Admin' },
    { method: 'DELETE', endpoint: '/api/projects/:id', desc: 'Deletes project workspace & cascade deletes tasks', auth: 'Project Admin' },
    { method: 'POST', endpoint: '/api/tasks/projects/:id/tasks', desc: 'Creates new task inside project workspace', auth: 'Project Admin' },
    { method: 'PUT', endpoint: '/api/tasks/:id', desc: 'Updates task (Admin: all fields, Member: status only)', auth: 'Assignee / Admin' },
    { method: 'GET', endpoint: '/api/dashboard', desc: 'Fetches aggregated metrics & per-member workload stats', auth: 'User Auth' },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">REST API Reference</h2>
      <p className="taskflow-section-subtitle">
        Structured Django REST Framework API endpoints enforced via custom authentication and role-based permission classes.
      </p>

      <div className="taskflow-table-wrapper">
        <table className="taskflow-api-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
              <th>Required Role</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`taskflow-method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                </td>
                <td className="taskflow-endpoint-code">{ep.endpoint}</td>
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
