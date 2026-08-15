import React, { useEffect, useState } from 'react'
import { SiteHeader, NavPanel } from '../Navbar'
import { VybeProjectHeroSection } from './VybeProjectHeroSection'
import { VybeMetricsSection } from './VybeMetricsSection'
import { VybeWorkflowSection } from './VybeWorkflowSection'
import { VybeFeaturesPanel } from './VybeFeaturesPanel'
import { VybeArchitectureDiagram } from './VybeArchitectureDiagram'
import { VybeTechStackSection } from './VybeTechStackSection'
import { VybeDataModelsSection } from './VybeDataModelsSection'
import { VybeApiEndpointsSection } from './VybeApiEndpointsSection'
import { VybeEngineeringDecisionsSection } from './VybeEngineeringDecisionsSection'
import { VybeFinalCTA } from './VybeFinalCTA'
import './VybeProjectDetail.css'

export default function VybeProjectDetailPage() {
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vybe-project-page">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />

      {/* Main Content Sections */}
      <VybeProjectHeroSection />
      <VybeMetricsSection />
      <VybeWorkflowSection />
      <VybeFeaturesPanel />
      <VybeArchitectureDiagram />
      <VybeTechStackSection />
      <VybeDataModelsSection />
      <VybeApiEndpointsSection />
      <VybeEngineeringDecisionsSection />
      <VybeFinalCTA />
    </div>
  )
}
