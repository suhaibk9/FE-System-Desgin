import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LevelA from "./Level-A/LevelA";
import LevelAA from "./Level-AA/LevelAA";
import LevelAAA from "./Level-AAA/LevelAAA";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>WCAG Accessibility Guidelines Demo</h1>
          <nav className="nav-links">
            <Link to="/A" className="nav-link">
              Level A
            </Link>
            <Link to="/AA" className="nav-link">
              Level AA
            </Link>
            <Link to="/AAA" className="nav-link">
              Level AAA
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            {/* Redirect home page to /A by default */}
            <Route path="/" element={<Navigate to="/A" />} />

            {/* Respective Routes */}
            <Route path="/A" element={<LevelA />} />
            <Route path="/AA" element={<LevelAA />} />
            <Route path="/AAA" element={<LevelAAA />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
