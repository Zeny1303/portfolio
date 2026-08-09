import { useEffect, useState } from "react";



import {
  PiPauseFill,
  PiPlayFill,
  PiTrash,
  PiPaperPlaneTiltFill
} from "react-icons/pi";

export default function VoiceRecorder({ setShowRecorder }) {

  /* ===========================
      STATES
  =========================== */

  // Recording timer (seconds)
  const [seconds, setSeconds] = useState(0);

  // Is recording paused?
  const [paused, setPaused] = useState(false);

  /* ===========================
      TIMER
  =========================== */

  useEffect(() => {

    if (paused) return;

    const timer = setInterval(() => {

      setSeconds((prev) => prev + 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [paused]);

  /* ===========================
      FORMAT TIMER
  =========================== */

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

  const secs = String(seconds % 60).padStart(2, "0");

  /* ===========================
      FAKE WAVEFORM
  =========================== */

  const bars = [
    14,20,12,28,16,24,18,
    30,20,16,24,14,26,18,
    12,24,30,18,22,15
  ];

  return (

    <div className="voice-recorder">

      {/* =======================
          HEADER
      ======================== */}

      <div className="voice-header">

        <div className="recording-dot"></div>

        <span className="recording-text">

          {paused ? "Paused" : "Recording"}

        </span>

        <span className="voice-time">

          {minutes}:{secs}

        </span>

      </div>


      {/* =======================
          WAVEFORM
      ======================== */}

      <div className="waveform">

        {

          bars.map((height,index)=>(

            <div

              key={index}

              className={`wave-bar ${paused ? "paused" : ""}`}

              style={{

                height:`${height}px`,

                animationDelay:`${index * 0.05}s`

              }}

            />

          ))

        }

      </div>


      {/* =======================
          ACTIONS
      ======================== */}

      <div className="voice-actions">

        {/* DELETE */}

        <button

          className="voice-btn delete"

          onClick={()=>{

            setShowRecorder(false);

          }}

        >

          <PiTrash size={24}/>

        </button>


        {/* PLAY / PAUSE */}

        <button

          className="voice-btn pause"

          onClick={()=>setPaused(!paused)}

        >

          {

            paused ?

            <PiPlayFill size={28}/>

            :

            <PiPauseFill size={28}/>

          }

        </button>


        {/* SEND */}

        <button

          className="voice-btn send"

        >

          <PiPaperPlaneTiltFill size={22}/>

        </button>

      </div>

    </div>

  );

}