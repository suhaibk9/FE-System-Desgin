import React from "react";

// In Next.js App Router, components are SERVER COMPONENTS by default.
// To use SSG (Static Site Generation), we use standard fetch without 'no-store'
// and optionally provide a `revalidate` time for Incremental Static Regeneration (ISR).

export default async function SSGAppRouterPage() {
  let tutorials = [];
  let error = null;

  try {
    // This fetch runs at BUILD TIME by default in the App Router.
    // { next: { revalidate: 60 } } enables ISR, re-baking the static page every 60s
    const res = await fetch("http://localhost:4000/TUTORIALS", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    tutorials = await res.json();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>Build Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: "#fcf8f2",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem", color: "#d35400" }}>
          App Router: Static Site Generated (SSG)
        </h1>
        <p style={{ color: "#7f8c8d" }}>
          This page was generated as a static HTML file at build time.
        </p>
      </div>

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
              border: "1px solid #e0e0e0",
              borderTop: "4px solid #e67e22",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={tutorial.image}
              alt={tutorial.title}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                {tutorial.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#95a5a6",
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
