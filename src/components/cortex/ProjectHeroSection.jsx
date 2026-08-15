import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../../assests/cortex/img1.png'
import img2 from '../../assests/cortex/img2.png'
import img3 from '../../assests/cortex/img3.png'
import img4 from '../../assests/cortex/img4.png'
import img5 from '../../assests/cortex/img5.png'
import img6 from '../../assests/cortex/img6.png'
import img7 from '../../assests/cortex/img 7.png'
import './CortexProjectDetail.css'

export function ProjectHeroSection() {
  const navigate = useNavigate()

  return (
    <header className="cortex-hero-section">
      <div className="cortex-hero-breadcrumb">
        <button onClick={() => navigate('/work')} className="cortex-breadcrumb-btn">
          ← Work
        </button>
        <span className="cortex-breadcrumb-sep">/</span>
        <span className="cortex-breadcrumb-text">Cortex</span>
      </div>

      <div className="cortex-hero-content">
        <div className="cortex-hero-left">
          <span className="cortex-eyebrow">AI-POWERED MOCK INTERVIEW PLATFORM</span>
          <h1 className="cortex-hero-title">
            CORTEX
            <span className="cortex-title-underline"></span>
          </h1>
          <p className="cortex-hero-description">
            Cortex replaces static preparation with an automated, low-latency mock interview environment that combines PDF resume parsing, contextual LLM question generation, browser-native speech processing (STT/TTS), dimensional LLM scoring, and credit-based monetization with Razorpay integration.
          </p>

          <div className="cortex-hero-actions">
            <a
              href="https://github.com/Zeny1303/Cortex"
              target="_blank"
              rel="noopener noreferrer"
              className="cortex-btn cortex-btn-primary"
            >
              GitHub Repository ↗
            </a>
            <a
              href="http://3.24.213.142/"
              target="_blank"
              rel="noopener noreferrer"
              className="cortex-btn cortex-btn-primary"
              style={{ background: '#F97316', borderColor: '#F97316' }}
            >
              Live Demo ↗
            </a>
            <a href="#features" className="cortex-btn cortex-btn-secondary">
              Explore Features ↓
            </a>
          </div>
        </div>

        <div className="cortex-hero-right">
          <ImageCarousel />
        </div>
      </div>
    </header>
  )
}

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [img1, img2, img3, img4, img5, img6, img7]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="cortex-carousel">
      <div className="cortex-carousel-container">
        <img
          src={images[currentSlide]}
          alt={`Cortex interface screenshot ${currentSlide + 1}`}
          className="cortex-carousel-image"
        />
      </div>

      <div className="cortex-carousel-controls">
        <button onClick={prevSlide} className="cortex-carousel-btn" aria-label="Previous slide">
          ←
        </button>
        <div className="cortex-carousel-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`cortex-carousel-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="cortex-carousel-btn" aria-label="Next slide">
          →
        </button>
      </div>

      <div className="cortex-carousel-counter">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  )
}
