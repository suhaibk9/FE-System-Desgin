import React, { useState, useEffect, useRef } from "react";
import "./LevelA.css";

// Level A: The Bare Minimum (The "Do Not Cross" Line)
const LevelA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeButtonRef = useRef(null);

  // Keyboard trap prevention: allow Escape to close the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Manage focus when modal opens
  useEffect(() => {
    if (isModalOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <div className="level-a-container">
      <h1>Level A: The Bare Minimum</h1>

      <section>
        <h2>Alt Text Requirement</h2>
        {/* Meaningful image requires detailed alt text */}
        <div className="img-wrapper">
          <p>Meaningful Image:</p>
          <img
            src="https://via.placeholder.com/400x200?text=Important+Graph"
            alt="A bar graph showing sales doubling from Q1 to Q2"
          />
        </div>

        {/* Decorative image requires empty alt attribute so screen readers skip it */}
        <div className="img-wrapper">
          <p>Decorative Image:</p>
          <img
            src="https://via.placeholder.com/100x20?text=~~~"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section>
        <h2>Keyboard Accessibility & No Keyboard Traps</h2>
        {/* Button can be focused with Tab and activated with Enter/Space natively */}
        <button onClick={() => setIsModalOpen(true)}>
          Open Important Modal
        </button>
      </section>

      {/* No Keyboard Traps: Provide a clear way to exit (Esc key / Close Button) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title">Important Information</h2>
            <p>
              You can exit this modal by pressing the Escape key, or by using
              the Tab key to focus the close button and pressing Enter.
            </p>
            <button ref={closeButtonRef} onClick={() => setIsModalOpen(false)}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelA;
