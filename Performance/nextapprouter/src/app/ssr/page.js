import React from "react";

// In Next.js App Router, components are SERVER COMPONENTS by default.
// We can use async/await directly inside the component body,
// replacing the old `getServerSideProps`.

// To force SSR (Server-Side Rendering) on EVERY request,
// we set dynamic rendering.
export const dynamic = "force-dynamic";

export default async function SSRAppRouterPage() {
  let tutorials = [];
  let error = null;

  try {
    // With `force-dynamic`, this runs on every single incoming HTTP request
    const res = await fetch("http://localhost:4000/TUTORIALS", {
      cache: "no-store",
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
      <div style={{ padding: "2rem", color: "red" }}>Server Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: "#eef2f3",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        App Router: Server-Side Rendered (SSR)
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
              border: "2px solid #3498db",
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
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  color: "#2c3e50",
                }}
              >
                {tutorial.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#7f8c8d",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
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
