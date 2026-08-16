import { useState, useRef, useEffect, useCallback } from "react";
import "./SideButtons.css";
import { FaPencilAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";
import introAudio from "../../assests/intro.mp3";
import resumePDF from "../../assests/Sneha_Resume.pdf";

export default function SideButtons() {
  const [audioState, setAudioState] = useState("IDLE"); // IDLE | PLAYING | PAUSED

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(introAudio);
    audioRef.current = audio;

    const handleEnded = () => setAudioState("IDLE");
    const handleError = () => setAudioState("IDLE");

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const handleIntroClick = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioState === "PLAYING") {
      audio.pause();
      setAudioState("PAUSED");
    } else {
      try {
        await audio.play();
        setAudioState("PLAYING");
      } catch (err) {
        console.warn("Audio playback error:", err);
        setAudioState("IDLE");
      }
    }
  }, [audioState]);

  // ── 2. Resume download ──────────────────────────────────────────────────
  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Sneha_Kashyap_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    requestAnimationFrame(() => document.body.removeChild(link));
  }, []);

  let introLabel = "INTRO";
  let introAriaLabel = "Play introduction";
  if (audioState === "PLAYING") {
    introLabel = "INTRO 🔊";
    introAriaLabel = "Pause introduction";
  } else if (audioState === "PAUSED") {
    introLabel = "INTRO ▶";
    introAriaLabel = "Resume introduction";
  }

  return (
    <div className="left-panel">

      {/* ── INTRO ── */}
      <button
        className={`side-button${audioState === "PLAYING" ? " side-button--active" : ""}`}
        onClick={handleIntroClick}
        aria-pressed={audioState === "PLAYING"}
        aria-label={introAriaLabel}
      >
        <span className="screw top-left"    aria-hidden="true" />
        <span className="screw top-right"   aria-hidden="true" />
        <span className="screw bottom-left" aria-hidden="true" />
        <span className="screw bottom-right"aria-hidden="true" />
        <FaPencilAlt className="button-icon" aria-hidden="true" />
        <h3>{introLabel}</h3>
      </button>

      {/* ── RESUME ── */}
      <button
        className="side-button"
        onClick={handleResumeDownload}
        aria-label="Download Sneha's resume"
      >
        <span className="screw top-left"    aria-hidden="true" />
        <span className="screw top-right"   aria-hidden="true" />
        <span className="screw bottom-left" aria-hidden="true" />
        <span className="screw bottom-right"aria-hidden="true" />
        <HiDocument className="button-icon" aria-hidden="true" />
        <h3>RESUME</h3>
      </button>

      {/* ── LOCATION ── */}
      <button className="side-button" aria-label="Location: Bokaro Steel City, Jharkhand">
        <span className="screw top-left"    aria-hidden="true" />
        <span className="screw top-right"   aria-hidden="true" />
        <span className="screw bottom-left" aria-hidden="true" />
        <span className="screw bottom-right"aria-hidden="true" />
        <FaMapMarkerAlt className="button-icon" aria-hidden="true" />
        <h3>BOKARO, JH</h3>
      </button>

    </div>
  );
}
