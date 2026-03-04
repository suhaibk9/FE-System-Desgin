"use client";

import React, { useState, useEffect } from "react";

// In the App Router, client components (CSR) must explicitly declare 'use client'
// at the very top of the file so Next.js ships the JS bundle for it.
export default function CSRAppRouterPage() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from our json-server
    fetch("http://localhost:4000/TUTORIALS")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setTutorials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ padding: "2rem" }}>Loading tutorials (Client-Side)...</div>
    );
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        App Router: Client-Side Rendering (CSR)
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={tutorial.image}
              alt={tutorial.title}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                {tutorial.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                <span>👁️ {tutorial.views}</span>
                <span>📅 {tutorial.published}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
