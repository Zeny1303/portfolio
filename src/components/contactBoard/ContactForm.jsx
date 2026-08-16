import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaMicrophone,
  FaTrashAlt,
  FaSquare,
  FaPlay,
  FaPause,
  FaChevronRight
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import "./ContactForm.css";

// Waveform bar height presets matching retro audio visualizer
const WAVEFORM_BARS = [
  15, 30, 45, 20, 60, 80, 50, 95, 65, 40,
  85, 55, 70, 90, 45, 75, 35, 65, 50, 30,
  55, 40, 25, 15
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null); // "name" | "email" | "msg"
  const [status, setStatus] = useState("IDLE"); // "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Voice recording states
  const [recordingState, setRecordingState] = useState("IDLE"); // "IDLE" | "RECORDING" | "PREVIEW"
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [mimeType, setMimeType] = useState("");

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioInstanceRef = useRef(null);

  // Helper to format seconds as MM:SS
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Extension helper based on MIME type
  const getExtensionFromMimeType = (type) => {
    if (!type) return "webm";
    const cleanType = type.toLowerCase();
    if (cleanType.includes("ogg")) return "ogg";
    if (cleanType.includes("mp4") || cleanType.includes("m4a") || cleanType.includes("aac")) return "mp4";
    if (cleanType.includes("wav")) return "wav";
    if (cleanType.includes("mpeg") || cleanType.includes("mp3")) return "mp3";
    return "webm";
  };

  // MIME type runtime capability check
  const getSupportedMimeType = () => {
    if (typeof MediaRecorder === "undefined") return "";
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4",
      "audio/aac"
    ];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  };

  // Resource cleanup functions
  const cleanupStreamAndRecorder = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    mediaRecorderRef.current = null;
  };

  const cleanupAudioPlayer = () => {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current = null;
    }
    setIsPlaying(false);
    setPlaybackProgress(0);
  };

  const cleanupAudioUrl = () => {
    cleanupAudioPlayer();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      cleanupStreamAndRecorder();
      cleanupAudioUrl();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (feedbackMsg) {
      setFeedbackMsg("");
      if (status !== "SENDING") setStatus("IDLE");
    }
  };

  // Start voice recording (transitions to RECORDING)
  const startRecording = async () => {
    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setStatus("ERROR");
      setFeedbackMsg("Voice recording is not supported on this browser.");
      return;
    }

    deleteRecording();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const selectedMime = getSupportedMimeType();
      const options = selectedMime ? { mimeType: selectedMime } : {};
      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalMime = recorder.mimeType || selectedMime || "audio/webm";
        const blob = new Blob(chunks, { type: finalMime });
        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);
        setMimeType(finalMime);
        setRecordingState("PREVIEW");
        cleanupStreamAndRecorder();
      };

      recorder.start(100);
      setRecordingState("RECORDING");
      setRecordingTime(0);

      // Max duration 60 seconds auto-stop timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error("[Voice Recording Error]:", err);
      cleanupStreamAndRecorder();
      setRecordingState("IDLE");
      setStatus("ERROR");
      setFeedbackMsg("Microphone access denied or unavailable.");
    }
  };

  // Stop voice recording (transitions to PREVIEW)
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    } else {
      cleanupStreamAndRecorder();
      setRecordingState("IDLE");
    }
  };

  // Delete recording (transitions to IDLE / TEXT mode)
  const deleteRecording = () => {
    cleanupAudioUrl();
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingState("IDLE");
    setRecordingTime(0);
    setPlaybackProgress(0);
  };

  // Toggle play/pause preview
  const togglePlayPause = () => {
    if (!audioUrl) return;

    if (isPlaying) {
      cleanupAudioPlayer();
    } else {
      const audio = new Audio(audioUrl);

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setPlaybackProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackProgress(0);
      };

      audioInstanceRef.current = audio;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("[Audio Playback Error]:", err);
          setIsPlaying(false);
        });
    }
  };

  const validateForm = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail) {
      return "Name and email are required.";
    }

    if (recordingState !== "PREVIEW" && !trimmedMessage) {
      return "Name, email and message are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Please provide a valid email address.";
    }

    return null;
  };

  // Helper to convert Blob to Base64 string for Google Apps Script
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const parts = reader.result.split(",");
          resolve(parts[1] || "");
        } else {
          resolve("");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();

    if (status === "SENDING") return;

    setFeedbackMsg("");
    const validationError = validateForm();
    if (validationError) {
      setStatus("ERROR");
      setFeedbackMsg(validationError);
      return;
    }

    const googleAppScriptUrl = import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL || "";
    const apiUrl = import.meta.env.VITE_API_URL || "";

    // Check 5 MB limit if voice recording is present
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (audioBlob && audioBlob.size > MAX_SIZE) {
      setStatus("ERROR");
      setFeedbackMsg("Voice recording is too large.");
      return;
    }

    setStatus("SENDING");

    // ── PATH A: GOOGLE APPS SCRIPT WEB APP ──
    if (googleAppScriptUrl) {
      try {
        let voiceBase64 = "";
        if (audioBlob) {
          voiceBase64 = await blobToBase64(audioBlob);
        }

        const ext = getExtensionFromMimeType(mimeType || (audioBlob && audioBlob.type));
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          voiceBase64: voiceBase64,
          voiceMimeType: mimeType || (audioBlob && audioBlob.type) || "audio/webm",
          voiceFilename: `voice-message-${Date.now()}.${ext}`,
          submissionType: (audioBlob && formData.message.trim())
            ? "voice+text"
            : (audioBlob ? "voice" : "text"),
          honeypot: ""
        };

        const response = await fetch(googleAppScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (data && data.success) {
          setStatus("SUCCESS");
          setShowSuccessModal(true);
          setFormData({ name: "", email: "", message: "" });
          if (audioBlob) deleteRecording();
        } else {
          setStatus("ERROR");
          setFeedbackMsg(
            (data && data.message) || "Unable to send your message right now. Please try again."
          );
        }
      } catch (err) {
        console.error("[Google Apps Script Submission Error]:", err);
        setStatus("ERROR");
        setFeedbackMsg("Unable to send your message right now. Please try again.");
      }
      return;
    }

    // ── PATH B: EXISTING NODE.JS BACKEND FALLBACK ──
    if (audioBlob) {
      const payloadMessage =
        formData.message.trim() || `[Voice Note Recorded — ${formatTime(recordingTime)}]`;

      const ext = getExtensionFromMimeType(mimeType || audioBlob.type);
      const bodyFormData = new FormData();
      bodyFormData.append("name", formData.name.trim());
      bodyFormData.append("email", formData.email.trim());
      bodyFormData.append("message", payloadMessage);
      bodyFormData.append("voice", audioBlob, `voice-message.${ext}`);

      try {
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: "POST",
          body: bodyFormData,
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          setStatus("SUCCESS");
          setShowSuccessModal(true);
          setFormData({ name: "", email: "", message: "" });
          deleteRecording();
        } else {
          setStatus("ERROR");
          let errMessage = "Unable to send the voice message right now. Please try again.";
          if (response.status === 413 || (data.message && data.message.includes("large"))) {
            errMessage = "Voice recording is too large.";
          } else if (response.status === 400 && data.message) {
            errMessage = data.message;
          }
          setFeedbackMsg(errMessage);
        }
      } catch (err) {
        console.error("[Voice Upload Network/Server Error]:", err);
        setStatus("ERROR");
        setFeedbackMsg("Unable to send the voice message right now. Please try again.");
      }
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus("SUCCESS");
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("ERROR");
        setFeedbackMsg(
          data.message || "Unable to send your message right now. Please try again."
        );
      }
    } catch (err) {
      console.error("[Text Form Error]:", err);
      setStatus("ERROR");
      setFeedbackMsg("Unable to send your message right now. Please try again.");
    }
  };

  return (
    <motion.div
      className="contact-form"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 24 }}
    >
      <form onSubmit={handleSend} noValidate style={{ width: "100%" }}>
        {/* ── Name + Email ── */}
        <div className="contact-inputs">
          {/* Name */}
          <motion.div
            className={`input-box ${focused === "name" ? "input-focused" : ""}`}
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              aria-label="Your name"
              disabled={status === "SENDING"}
            />
          </motion.div>

          {/* Email */}
          <motion.div
            className={`input-box ${focused === "email" ? "input-focused" : ""}`}
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              aria-label="Your email"
              disabled={status === "SENDING"}
            />
          </motion.div>
        </div>

        {/* ── SINGLE COMPOSER CONTAINER (Transforms between 1. TEXT, 2. RECORDING, 3. VOICE PREVIEW) ── */}
        <motion.div
          className={`message-box ${focused === "msg" ? "input-focused" : ""}`}
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ marginTop: "14px" }}
        >
          {/* 1. TEXT MODE (IDLE) */}
          {recordingState === "IDLE" ? (
            <textarea
              name="message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused("msg")}
              onBlur={() => setFocused(null)}
              aria-label="Your message"
              disabled={status === "SENDING"}
            />
          ) : recordingState === "RECORDING" ? (
            /* 2. RECORDING MODE */
            <div className="voice-composer-container">
              {/* Red Circle Indicator */}
              <div className="recording-indicator-circle">
                <span className="recording-dot-pulse" />
              </div>

              {/* Animated Waveform */}
              <div className="waveform-section">
                <div className="waveform-bars">
                  {WAVEFORM_BARS.map((height, idx) => (
                    <div
                      key={idx}
                      className="wave-bar-item live-anim"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${(idx % 6) * 0.12}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Dotted Vertical Separator Line */}
              <div className="divider-line" />

              {/* Monospace Timer */}
              <span className="voice-timer-display">{formatTime(recordingTime)}</span>
            </div>
          ) : (
            /* 3. VOICE PREVIEW MODE */
            <div className="voice-composer-container">
              {/* Play / Pause Button */}
              <button
                type="button"
                className="preview-play-btn"
                onClick={togglePlayPause}
                title={isPlaying ? "Pause" : "Play preview"}
              >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} style={{ marginLeft: 2 }} />}
              </button>

              {/* Waveform + Playback Progress Line */}
              <div className="waveform-section">
                <div className="waveform-bars">
                  {WAVEFORM_BARS.map((height, idx) => {
                    const barProgress = (idx / WAVEFORM_BARS.length) * 100;
                    const isPassed = playbackProgress >= barProgress;
                    return (
                      <div
                        key={idx}
                        className="wave-bar-item"
                        style={{
                          height: `${height}%`,
                          opacity: isPassed ? 1 : 0.45,
                          boxShadow: isPassed
                            ? "0 0 8px rgba(255, 179, 102, 0.8)"
                            : "none"
                        }}
                      />
                    );
                  })}
                </div>

                {/* Playback Progress Line */}
                <div className="playback-progress-track">
                  <div
                    className="playback-progress-fill"
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>
              </div>

              {/* Dotted Vertical Separator Line */}
              <div className="divider-line" />

              {/* Monospace Timer */}
              <span className="voice-timer-display">{formatTime(recordingTime)}</span>
            </div>
          )}

          {/* Composer Action Buttons (Right Aligned inside container) */}
          <div className="msg-actions">
            {recordingState === "IDLE" ? (
              <>
                {/* Microphone Button */}
                <motion.button
                  type="button"
                  className="btn-leather"
                  onClick={startRecording}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Record voice message"
                  title="Click to record"
                >
                  <FaMicrophone size={18} />
                </motion.button>

                {/* Send Button */}
                <motion.button
                  type="submit"
                  className="btn-amber"
                  disabled={status === "SENDING"}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send message"
                  title="Send message"
                >
                  <AnimatePresence mode="wait">
                    {status === "SENDING" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="send-confirm"
                        style={{ display: "inline-flex" }}
                      >
                        <ImSpinner8 size={18} />
                      </motion.span>
                    ) : status === "SUCCESS" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="send-confirm"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FaChevronRight size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            ) : recordingState === "RECORDING" ? (
              <>
                {/* Delete / Cancel Button */}
                <motion.button
                  type="button"
                  className="btn-danger"
                  onClick={deleteRecording}
                  whileTap={{ scale: 0.92 }}
                  title="Delete recording"
                >
                  <FaTrashAlt size={16} />
                </motion.button>

                {/* Stop Recording Button */}
                <motion.button
                  type="button"
                  className="btn-amber"
                  onClick={stopRecording}
                  whileTap={{ scale: 0.92 }}
                  title="Stop recording"
                >
                  <FaSquare size={16} />
                </motion.button>
              </>
            ) : (
              <>
                {/* Re-record Button */}
                <motion.button
                  type="button"
                  className="btn-leather"
                  onClick={startRecording}
                  whileTap={{ scale: 0.92 }}
                  title="Re-record"
                >
                  <FaMicrophone size={18} />
                </motion.button>

                {/* Delete Button */}
                <motion.button
                  type="button"
                  className="btn-danger"
                  onClick={deleteRecording}
                  whileTap={{ scale: 0.92 }}
                  title="Delete recording"
                >
                  <FaTrashAlt size={16} />
                </motion.button>

                {/* Send Button */}
                <motion.button
                  type="submit"
                  className="btn-amber"
                  disabled={status === "SENDING"}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send message"
                  title="Send message"
                >
                  <AnimatePresence mode="wait">
                    {status === "SENDING" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="send-confirm"
                        style={{ display: "inline-flex" }}
                      >
                        <ImSpinner8 size={18} />
                      </motion.span>
                    ) : status === "SUCCESS" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="send-confirm"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FaChevronRight size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        {/* ── Status Feedback Banner (For error messages) ── */}
        <AnimatePresence>
          {feedbackMsg && status === "ERROR" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="form-feedback feedback-error"
            >
              {feedbackMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* ── RETRO SUCCESS CONFIRMATION DIALOG MODAL ── */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              className="success-modal-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-check-icon">✓</div>
              <h3 className="modal-title">Thank you for reaching out!</h3>
              <p className="modal-subtitle">
                I’ve received your message and will get back to you soon with a personalized response.
              </p>
              <p className="modal-note">Hope you like my work. ❤️</p>
              <button
                type="button"
                className="modal-done-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
