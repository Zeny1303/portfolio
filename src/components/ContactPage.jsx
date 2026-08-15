import { useState } from 'react'
import { SiteHeader, NavPanel } from './Navbar'
import ContactBoard from './contactBoard/ContactBoard'
import './ContactPage.css'

export default function ContactPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="contact-page" id="contact-section">
      <SiteHeader onOpen={() => setNavOpen(true)} />
      <NavPanel isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <ContactBoard />
    </div>
  )
}
