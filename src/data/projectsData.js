import cortexImg from '../assests/cortex.png'
import taskflowImg from '../assests/Taskflow/img1.png'
import nexoraImg from '../assests/Nexora/img1.png'
import vybeImg from '../assests/vybe/img1.png'

export const projects = [
  {
    id: 'vybe',
    title: 'VYBE',
    subtitle: 'Real-Time Social Music Streaming Platform',
    category: 'Real-Time Social Music Streaming & Discovery Platform',
    image: vybeImg,
    summary:
      'Full-stack, realtime music streaming and social platform featuring mood-based music discovery ("What\'s Your Vybe?"), Jamendo Creative Commons audio streaming, Spotify & MusicBrainz metadata discovery, Socket.IO live activity feeds & chat, synced LRC lyrics, and Clerk-protected role-based admin controls.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Clerk', 'Cloudinary'],
    bullets: [
      'Engineered dual-layer catalog search engine combining Jamendo API Creative Commons audio streaming with Spotify & MusicBrainz metadata discovery.',
      'Implemented real-time Socket.IO social layer for live listening activity broadcasting, online presence indicators, and 1-on-1 direct track sharing.',
      'Developed synchronized LRC lyrics reader with LRCLIB fallback and millisecond-accurate karaoke line highlighting.',
      'Built progressive Clerk authentication system protecting personal library, custom playlists, and role-based Cloudinary media admin panel.'
    ],
    github: 'https://github.com/Zeny1303/Vybe',
    demo: 'http://3.25.195.26/',
    details: {
      tagline: 'Real-Time Social Music Streaming Platform with Dual Catalog Search & Synced LRC Lyrics.',
      overview:
        'VYBE is a full-stack, realtime music streaming and social web application built with React 18, TypeScript, Node.js, Express, MongoDB, Socket.IO, Clerk, and Cloudinary. It bridges independent Creative Commons music streaming with global mainstream catalog discovery, live social activity broadcasting, line-by-line synchronized lyrics, and role-based admin media management.',
      architecture: [
        'React 18 & TypeScript Single Page App with Zustand global state, Tailwind CSS, and Socket.IO client.',
        'Express.js REST API featuring Clerk authentication middleware, MongoDB Mongoose ODM, and Cloudinary media upload handler.',
        'Dual-Layer Catalog Engine integrating Jamendo API (CC Audio Streams), Spotify Web API & MusicBrainz (Metadata Search), and LRCLIB (Synced LRC Lyrics).',
        'Real-time WebSocket server broadcasting live user listening activity, presence state, and 1-on-1 track sharing messages.'
      ],
      keyFeatures: [
        'Dual-Layer Catalog Engine: Direct streaming of free Creative Commons tracks combined with global mainstream metadata search.',
        'Mood Discovery Engine ("What\'s Your Vybe?"): Instant mood-based feed aggregation across 8 distinct vibe profiles.',
        'Real-Time Social Activity & Chat: WebSockets push live "Now Playing" status, soundwave indicators, and direct messaging.',
        'Synchronized LRC Lyrics: Line-by-line synced lyrics reader powered by LRCLIB and Jamendo APIs.',
        'Auth-Aware Progressive UX & Admin Panel: Non-blocking guest streaming with Clerk auth gates and Cloudinary media upload dashboard.'
      ],
      metrics: [
        { label: 'Socket Latency', value: '< 100ms' },
        { label: 'Catalog Search', value: 'Jamendo + Spotify' },
        { label: 'Lyrics Sync', value: 'LRCLIB (LRC)' },
        { label: 'Security', value: 'Clerk RBAC' }
      ]
    }
  },
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
    github: 'https://github.com/Zeny1303/Cortex',
    demo: 'http://3.24.213.142/',
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
      'Engineered a full-stack task management platform utilizing React 19 (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
    tags: ['React 19', 'TypeScript', 'Python', 'Django DRF', 'PostgreSQL', 'Docker', 'JWT', 'Nginx'],
    bullets: [
      'Engineered a full-stack task management platform utilizing React 19 (TypeScript) and Django REST Framework, featuring dynamic Kanban boards, custom project workflows, and secure JWT-based authentication.',
      'Implemented role-based access control (RBAC) and optimized RESTful APIs for seamless CRUD operations, project analytics, and efficient data handling.',
      'Architected a multi-container Docker environment deployed via Railway and Nginx, integrating CI/CD pipelines, state management using AuthContext, and performance monitoring.'
    ],
    github: 'http://github.com/Zeny1303/TaskFlow',
    demo: '#',
    details: {
      tagline: 'Enterprise-grade team task orchestrator featuring Kanban boards, RBAC, and multi-container Docker deployment.',
      overview:
        'TaskFlow is an enterprise-ready full-stack task and workflow management suite built for agile software teams. It provides dynamic drag-and-drop Kanban boards, team role management, milestone tracking, and secure RESTful backend APIs built with Django REST Framework.',
      architecture: [
        'Django REST Framework backend powering structured REST APIs with custom serializers and query optimizations.',
        'React 19 + TypeScript frontend providing strict type safety, responsive drag-and-drop state, and AuthContext JWT state.',
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
    id: 'nexora',
    title: 'Nexora',
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
    github: 'https://github.com/Zeny1303/NexoraV2',
    demo: 'https://nexora-v2-taupe.vercel.app/',
    details: {
      tagline: 'Secure, high-concurrency P2P fintech wallet with atomic credit transfers and Swagger API documentation.',
      overview:
        'Nexora is a financial technology system designed for seamless peer-to-peer credit transfers, merchant QR scanning, and transparent audit logging. Built with Node.js, Express, MongoDB, and React Native, it features bank-grade input validation, password hashing, and transaction safety.',
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

