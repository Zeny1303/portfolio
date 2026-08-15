<div align="center">

# ⚡ TaskFlow

### Enterprise Team Task Management Platform — React 19 & Django REST Framework

*Assign. Track. Ship. Together.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![DRF](https://img.shields.io/badge/Django_REST_Framework-3.14+-red?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [User Workflow](#user-workflow)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Technical Implementation](#core-technical-implementation)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Security](#security)
- [Performance & Benchmarks](#performance--benchmarks)
- [Scalability](#scalability)
- [Future Improvements](#future-improvements)
- [Running Locally](#running-locally)
- [Docker & Deployment](#docker--deployment)
- [Project Status & Author](#project-status--author)

---

## Overview

**TaskFlow** is a full-stack, enterprise-ready team task management platform engineered with **React 19**, **TypeScript**, **Django 4.2+**, and **Django REST Framework (DRF)**. Designed to streamline cross-functional collaboration, TaskFlow provides project-level isolation, dynamic Kanban workflow boards, real-time analytics, and server-enforced Role-Based Access Control (RBAC).

The platform consists of two decoupled microservices:

| Service | Technology Stack | Description |
|---|---|---|
| **Frontend** | React 19 + TypeScript | Single-Page Application (SPA) served via Nginx with theme toggling and responsive state management |
| **Backend** | Python 3.11 + Django DRF | Decoupled RESTful API with custom stateless JWT authentication, Gunicorn WSGI, and ORM abstractions |
| **Database** | PostgreSQL / SQLite | Relational database layer enforcing foreign key constraints and indexed querying |

---

## Problem Statement

Modern software teams struggle with lightweight task boards that either lack server-enforced access control or suffer from bloated complexity. Standard task trackers often expose unauthorized actions in the UI without strict backend verification, creating security vulnerabilities and data corruption risks in multi-user environments.

## Solution

TaskFlow solves this by implementing strict server-side **Role-Based Access Control (RBAC)** alongside an intuitive, high-performance UI. Project owners are granted `Admin` privileges to manage project structure and membership, while `Members` are scoped strictly to viewing and updating their own assigned work. Every single request is validated at the database layer before execution.

---

## Key Features

### 🔐 Stateless JWT Authentication
- Custom Django authentication backend evaluating standard `Bearer` tokens (`sub` = `user.id`, `HS256`, 7-day expiration).
- Secure password hashing using PBKDF2/Bcrypt algorithms (`passlib`).
- Client-side token auto-injection via Axios request interceptors.
- Decoupled 401 response handling using custom browser events (`taskflow:logout`) for seamless UI reset without full page reloads.

### 📁 Project & Workspace Isolation
- Dynamic project creation with automatic creator promotion to Project `Admin`.
- Member invitation workflow by email with role assignment (`Admin` or `Member`).
- Project detail isolation ensuring users only access projects they belong to.
- Cascading deletion for projects and associated task assets.

### ✅ Kanban Workflow Board
- Interactive 3-stage board: **To Do → In Progress → Done**.
- One-click task status cycling directly on task cards.
- Priority indicators: **Low / Medium / High** with distinct color-coded badges.
- Due date tracking with automatic overdue calculation and highlight badges.
- Assignee avatar badges and creator provenance tracking.

### 📊 Executive Analytics Dashboard
- Live metric cards: Total Projects, Total Tasks, Assigned Tasks, Overdue Tasks, Tasks by Status.
- Task status distribution visualization powered by **Recharts** (Donut chart).
- Team workload balance chart (Bar chart) displaying task counts per team member.
- Dedicated interactive table for overdue task triage.

### 🛡️ Server-Enforced RBAC
- Role security enforced strictly inside Django REST Framework API views.
- **Admins**: Create/Edit/Delete projects, add/remove members, assign/create/delete tasks.
- **Members**: View assigned tasks and update status (`todo` -> `in_progress` -> `done`).

### 🌓 Design System & Theme Engine
- Custom CSS variable design system supporting instant Dark/Light mode toggling.
- Responsive mobile sidebar drawer with overlay navigation.

---

## User Workflow

```
[ Landing / Login ]
        │
        ▼ (POST /api/auth/login)
[ JWT Issued & Saved ]
        │
        ├─────────────────────────────────────────┐
        ▼                                         ▼
[ Executive Dashboard ]                    [ Project Explorer ]
(Aggregated metrics & charts)             (List user projects)
        │                                         │
        │                                         ▼
        └─────────────────────────► [ Project Detail Page ]
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
             [ Kanban Board Tab ]                    [ Members Tab ]
             - Drag/Cycle Tasks                      - Invite Member (Admin)
             - Create Task (Admin)                   - Remove Member (Admin)
             - Update Status (Member)
```

---

## System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                             CLIENT (Browser)                              ║
║                                                                           ║
║   ┌───────────────────────────────────────────────────────────────────┐   ║
║   │                    React 19 SPA (TypeScript)                      │   ║
║   │                                                                   │   ║
║   │   AuthContext    ──► LocalStorage (taskflow_token, taskflow_user) │   ║
║   │   ThemeContext   ──► Dark / Light Mode (tf-theme)                 │   ║
║   │   React Router   ──► Private / Public Route Guards                │   ║
║   │   Axios Client   ──► Base URL /api, Bearer Token Interceptor     │   ║
║   │   Recharts       ──► Donut & Bar Chart Analytics Components       │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
╚═════════════════════════════════════│═════════════════════════════════════╝
                                      │ HTTP / REST / JSON
                                      ▼
╔═══════════════════════════════════════════════════════════════════════════╗
║                      BACKEND (Python / Django & DRF)                      ║
║                                                                           ║
║   ┌───────────────────────────────────────────────────────────────────┐   ║
║   │                  WSGI Server / Gunicorn (Port 8000)               │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
║                                     │                                     ║
║   ┌─────────────────────────────────▼─────────────────────────────────┐   ║
║   │                  CorsHeaders & Common Middleware                  │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
║                                     │                                     ║
║   ┌─────────────────────────────────▼─────────────────────────────────┐   ║
║   │             Custom JWTAuthentication (api.authentication)         │   ║
║   │                  Decodes HS256 Token & Validates User             │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
║                                     │                                     ║
║   ┌─────────────────────────────────▼─────────────────────────────────┐   ║
║   │               Django REST Framework API Views (api.views)         │   ║
║   │      SignupView · LoginView · ProjectDetailView · TaskDetailView  │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
║                                     │                                     ║
║   ┌─────────────────────────────────▼─────────────────────────────────┐   ║
║   │                       Django ORM Abstraction                      │   ║
║   │             User · Project · ProjectMember · Task Models          │   ║
║   └─────────────────────────────────┬─────────────────────────────────┘   ║
╚═════════════════════════════════════│═════════════════════════════════════╝
                                      │ SQL Queries
                                      ▼
╔═══════════════════════════════════════════════════════════════════════════╗
║                        DATABASE (PostgreSQL / SQLite)                     ║
║                                                                           ║
║    users  ◄──────  projects  ◄──────  project_members  ──────►  tasks     ║
║   (Table)          (Table)                 (Table)             (Table)    ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## Tech Stack

### Frontend
- **Framework**: React 19 (Single-Page Application)
- **Language**: TypeScript 4.9
- **Routing**: React Router v6
- **HTTP Client**: Axios 1.x (with request/response interceptors)
- **Data Visualization**: Recharts 3.x
- **Icons**: Lucide React
- **Notifications**: React Hot Toast 2.x
- **Web Server**: Nginx (Production Docker container)

### Backend
- **Language**: Python 3.11+
- **Framework**: Django 4.2+
- **API Extension**: Django REST Framework (DRF) 3.14+
- **Authentication**: PyJWT 2.8+ (Custom `JWTAuthentication` class)
- **Password Security**: PassLib 1.7+ & Bcrypt 4.0+
- **CORS Handling**: `django-cors-headers` 4.3+
- **WSGI Server**: Gunicorn 21.2+

### Database & Infrastructure
- **Database**: PostgreSQL 15+ (Production) / SQLite 3 (Development)
- **ORM**: Django ORM
- **Containerization**: Docker & Docker Compose
- **Platform Hosting**: Railway / Render

---

## Project Structure

```
TaskFlow/
├── backend/                           # Django REST Framework Backend
│   ├── api/                           # Core API Application
│   │   ├── migrations/                # Database migration definitions
│   │   ├── authentication.py          # Custom JWT auth backend & password utilities
│   │   ├── models.py                  # Django ORM Models (User, Project, Member, Task)
│   │   ├── serializers.py             # DRF Serializers (Validation & Data Formatting)
│   │   ├── urls.py                    # App-level API route definitions
│   │   └── views.py                   # API Views & RBAC permission logic
│   ├── taskflow_backend/              # Project Configuration Package
│   │   ├── settings.py                # Core Django settings & DRF configuration
│   │   ├── urls.py                    # Root URL router
│   │   ├── wsgi.py                    # WSGI deployment entrypoint
│   │   └── asgi.py                    # ASGI deployment entrypoint
│   ├── manage.py                      # Django CLI management utility
│   ├── seed.py                        # Database seeder (23 users, 5 projects, 24 tasks)
│   ├── requirements.txt               # Python package dependencies
│   ├── Dockerfile                     # Python 3.11 slim container definition
│   ├── start.sh                       # Production launch script (migrate + seed + gunicorn)
│   └── wait-for-db.sh                 # Postgres readiness wait script
│
├── frontend/                          # React 19 + TypeScript SPA
│   ├── public/                        # Static HTML template & assets
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx             # Main app shell, navigation & mobile drawer
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx           # Login / Signup form view
│   │   │   ├── Dashboard.tsx          # Analytics dashboard & overdue triage
│   │   │   ├── ProjectsPage.tsx       # Project list & creation modal
│   │   │   ├── ProjectDetailPage.tsx  # Kanban board, member management & settings
│   │   │   └── SettingsPage.tsx       # User preferences & theme controls
│   │   ├── api.ts                     # Axios instance & token interceptors
│   │   ├── App.tsx                    # React Router definitions & route guards
│   │   ├── AuthContext.tsx            # Global authentication state provider
│   │   ├── ThemeContext.tsx           # Dark/Light theme provider
│   │   ├── index.css                  # Modern CSS variable design system
│   │   └── types.ts                   # TypeScript interfaces matching backend models
│   ├── Dockerfile                     # Multi-stage Nginx build definition
│   ├── nginx.conf                     # Nginx server block for React Router SPA
│   └── package.json                   # Frontend dependencies & npm scripts
│
├── docker-compose.yml                 # Multi-container local deployment spec
└── README.md                          # Repository documentation
```

---

## API Reference

Base URL (Local): `http://localhost:8000/api`

All protected endpoints require the HTTP header: `Authorization: Bearer <token>`

### 🔑 Authentication
| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `POST` | `/api/auth/signup` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT access token |
| `GET` | `/api/auth/me` | Protected | Fetch authenticated user profile |

### 📁 Projects
| Method | Endpoint | Role | Description |
|---|---|:---:|---|
| `GET` | `/api/projects` | Member | List projects where user is a member |
| `POST` | `/api/projects` | Member | Create project (creator becomes Admin) |
| `GET` | `/api/projects/:id` | Member | Retrieve project details & member roster |
| `PUT` | `/api/projects/:id` | Admin | Update project name or description |
| `DELETE` | `/api/projects/:id` | Admin | Delete project & cascade delete tasks |
| `POST` | `/api/projects/:id/members` | Admin | Add user to project by email with role |
| `DELETE` | `/api/projects/:id/members/:uid` | Admin | Remove member from project |

### ✅ Tasks
| Method | Endpoint | Role | Description |
|---|---|:---:|---|
| `GET` | `/api/tasks/projects/:id/tasks` | Member | List tasks (Admin: all tasks, Member: assigned only) |
| `POST` | `/api/tasks/projects/:id/tasks` | Admin | Create task within project |
| `GET` | `/api/tasks/:id` | Member | Retrieve single task details |
| `PUT` | `/api/tasks/:id` | Admin/Assignee | Update task (Admin: all fields, Member: status only) |
| `DELETE` | `/api/tasks/:id` | Admin | Delete task |

### 📊 Dashboard
| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `GET` | `/api/dashboard` | Protected | Fetch aggregated metrics, status totals & per-user counts |

---

## Database Schema

TaskFlow utilizes Django ORM to define relational tables:

```
+--------------------------------+       +--------------------------------+
|             users              |       |            projects            |
+--------------------------------+       +--------------------------------+
| id             : BigAutoField  |◄──┐   | id             : BigAutoField  |
| name           : CharField     |   │   | name           : CharField     |
| email          : EmailField    |   │   | description    : TextField     |
| hashed_password: CharField     |   │   | created_by_id  : ForeignKey(FK)|──┐
| created_at     : DateTimeField |   │   | created_at     : DateTimeField |  │
+--------------------------------+   │   +--------------------------------+  │
                ▲                    │                   ▲                   │
                │                    │                   │                   │
                │ FK                 │ FK                │ FK                │
+--------------------------------+   │   +--------------------------------+  │
|        project_members         |   │   |             tasks              |  │
+--------------------------------+   │   +--------------------------------+  │
| id             : BigAutoField  |   │   | id             : BigAutoField  |  │
| project_id     : ForeignKey(FK)|───┼───| project_id     : ForeignKey(FK)|──┘
| user_id        : ForeignKey(FK)|───┘   | title          : CharField     |
| role           : CharField     |       | description    : TextField     |
| joined_at      : DateTimeField |       | due_date       : DateTimeField |
+--------------------------------+       | priority       : CharField     |
                                         | status         : CharField     |
                                         | assigned_to_id : ForeignKey(FK)──► users(id)
                                         | created_by_id  : ForeignKey(FK)──► users(id)
                                         | created_at     : DateTimeField |
                                         | updated_at     : DateTimeField |
                                         +--------------------------------+
```

---

## Authentication & Authorization

### Authentication Mechanism
Authentication is entirely stateless. Upon successful login (`POST /api/auth/login`), the backend generates a JWT signed with `HS256` containing `{ "sub": user.id, "exp": expiration_timestamp }`. The token is stored in the browser's `localStorage` and attached to all subsequent API requests via the `Authorization: Bearer <token>` header.

### RBAC Permission Matrix

| Operation | Project Admin | Project Member |
|---|:---:|:---:|
| Create / Rename / Delete Project | ✅ | ❌ |
| Add / Remove Project Members | ✅ | ❌ |
| Create / Delete Tasks | ✅ | ❌ |
| View All Project Tasks | ✅ | ❌ |
| View Assigned Tasks | ✅ | ✅ |
| Reassign Task / Edit Title / Edit Due Date | ✅ | ❌ |
| Update Task Status (`todo` -> `in_progress` -> `done`) | ✅ | ✅ |
| Access Dashboard Analytics | ✅ | ✅ |

*Note: All permission checks are strictly validated on the backend inside Django DRF view handlers.*

---

## Security

### Implemented Security Practices
- **Password Protection**: Hashed using PBKDF2/Bcrypt via `passlib`; plain text passwords are never stored.
- **SQL Injection Prevention**: Parameterized queries enforced natively through Django ORM.
- **CORS Control**: Restricted cross-origin resource sharing configured via `django-cors-headers`.
- **Stateless Verification**: JWT signatures validated per request; invalid or expired tokens immediately trigger HTTP 401.

### Security Improvements Needed for Production
- Implement Refresh Token rotation & HTTP-only secure cookies for JWT storage.
- Rate limiting on authentication endpoints (`POST /api/auth/login`) to mitigate brute-force attacks.
- Enforce strict HTTPS redirection and Content Security Policy (CSP) headers in Nginx.

---

## Performance & Benchmarks

### Optimizations Implemented
- **Indexed Fields**: `email` on `users` table indexed for fast authentication lookups.
- **Targeted Querying**: Filtered relational queries on project memberships to prevent full-table scans.
- **Static Assets**: Frontend production build compiled into minified chunks served directly via Nginx.

*Benchmark Statement: No formal load test benchmark data is currently included in the repository.*

---

## Scalability

### Current Architecture
Single-instance Django API running under Gunicorn, connecting to a centralized PostgreSQL/SQLite relational database, serving a React SPA via Nginx.

### Scaling Strategy
1. **Horizontal Scaling**: Stateless JWT authentication enables multiple Gunicorn API containers behind a Load Balancer (e.g., AWS ALB or Nginx).
2. **Database Read Replicas**: Separate read/write database connections in Django settings for heavy dashboard query execution.
3. **Caching Layer**: Integrate Redis to cache dashboard metrics (`/api/dashboard`) and user membership states.

---

## Future Improvements

- [ ] Real-time task status updates via WebSockets / Django Channels.
- [ ] Task activity audit logging and comment threads.
- [ ] File attachment support via AWS S3 / Cloudinary.
- [ ] Email notifications for task assignments and upcoming due dates.
- [ ] Multi-tenant workspace management and sub-teams.

---

## Running Locally

### Prerequisites
- **Python**: 3.11+
- **Node.js**: 18+ & npm
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/Zeny1303/Sprint.git
cd Sprint
```

### 2. Backend Setup
```bash
cd backend

# Create & activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed demo dataset
python seed.py

# Start development server
python manage.py runserver 8000
```
Backend API will be running at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install --legacy-peer-deps

# Start React development server
npm start
```
Frontend application will open automatically at `http://localhost:3000`.

---

## Docker & Deployment

### Run with Docker Compose
From the project root:
```bash
docker-compose up --build
```

### Production Deployment (Railway / Render)
1. **Backend**: Deploy directory `backend/` using Dockerfile. Set environment variables `DATABASE_URL` (PostgreSQL) and `SECRET_KEY`.
2. **Frontend**: Deploy directory `frontend/` using Dockerfile. Set environment variable `REACT_APP_API_URL`.

---

## Project Status & Author

- **Status**: Production-Ready / Active Development
- **Author**: **Shubham Singh**
- **Repository**: [GitHub — TaskFlow](https://github.com/Zeny1303/Sprint)

<div align="center">
  <br/>
  <strong>TaskFlow</strong> — Built with React 19 & Django REST Framework
</div>
