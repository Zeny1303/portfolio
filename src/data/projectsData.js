import cortexImg from '../assests/cortex.png'
import taskflowImg from '../assests/taskflow.png'
import nexoraImg from '../assests/nexora.png'

export const projects = [
  {
    id: 'cortex',
    title: 'Cortex',
    subtitle: 'AI Interview SaaS Platform',
    category: 'Real-Time AI Interview SaaS Platform',
    image: cortexImg,
    summary:
      'Built full-stack SaaS platform delivering real-time AI interview experiences with collaborative editor, voice pipeline, analytics, and WebSocket communication.',
    tags: ['JavaScript', 'Node.js', 'React', 'WebSocket', 'Docker', 'AI Voice Pipeline', 'Analytics'],
    bullets: [
      'Built full-stack SaaS platform delivering real-time AI interview experiences with collaborative editor, voice pipeline, analytics, and WebSocket communication.',
      'Engineered modular Node.js backend with WebSocket voice streaming, AI interviewer integration, RESTful APIs, authentication, containerized CI/CD, and observability monitoring.',
      'Designed collaborative in-browser code editor with real-time synchronization, scoring analytics, event-tracking pipeline, and latency-optimized architecture.'
    ],
    github: 'https://github.com/Zeny1303',
    demo: '#',
    details: {
      tagline: 'Real-time AI-powered interview platform with low-latency voice streaming & collaborative code execution.',
      overview:
        'Cortex is a modern SaaS platform designed to automate and elevate candidate technical interviews using conversational AI. It combines bidirectional WebSocket voice streaming with an in-browser collaborative code editor, giving interviewees an interactive, human-like technical evaluation experience.',
      architecture: [
        'Modular Node.js backend using Express and WebSockets for real-time bi-directional audio/event transport.',
        'AI Interviewer integration with voice synthesis pipeline and prompt orchestration engine.',
        'Containerized deployment using Docker with automated CI/CD pipeline and latency monitoring.',
        'In-browser collaborative code editor with real-time AST syntax validation and execution sandbox.'
      ],
      keyFeatures: [
        'Real-time Audio Streaming: Sub-100ms latency voice communication between user and AI interviewer.',
        'Collaborative Code Editor: Synchronized code execution, multi-language support, and real-time syntax checking.',
        'Automated Scoring Analytics: Detailed feedback report generated post-interview analyzing technical correctness and soft skills.',
        'Secure Authentication & Session Tokens: JWT-based authorization and session state isolation.'
      ],
      metrics: [
        { label: 'Latency', value: '< 100ms' },
        { label: 'Tech Stack', value: 'Node.js + React' },
        { label: 'Real-Time Pipeline', value: 'WebSockets' },
        { label: 'Deployment', value: 'Docker' }
      ]
    }
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    subtitle: 'Task & Workflow Management',
    category: 'Full-Stack Task & Workflow Management Platform',
    image: taskflowImg,
    summary:
      'Engineered a full-stack task management platform utilizing React (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
    tags: ['React', 'TypeScript', 'Django', 'DRF', 'MongoDB', 'Docker', 'JWT', 'Nginx'],
    bullets: [
      'Engineered a full-stack task management platform utilizing React (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
      'Implemented role-based access control (RBAC) and optimized RESTful APIs for seamless CRUD operations, project analytics, and efficient data handling.',
      'Architected a multi-container Docker environment deployed via Railway and Nginx, integrating CI/CD pipelines, state management using AuthContext, and performance monitoring.'
    ],
    github: 'https://github.com/Zeny1303',
    demo: '#',
    details: {
      tagline: 'Enterprise-grade task orchestrator featuring Kanban boards, RBAC, and multi-container Docker deployment.',
      overview:
        'TaskFlow is a production-grade full-stack task and workflow management suite built for agile software teams. It provides dynamic drag-and-drop Kanban boards, team role management, milestone tracking, and secure RESTful backend APIs built with Django REST Framework.',
      architecture: [
        'Django REST Framework backend powering structured REST APIs with custom serializers and query optimizations.',
        'React + TypeScript frontend providing strict type safety, responsive drag-and-drop state, and AuthContext JWT state.',
        'Multi-container Docker orchestration (Frontend, Backend API, Database) deployed behind Nginx reverse proxy.',
        'Role-Based Access Control (RBAC) protecting endpoints and project workspace resources.'
      ],
      keyFeatures: [
        'Dynamic Kanban Boards: Interactive task tracking with real-time status updates and priority tagging.',
        'Custom Workflows & Projects: Multi-tenant project organization with custom status columns and member assignments.',
        'JWT Authentication & RBAC: Token refresh mechanisms and granular user permissions (Admin, Member, Viewer).',
        'Automated CI/CD & Docker: Railway deployment with zero-downtime multi-container orchestration.'
      ],
      metrics: [
        { label: 'Type Safety', value: '100% TS' },
        { label: 'Backend API', value: 'Django DRF' },
        { label: 'Security', value: 'JWT + RBAC' },
        { label: 'Architecture', value: 'Docker + Nginx' }
      ]
    }
  },
  {
    id: 'coinpay',
    title: 'CoinPay',
    subtitle: 'P2P Digital Wallet Platform',
    category: 'Peer-to-Peer Digital Wallet & Payment Platform',
    image: nexoraImg,
    summary:
      'Architected and developed a secure peer-to-peer digital wallet platform enabling virtual credit transfers, QR-based payments, and persistent transaction history.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'React Native', 'JWT', 'Docker', 'Swagger', 'Bcrypt'],
    bullets: [
      'Architected and developed a secure peer-to-peer digital wallet platform enabling virtual credit transfers using Node.js, Express.js, MongoDB, and React Native.',
      'Implemented JWT authentication, role-based access control (RBAC), QR-based payments, and persistent transaction history.',
      'Engineered 15+ RESTful APIs for authentication, wallet management, and transaction processing using modular MVC architecture with centralized middleware, request validation, bcrypt hashing, and Swagger documentation.'
    ],
    github: 'https://github.com/Zeny1303',
    demo: '#',
    details: {
      tagline: 'Secure, high-concurrency P2P fintech wallet with atomic credit transfers and Swagger API documentation.',
      overview:
        'CoinPay is a financial technology system designed for seamless peer-to-peer credit transfers, merchant QR scanning, and transparent audit logging. Built with Node.js, Express, MongoDB, and React Native, it features bank-grade input validation, password hashing, and transaction safety.',
      architecture: [
        'Node.js & Express.js modular MVC architecture with strict middleware pipelines for authentication & rate limiting.',
        'MongoDB transactional balance updates ensuring zero race conditions during credit transfers.',
        'Bcrypt hashing, JWT bearer tokens, and request schema validation across 15+ API endpoints.',
        'Interactive OpenAPI / Swagger documentation for developers and API clients.'
      ],
      keyFeatures: [
        'Atomic P2P Transfers: Instant credit transfer between users with real-time balance updates and ledger entries.',
        'QR Code Scanner & Payments: Mobile-ready QR payload parsing for merchant and peer transactions.',
        'Comprehensive Transaction History: Searchable, paginated audit log of incoming and outgoing payments.',
        'Swagger API Docs: Interactive documentation interface built using OpenAPI specifications.'
      ],
      metrics: [
        { label: 'REST APIs', value: '15+ Endpoints' },
        { label: 'Security', value: 'Bcrypt + JWT' },
        { label: 'Database', value: 'MongoDB' },
        { label: 'Docs', value: 'Swagger OpenAPI' }
      ]
    }
  }
]
