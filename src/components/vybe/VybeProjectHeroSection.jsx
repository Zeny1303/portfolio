import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../../assests/vybe/img1.png'
import img2 from '../../assests/vybe/img2.png'
import img3 from '../../assests/vybe/img3.png'
import img4 from '../../assests/vybe/img4.png'
import img5 from '../../assests/vybe/img5.png'
import './VybeProjectDetail.css'

export function VybeProjectHeroSection() {
  const navigate = useNavigate()

  return (
    <header className="vybe-hero-section">
      <div className="vybe-hero-breadcrumb">
        <button onClick={() => navigate('/work')} className="vybe-breadcrumb-btn">
          ← Work
        </button>
        <span className="vybe-breadcrumb-sep">/</span>
        <span className="vybe-breadcrumb-text">Vybe</span>
      </div>

      <div className="vybe-hero-content">
        <div className="vybe-hero-left">
          <span className="vybe-eyebrow">REAL-TIME SOCIAL MUSIC STREAMING PLATFORM</span>
          <h1 className="vybe-hero-title">
            VYBE ✨
            <span className="vybe-title-underline"></span>
          </h1>
          <p className="vybe-hero-description">
            VYBE bridges the gap between independent open-source music discovery, mainstream music catalog exploration, and real-time social interaction. Built with React 18, Vite, TypeScript, Node.js, Express, MongoDB, Socket.IO, Clerk, and Cloudinary, VYBE offers a responsive, dark-mode audio web experience tailored for both casual listeners and registered users.
          </p>

          <div className="vybe-hero-actions">
            <a
              href="https://github.com/Zeny1303/Vybe"
              target="_blank"
              rel="noopener noreferrer"
              className="vybe-btn vybe-btn-primary"
            >
              GitHub Repository ↗
            </a>
            <a
              href="http://3.25.195.26/"
              target="_blank"
              rel="noopener noreferrer"
              className="vybe-btn vybe-btn-primary"
              style={{ background: '#F97316', borderColor: '#F97316' }}
            >
              Live Demo ↗
            </a>
            <a href="#features" className="vybe-btn vybe-btn-secondary">
              Explore Features ↓
            </a>
          </div>
        </div>

        <div className="vybe-hero-right">
          <ImageCarousel />
        </div>
      </div>
    </header>
  )
}

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [img1, img2, img3, img4, img5]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="vybe-carousel">
      <div className="vybe-carousel-container">
        <img
          src={images[currentSlide]}
          alt={`VYBE interface screenshot ${currentSlide + 1}`}
          className="vybe-carousel-image"
        />
      </div>

      <div className="vybe-carousel-controls">
        <button onClick={prevSlide} className="vybe-carousel-btn" aria-label="Previous slide">
          ←
        </button>
        <div className="vybe-carousel-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`vybe-carousel-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="vybe-carousel-btn" aria-label="Next slide">
          →
        </button>
      </div>

      <div className="vybe-carousel-counter">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  )
}
