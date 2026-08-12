import React from 'react'

const skills = {
  languages: ['Python', 'TypeScript', 'JavaScript'],
  frontend: ['React.js', 'React Native', 'HTML', 'CSS', 'Tailwind CSS'],
  backend: [
    'Node.js',
    'Express.js',
    'Django',
    'REST APIs',
    'WebSockets',
    'JWT Authentication',
    'OAuth2',
  ],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'Git', 'GitHub', 'Swagger'],
  concepts: [
    'Data Structures & Algorithms',
    'OOP',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
  ],
}

function SkillDot() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fff',
          display: 'block',
        }}
      />
    </span>
  )
}

function SkillItems({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 32px', alignItems: 'center' }}>
      {items.map((skill) => (
        <span
          key={skill}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 15,
            fontWeight: 500,
            color: '#374151',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#0284c7',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          {skill}
        </span>
      ))}
    </div>
  )
}

function SkillCard({ title, children, style = {} }) {
  return (
    <article
      style={{
        background: '#ffffff',
        border: '1.5px solid #dbeafe',
        borderRadius: 18,
        padding: '28px 36px 32px',
        boxShadow: '0 2px 16px rgba(15,23,42,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(2,132,199,0.13)'
        e.currentTarget.style.borderColor = '#93c5fd'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(15,23,42,0.06)'
        e.currentTarget.style.borderColor = '#dbeafe'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Title row with dot icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <SkillDot />
        <h3
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#1e40af',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Short blue underline */}
      <div
        style={{
          width: 40,
          height: 2.5,
          background: '#2563eb',
          borderRadius: 99,
          marginBottom: 22,
          marginLeft: 30,
        }}
      />

      {children}
    </article>
  )
}

export default function TechnologySection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: '#ffffff',
        overflow: 'hidden',
        paddingBottom: 80,
      }}
    >
      {/* =====================================================
          SKY + DOME CLOUD HEADER — matches reference image
      ====================================================== */}
      <div
        style={{ position: 'relative', width: '100%', lineHeight: 0, userSelect: 'none' }}
        aria-hidden="true"
      >
        <svg
          style={{ display: 'block', width: '100%', height: 'clamp(220px, 28vw, 360px)' }}
          viewBox="0 0 1440 360"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tsSkyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a8fe3" />
              <stop offset="60%" stopColor="#4db8f0" />
              <stop offset="100%" stopColor="#a8daf7" />
            </linearGradient>
          </defs>

          {/* Full sky fill */}
          <rect width="1440" height="360" fill="url(#tsSkyGrad)" />

          {/* ── LAYER 1: far-back small white domes ── */}
          <g fill="rgba(255,255,255,0.55)">
            <ellipse cx="60"   cy="260" rx="70"  ry="50" />
            <ellipse cx="200"  cy="250" rx="90"  ry="60" />
            <ellipse cx="370"  cy="255" rx="80"  ry="55" />
            <ellipse cx="530"  cy="248" rx="100" ry="62" />
            <ellipse cx="700"  cy="252" rx="85"  ry="57" />
            <ellipse cx="870"  cy="246" rx="95"  ry="60" />
            <ellipse cx="1040" cy="254" rx="90"  ry="58" />
            <ellipse cx="1210" cy="249" rx="100" ry="63" />
            <ellipse cx="1380" cy="255" rx="80"  ry="54" />
          </g>

          {/* ── LAYER 2: mid light-blue domes ── */}
          <g fill="#d0edf9">
            <ellipse cx="0"    cy="295" rx="80"  ry="65" />
            <ellipse cx="140"  cy="285" rx="110" ry="72" />
            <ellipse cx="310"  cy="280" rx="100" ry="68" />
            <ellipse cx="480"  cy="278" rx="120" ry="75" />
            <ellipse cx="660"  cy="283" rx="105" ry="70" />
            <ellipse cx="840"  cy="276" rx="115" ry="74" />
            <ellipse cx="1020" cy="282" rx="108" ry="71" />
            <ellipse cx="1200" cy="278" rx="118" ry="73" />
            <ellipse cx="1380" cy="283" rx="95"  ry="66" />
            <ellipse cx="1440" cy="290" rx="80"  ry="62" />
          </g>

          {/* ── LAYER 3: front white large domes that sit on white bg ── */}
          <g fill="#ffffff">
            <ellipse cx="0"    cy="335" rx="100" ry="80" />
            <ellipse cx="160"  cy="325" rx="130" ry="90" />
            <ellipse cx="360"  cy="320" rx="125" ry="88" />
            <ellipse cx="560"  cy="318" rx="140" ry="92" />
            <ellipse cx="760"  cy="320" rx="130" ry="88" />
            <ellipse cx="960"  cy="316" rx="138" ry="91" />
            <ellipse cx="1160" cy="320" rx="132" ry="89" />
            <ellipse cx="1360" cy="324" rx="125" ry="86" />
            <ellipse cx="1500" cy="330" rx="100" ry="78" />
          </g>

          {/* White fill from ~310 down to seal to white bg */}
          <rect x="0" y="310" width="1440" height="50" fill="#ffffff" />
        </svg>
      </div>

      {/* =====================================================
          SKILLS CONTENT
      ====================================================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 24px 0',
        }}
      >
        {/* HEADING */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(44px, 6vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#0b1b3a',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Skills
          </h2>

          {/* Double wavy underline */}
          <svg
            style={{ marginTop: 10, width: 120 }}
            viewBox="0 0 120 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 5 C20 1, 50 1, 70 5 C90 9, 108 5, 116 3"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M14 12 C30 9, 55 9, 76 12 C94 14, 106 11, 112 10"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* GRID */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
        >
          <style>{`
            @media (max-width: 620px) {
              .skills-grid {
                grid-template-columns: 1fr !important;
              }
              .skills-grid article[style*="gridColumn"] {
                grid-column: 1 !important;
              }
            }
          `}</style>
          {/* Row 1 */}
          <SkillCard title="Languages">
            <SkillItems items={skills.languages} />
          </SkillCard>

          <SkillCard title="Frontend">
            <SkillItems items={skills.frontend} />
          </SkillCard>

          {/* Row 2 — full width */}
          <SkillCard title="Backend Engineering" style={{ gridColumn: '1 / -1' }}>
            <SkillItems items={skills.backend} />
          </SkillCard>

          {/* Row 3 */}
          <SkillCard title="Databases & Tools">
            <SkillItems items={skills.databases} />
          </SkillCard>

          <SkillCard title="Core Concepts">
            <SkillItems items={skills.concepts} />
          </SkillCard>
        </div>
      </div>
    </section>
  )
}
