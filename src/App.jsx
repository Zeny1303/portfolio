import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import WorkPage from './components/WorkPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import ProjectDetailPage from './components/ProjectDetailPage'
import './App.css'

/* ── Root App ── */
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:projectId" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Analytics />
    </>
  )
}
