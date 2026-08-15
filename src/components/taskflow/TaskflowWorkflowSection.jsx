import React from 'react'

export function TaskflowWorkflowSection() {
  const adminSteps = [
    { title: 'Workspace Initialization', desc: 'Admin logs in via JWT and creates a multi-tenant project space.' },
    { title: 'Team Member Management', desc: 'Invites members by email and assigns Admin or Member roles.' },
    { title: 'Task Creation & Assignment', desc: 'Creates tasks, sets due dates, assigns priorities, and maps assignees.' },
    { title: 'Executive Oversight', desc: 'Monitors Recharts analytics dashboard for overdue triage and workload balance.' },
  ]

  const memberSteps = [
    { title: 'Assigned Workspace Entry', desc: 'Member authenticates and views assigned project workspaces.' },
    { title: 'Kanban Workflow Focus', desc: 'Views personalized task cards scoped strictly to assigned responsibilities.' },
    { title: 'Status Progression', desc: 'Cycles task status through To Do -> In Progress -> Done columns.' },
    { title: 'Due Date Awareness', desc: 'Tracks automatic overdue badges and priority highlights.' },
  ]

  return (
    <section className="taskflow-section">
      <h2 className="taskflow-section-title">User Roles & Workflows</h2>
      <p className="taskflow-section-subtitle">
        Server-enforced role permissions ensuring Project Admins retain full management rights while Members remain focused on execution.
      </p>

      <div className="taskflow-workflow-container">
        <div className="taskflow-workflow-card">
          <span className="taskflow-workflow-badge admin">Project Admin Role</span>
          <h3 className="taskflow-workflow-title">Full Workspace Management</h3>
          <div className="taskflow-workflow-steps">
            {adminSteps.map((step, idx) => (
              <div key={idx} className="taskflow-workflow-step">
                <div className="taskflow-step-num">{idx + 1}</div>
                <div className="taskflow-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="taskflow-workflow-card">
          <span className="taskflow-workflow-badge member">Team Member Role</span>
          <h3 className="taskflow-workflow-title">Scoped Execution & Status Updates</h3>
          <div className="taskflow-workflow-steps">
            {memberSteps.map((step, idx) => (
              <div key={idx} className="taskflow-workflow-step">
                <div className="taskflow-step-num">{idx + 1}</div>
                <div className="taskflow-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
