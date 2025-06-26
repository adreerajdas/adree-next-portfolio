"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Theme toggle button
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.body.classList.add(initial);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        background: theme === "dark" ? "#222" : "#fff",
        border: "2px solid #222",
        borderRadius: "50%",
        cursor: "pointer",
        padding: 0,
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: theme === "dark"
          ? "0 2px 8px rgba(0,0,0,0.32)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.2s"
      }}
    >
      {theme === "dark" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      )}
    </button>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const updateTheme = () => {
      const t = document.body.classList.contains("dark") ? "dark" : "light";
      setTheme(t);
    };
    updateTheme();

    window.addEventListener("storage", updateTheme);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", updateTheme);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: theme === "dark" ? "#181818" : "#f8f8f8",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? (theme === "dark" ? "1px solid #333" : "1px solid #ccc") : "none",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
        minHeight: "56px",
        padding: "0 2rem",
        fontFamily: "Space Mono, Kaushan Script, monospace, cursive",
        transition: "all 0.3s ease"
      }}
    >
      <Link href="/">
        <span style={{
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 1,
          color: theme === "dark" ? "#fff" : "#9900ff",
          cursor: "pointer"
        }}>
          Adreeraj Das
        </span>
      </Link>
      <div className="navbar-links" style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link href="/">
          <span style={{ fontSize: 15, fontWeight: 500, color: theme === "dark" ? "#eee" : "#111", transition: "color 0.2s", cursor: "pointer" }}>Home</span>
        </Link>
        <Link href="/about">
          <span style={{ fontSize: 15, fontWeight: 500, color: theme === "dark" ? "#eee" : "#111", transition: "color 0.2s", cursor: "pointer" }}>About</span>
        </Link>
        <Link href="/education">
          <span style={{ fontSize: 15, fontWeight: 500, color: theme === "dark" ? "#eee" : "#111", transition: "color 0.2s", cursor: "pointer" }}>Education</span>
        </Link>
        <Link href="/projects">
          <span style={{ fontSize: 15, fontWeight: 500, color: theme === "dark" ? "#eee" : "#111", transition: "color 0.2s", cursor: "pointer" }}>Projects</span>
        </Link>
        <Link href="/contact">
          <span style={{ fontSize: 15, fontWeight: 500, color: theme === "dark" ? "#eee" : "#111", transition: "color 0.2s", cursor: "pointer" }}>Contact</span>
        </Link>
        <ThemeToggle />
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .navbar-links {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

// Main Education Page
export default function EducationPage() {
  return (
    <div className="education-page">
      <Navbar />
      <main className="content">
        <h1>Education</h1>

        <section className="education-block">
          <h2>Higher Secondary (HS)</h2>
          <p><strong>School:</strong> PEARL ROSARY SCHOOL</p>
          <p><strong>Completed:</strong> 2023</p>
          <p><strong>Stream:</strong> Science</p>
        </section>

        <section className="education-block">
          <h2>Engineering in Computer Science & Technology</h2>
          <p><strong>College:</strong> TPI</p>
          <p><strong>Duration:</strong> 2023 - 2025</p>
          <p><strong>Status:</strong> In 3rd Year</p>
          <p><strong>GPA:</strong> 8.3</p>
        </section>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');

        body {
          transition: background 0.3s, color 0.3s;
        }

        body.dark {
          background: #000;
          color: white;
        }

        body.light {
          background: #fff;
          color: #111;
        }

        .education-page {
          font-family: 'Space Mono', monospace;
          padding-top: 100px;
          padding-left: 24px;
          padding-right: 24px;
          min-height: 100vh;
        }

        .content {
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .education-block {
          padding: 20px;
          margin-bottom: 24px;
          border-radius: 12px;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        body.dark .education-block {
          background-color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
        }

        body.light .education-block {
          background-color: #f9f9f9;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        p {
          margin: 4px 0;
        }

        @media (max-width: 768px) {
          .education-page {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>
    </div>
  );
}
