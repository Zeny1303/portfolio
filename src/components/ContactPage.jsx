import { useNavigate } from 'react-router-dom'
import ContactBoard from './contactBoard/ContactBoard'
import './ContactPage.css'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <div className="contact-page">
      <button className="contact-back" onClick={() => navigate('/')} aria-label="Back to home">
        ← Back
      </button>
      <ContactBoard />
    </div>
  )
}
