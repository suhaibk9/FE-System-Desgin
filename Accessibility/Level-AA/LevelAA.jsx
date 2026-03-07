import React, { useState } from "react";
import "./LevelAA.css";

// Level AA: The Industry Standard (The Legal Target)
// Includes all Level A rules, plus Color Contrast, Visible Focus, Zooming, Error Suggestions.

const LevelAA = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      // Error Suggestions: Provide clear text explaining how to fix the error.
      setError(
        'Please include an "@" symbol in the email address. Example: user@example.com',
      );
    } else {
      setError("");
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="level-aa-container">
      <h1>Level AA: The Industry Standard</h1>

      <section>
        <h2>Color Contrast (Minimum 4.5:1)</h2>
        {/* Valid contrast: #333333 on #FFFFFF is ~9.5:1 (well above 4.5:1) */}
        <div className="valid-contrast-box">
          This text has a high enough contrast ratio against its background.
          Light gray text on a white background is illegal here.
        </div>
      </section>

      <section>
        <h2>Visible Focus & Error Suggestions</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email-input">Email Address</label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "email-error" : undefined}
              className={error ? "input-error" : ""}
            />
            {error && (
              // Error suggestion text visible to screen readers and sighted users
              <div id="email-error" className="error-text" role="alert">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Button must have visible focus in CSS */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </section>

      <section className="zooming-section">
        <h2>Zooming (Supports 200% scaling)</h2>
        <p>
          This layout is built with flexible units (like percentages and rem)
          and robust layout techniques like flexbox, so if a user zooms their
          browser in to 200%, the text will wrap and align properly without
          breaking the UI or hiding text.
        </p>
      </section>
    </div>
  );
};

export default LevelAA;
