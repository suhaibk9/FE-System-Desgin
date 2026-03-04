import React from "react";

// This function runs exclusively at BUILD TIME, creating a static HTML file
export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:4000/TUTORIALS");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // The props returned here will be baked into the HTML page at build time
    return {
      props: {
        tutorials: data,
        error: null,
      },
      // Optional: Incremental Static Regeneration (ISR)
      // Re-generate the page at most once every 60 seconds if a new request comes in
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        tutorials: [],
        error: err.message,
      },
      // Retry more quickly if there's an error during build/ISR
      revalidate: 10,
    };
  }
}

export default function SSGPage({ tutorials, error }) {
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
          Latest Tutorials (Static Site Generation)
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
