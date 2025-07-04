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

export default function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />
      <main className="content">
        <h1>About Me</h1>

        <div className="about-grid">
          <div className="info-section">
            <div className="info-block">
              <h3>Personal Info</h3>
              <p><strong>Name:</strong> Adreeraj Das</p>
              <p><strong>Email:</strong> dasadreeraj@gmail.com</p>
              <p><strong>Website:</strong> adreerajdas</p>
              <p><strong>Address:</strong> West Bengal, KOLKATA</p>
            </div>
          </div>

          <div className="bio-section">
            <h2>Hello There!</h2>
            <p>I&apos;m a Full Stack Developer with a passion for building responsive websites and applications that offer seamless functionality and user experience. I specialize in UI/UX design and professional video editing, combining creativity with technical skills to craft meaningful digital solutions.</p>
            
            <p>Currently pursuing a Diploma in Computer Science & Technology at Technique Polytechnic Institute, I maintain a GPA of 8.3 and consistently explore new technologies through hands-on projects.</p>
            
            <p>I have also worked on IoT-based projects, focusing on practical, real-world applications in areas like safety and automation.</p>
            
            <p>As the Design Lead and Admin of InnovateX, a tech community of 500+ developers, I lead creative initiatives and mentor aspiring technologists.</p>

            <div className="social-links">
              <Link href="https://www.instagram.com/addreeraj/" target="_blank">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="https://github.com/adreerajdas" target="_blank">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1 .07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .269.18.58.688.482C19.135 20.163 22 16.417 22 12c0-5.523-4.477-10-10-10Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/adreerajdas" target="_blank">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
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
      `}</style>

      <style jsx>{`
        .about-page {
          font-family: 'Space Mono', monospace;
          padding-top: 100px;
          padding-left: 24px;
          padding-right: 24px;
          min-height: 100vh;
        }

        .content {
          max-width: 1000px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }

        .info-section, .bio-section {
          padding: 20px;
          border-radius: 12px;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        body.dark .info-section,
        body.dark .bio-section {
          background-color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
        }

        body.light .info-section,
        body.light .bio-section {
          background-color: #f9f9f9;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .info-block p {
          margin: 8px 0;
        }

        .bio-section p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }

        .social-links a {
          color: inherit;
          transition: transform 0.2s;
        }

        .social-links a:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .about-page {
            padding-left: 16px;
            padding-right: 16px;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}