import React, { useEffect, useState } from 'react'
import { SiteHeader, NavPanel } from '../Navbar'
import { TaskflowProjectHeroSection } from './TaskflowProjectHeroSection'
import { TaskflowMetricsSection } from './TaskflowMetricsSection'
import { TaskflowWorkflowSection } from './TaskflowWorkflowSection'
import { TaskflowFeaturesPanel } from './TaskflowFeaturesPanel'
import { TaskflowArchitectureDiagram } from './TaskflowArchitectureDiagram'
import { TaskflowTechStackSection } from './TaskflowTechStackSection'
import { TaskflowDataModelsSection } from './TaskflowDataModelsSection'
import { TaskflowApiEndpointsSection } from './TaskflowApiEndpointsSection'
import { TaskflowEngineeringDecisionsSection } from './TaskflowEngineeringDecisionsSection'
import { TaskflowFinalCTA } from './TaskflowFinalCTA'
import './TaskflowProjectDetail.css'

export default function TaskflowProjectDetailPage() {
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="taskflow-project-page">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

      {/* Main Content Sections */}
      <TaskflowProjectHeroSection />
      <TaskflowMetricsSection />
      <TaskflowWorkflowSection />
      <TaskflowFeaturesPanel />
      <TaskflowArchitectureDiagram />
      <TaskflowTechStackSection />
      <TaskflowDataModelsSection />
      <TaskflowApiEndpointsSection />
      <TaskflowEngineeringDecisionsSection />
      <TaskflowFinalCTA />
    </div>
  )
}
