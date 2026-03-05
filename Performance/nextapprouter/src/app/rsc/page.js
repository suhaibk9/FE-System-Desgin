import React from "react";

// In the Next.js App Router, all components are React Server Components (RSCs) by default!
// You don't need any special directives or 'getServerSideProps' / 'getStaticProps'.
// You can simply use async/await directly inside the component body.

export default async function RSCPage() {
  let tutorials = [];
  let error = null;

  try {
    // This is a standard fetch inside a Server Component.
    // By default, Next.js caches this fetch (similar to SSG).
    const res = await fetch("http://localhost:4000/TUTORIALS");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    tutorials = await res.json();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>Server Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}
      >
        App Router: React Server Component (RSC)
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#555",
          maxWidth: "800px",
          margin: "0 auto 2rem",
        }}
      >
        This page uses the default Next.js 13+ behavior. It is a true React
        Server Component. It fetches data directly on the server without
        shipping any of this code or state to the client bundle!
      </p>

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
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.2s",
              ":hover": { transform: "translateY(-5px)" },
            }}
          >
            <img
              src={tutorial.image}
              alt={tutorial.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "1.25rem",
                  color: "#1a202c",
                  lineHeight: "1.4",
                }}
              >
                {tutorial.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#718096",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  👁️ {tutorial.views}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  📅 {tutorial.published}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
