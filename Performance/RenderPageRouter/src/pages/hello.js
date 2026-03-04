import React from "react";

export default function Hello() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello from the new page! 👋</h1>
      <p>
        This is the React page component for <code>/hello</code>.
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <h3>API Info</h3>
        <p>
          Your API route is available at another URL:{" "}
          <a href="/api/hello" style={{ color: "blue" }}>
            /api/hello
          </a>
        </p>
      </div>
    </div>
  );
}
