import React, { useState, useEffect } from "react";
import "./LevelAAA.css";

// Level AAA: The Gold Standard (The Extreme)
// Includes all Level A and AA rules, plus Extreme Contrast (7:1), Sign Language, No Timers (or pausable).

const LevelAAA = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  // No Timers: The user must be given unlimited time or a way to easily pause/extend the timer.
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  return (
    <div className="level-aaa-container">
      <h1>Level AAA: The Gold Standard</h1>

      <section className="extreme-contrast-section">
        <h2>Extreme Contrast (Minimum 7:1)</h2>
        <p>
          This text uses pure black (#000000) on pure white (#FFFFFF), providing
          the maximum possible contrast ratio (21.4:1), which easily passes the
          strict 7:1 Level AAA requirement for text.
        </p>
      </section>

      <section>
        <h2>Sign Language Interpretation</h2>
        {/* Sign Language: All pre-recorded videos must have a sign language interpreter */}
        <div className="video-player-simulation">
          <div className="main-video" aria-label="Main video presentation">
            <p className="main-text">Main Presentation Content</p>
          </div>
          {/* Sign Language Interpreter Video clearly visible in the corner */}
          <div
            className="interpreter-video"
            aria-label="Sign language interpreter"
          >
            <p className="asl-text">[ASL Interpreter]</p>
          </div>
        </div>
        <p className="caption-text">
          Captions: "Welcome to our universally accessible application."
        </p>
      </section>

      <section>
        <h2>No Timers (Pausable & Extendable)</h2>
        <div className="timer-container" aria-live="polite">
          <p>
            Time remaining on this page:{" "}
            <strong className="time-display">{timeLeft} seconds</strong>
          </p>

          <div className="timer-controls">
            <button
              onClick={() => setTimerActive(!timerActive)}
              aria-pressed={!timerActive}
            >
              {timerActive ? "Pause Timer" : "Resume Timer"}
            </button>
            <button onClick={() => setTimeLeft((prev) => prev + 60)}>
              Extend Time (+60s)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LevelAAA;
