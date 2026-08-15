import React from 'react'
import { useNavigate } from 'react-router-dom'
import demoVideo from '../../assests/Taskflow/Taskflow-demo.mp4'
import posterImg from '../../assests/Taskflow/img1.png'
import './TaskflowProjectDetail.css'

export function TaskflowProjectHeroSection() {
  const navigate = useNavigate()

  return (
    <header className="taskflow-hero-section">
      <div className="taskflow-hero-breadcrumb">
        <button onClick={() => navigate('/work')} className="taskflow-breadcrumb-btn">
          ← Work
        </button>
        <span className="taskflow-breadcrumb-sep">/</span>
        <span className="taskflow-breadcrumb-text">TaskFlow</span>
      </div>

      <div className="taskflow-hero-content">
        <div className="taskflow-hero-left">
          <span className="taskflow-eyebrow">ENTERPRISE TEAM TASK MANAGEMENT PLATFORM</span>
          <h1 className="taskflow-hero-title">
            TASKFLOW
            <span className="taskflow-title-underline"></span>
          </h1>
          <p className="taskflow-hero-description">
            TaskFlow is a full-stack, enterprise-ready team task management platform engineered with React 19, TypeScript, Python 3.11+, Django 4.2+, and Django REST Framework (DRF). Designed to streamline agile collaboration, TaskFlow provides workspace isolation, 3-stage drag/cycle Kanban boards, real-time analytics, and server-enforced Role-Based Access Control (RBAC).
          </p>

          <div className="taskflow-hero-actions">
            <a
              href="http://github.com/Zeny1303/TaskFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="taskflow-btn taskflow-btn-primary"
            >
              GitHub Repository ↗
            </a>
            <span className="taskflow-btn taskflow-btn-live-soon">
              Live Demo: Soon Live ⚡
            </span>
            <a href="#features" className="taskflow-btn taskflow-btn-secondary">
              Explore Features ↓
            </a>
          </div>
        </div>

        <div className="taskflow-hero-right">
          <div className="taskflow-video-box">
            <video
              src={demoVideo}
              poster={posterImg}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="taskflow-video-player"
            >
              Your browser does not support HTML5 video playback.
            </video>
          </div>
        </div>
      </div>
    </header>
  )
}
