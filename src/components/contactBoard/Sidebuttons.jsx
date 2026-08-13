import { useState, useRef, useEffect, useCallback } from "react";
import "./SideButtons.css";
import { FaPencilAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";
import introAudio from "../../assests/intro.mp3";
import resumePDF from "../../assests/Sneha_Resume.pdf";

export default function SideButtons() {
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Initialise Audio inside useEffect so it only runs once on mount,
  //    never during SSR, and is properly torn down on unmount.
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio with imported file path
    const audio = new Audio(introAudio);
    audioRef.current = audio;

    // Stable ended handler so we can removeEventListener on cleanup
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      // ── Unmount cleanup: stop audio, remove listener, release object ──
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);
      // Detach src so the browser can release the media resource
      audio.src = "";
      audioRef.current = null;
    };
  }, []); // runs once on mount


  // ── 1. Play / Stop intro audio ──────────────────────────────────────────
  const handleIntroClick = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Stop and reset
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      try {
        // play() returns a Promise — must await to catch autoplay errors
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Browser autoplay policy blocked it, or file not found
        console.warn("Audio playback failed:", err.message);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);


  // ── 2. Resume download ──────────────────────────────────────────────────
  //    File imported from src/assests/Sneha_Resume.pdf
  const handleResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Sneha_Kashyap_Resume.pdf"; // filename saved on user's disk
    // Append → click → remove is the only reliable cross-browser approach
    document.body.appendChild(link);
    link.click();
    // Use rAF so the click fires before we remove the element
    requestAnimationFrame(() => document.body.removeChild(link));
  }, []);


  return (
    <div className="left-panel">

      {/* ── INTRO ── */}
      <button
        className={`side-button${isPlaying ? " side-button--active" : ""}`}
        onClick={handleIntroClick}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Stop intro audio" : "Play intro audio"}
      >
        <span className="screw top-left"    aria-hidden="true" />
        <span className="screw top-right"   aria-hidden="true" />
        <span className="screw bottom-left" aria-hidden="true" />
        <span className="screw bottom-right"aria-hidden="true" />
        <FaPencilAlt className="button-icon" aria-hidden="true" />
        <h3>{isPlaying ? "STOP" : "INTRO"}</h3>
      </button>

      {/* ── RESUME ── */}
      <button
        className="side-button"
        onClick={handleResumeDownload}
        aria-label="Download resume"
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
