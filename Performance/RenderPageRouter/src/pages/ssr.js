import React from "react";

// This function runs exclusively on the SERVER before the page is sent to the client
export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:4000/TUTORIALS");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // The props returned here are passed directly to the SSRPage component
    return {
      props: {
        tutorials: data,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        tutorials: [],
        error: err.message,
      },
    };
  }
}

export default function SSRPage({ tutorials, error }) {
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
        Latest Tutorials (Server-Side Rendered)
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
