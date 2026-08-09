import "./Display.css";

import { useState, useEffect } from "react";

import { BsBatteryFull } from "react-icons/bs";
import { MdSignalCellular4Bar } from "react-icons/md";

export default function Display() {

  /* ===========================
     MAIN DISPLAY MESSAGES
  =========================== */

  const mainMessages = [

    "LET'S CONNECT",
    
    "OPEN TO ROLES",

    "FRONTEND DEVELOPER",

    "BACKEND DEVELOPER",
    
    "FULL STACK DEVELOPER",

  ];



  /* ===========================
     SUBTITLE MESSAGES
  =========================== */

  const subMessages = [

    "LET'S BUILD SOMETHING AMAZING",

    "REPLY WITHIN 24 HOURS",

    "VOICE INTRO AVAILABLE",

    "OPEN TO RELOCATION",

    "THANKS FOR VISITING"

  ];



  /* ===========================
     STATES
  =========================== */

  const [mainIndex, setMainIndex] = useState(0);

  const [subIndex, setSubIndex] = useState(0);



  /* ===========================
     CHANGE MAIN TEXT
  =========================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setMainIndex((prev) => (prev + 1) % mainMessages.length);

    }, 3500);

    return () => clearInterval(timer);

  }, []);




  /* ===========================
     CHANGE SUBTITLE
  =========================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setSubIndex((prev) => (prev + 1) % subMessages.length);

    }, 3500);

    return () => clearInterval(timer);

  }, []);




  return (

    <div className="display-screen">

      {/* Moving Scan Line */}

      <div className="scan-line"></div>



      {/* ===========================
          TOP BAR
      =========================== */}

      <div className="display-top">

        <BsBatteryFull className="status-icon" />

        <MdSignalCellular4Bar className="status-icon" />

      </div>



      {/* ===========================
          MAIN TEXT
      =========================== */}

      <div className="display-center">

        <h1 className="display-title">

          {mainMessages[mainIndex]}

         
        
        </h1>

      </div>



      {/* ===========================
          DIVIDER
      =========================== */}

      <div className="display-line"></div>



      {/* ===========================
          SUBTITLE
      =========================== */}

      <div className="display-bottom">

        <p className="display-subtitle">

          {subMessages[subIndex]}

          

        </p>

      </div>

    </div>

  );

}