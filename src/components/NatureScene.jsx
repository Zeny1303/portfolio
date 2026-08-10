import React from 'react'
import sceneRemoveImg from '../assests/scene-removebg-preview.png'
import './NatureScene.css'

export default function NatureScene() {
  return (
    <div className="about-end-scene-container">
      {/* Floating Info Card */}
      <div className="about-end-scene-content">
        <div className="scene-pill-badge">MY JOURNEY CONTINUES</div>
        <h2 className="scene-card-heading">
          Still curious.<br />
          <span className="highlight-text">Still building.</span>
        </h2>
        <p className="scene-card-desc">
          Rooted in passion, branching into new technology horizons with every project.
        </p>
      </div>

      {/* Main Cutout Scene Image */}
      <div className="about-end-scene-image-wrapper">
        <img
          src={sceneRemoveImg}
          alt="Sneha Journey Scene"
          className="about-end-scene-img"
          draggable="false"
        />
      </div>
    </div>
  )
}