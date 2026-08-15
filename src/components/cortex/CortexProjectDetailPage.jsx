import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader, NavPanel } from '../Navbar'
import { ProjectHeroSection } from './ProjectHeroSection'
import { HeroMetrics } from './HeroMetrics'
import { WorkflowSection } from './WorkflowSection'
import { FeaturesPanel } from './FeaturesPanel'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { TechStackSection } from './TechStackSection'
import { DataModelsSection } from './DataModelsSection'
import { ApiEndpointsSection } from './ApiEndpointsSection'
import { ChallengesSection } from './ChallengesSection'
import { EngineeringDecisionsSection } from './EngineeringDecisionsSection'
import { RoadmapSection } from './RoadmapSection'
import { PerformanceSection } from './PerformanceSection'
import { FinalCTA } from './FinalCTA'
import './CortexProjectDetail.css'

export default function CortexProjectDetailPage() {
  const navigate = useNavigate()
  const [navOpen, setNavOpen] = React.useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cortex-project-page">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

      {/* Main Content */}
      <ProjectHeroSection />
      <HeroMetrics />
      <WorkflowSection />
      <FeaturesPanel />
      <ArchitectureDiagram />
      <TechStackSection />
      <DataModelsSection />
      <ApiEndpointsSection />
      <ChallengesSection />
      <EngineeringDecisionsSection />
      <RoadmapSection />
      <PerformanceSection />
      <FinalCTA />
    </div>
  )
}
