"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

function ThemeToggle({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
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
        boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.32)" : "0 2px 8px rgba(0,0,0,0.08)",
        transition: "background 0.2s, border 0.2s, box-shadow 0.2s"
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = theme === "dark" ? "0 2px 8px rgba(0,0,0,0.32)" : "0 2px 8px rgba(0,0,0,0.08)")}
    >
      {theme === "dark" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
      )}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(initialTheme);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue || "light";
        setTheme(newTheme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
      }
    };
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
      }
    };

    window.addEventListener('storage', onStorage);
    mediaQuery.addEventListener('change', onSystemThemeChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('storage', onStorage);
      mediaQuery.removeEventListener('change', onSystemThemeChange);
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const background = scrolled
    ? (theme === 'dark' ? 'rgba(20,20,20,0.7)' : 'rgba(255,255,255,0.7)')
    : (theme === 'dark' ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.95)');

  return (
    <nav
      className={`custom-navbar${scrolled ? ' scrolled' : ''}${theme === 'dark' ? ' dark' : ''}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background,
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? (theme === 'dark' ? '1px solid #222' : '1px solid #eee') : "none",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 2rem",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.10)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, border-bottom 0.3s"
      }}
    >
      <Link href="/">
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: theme === 'dark' ? '#fff' : '#9900ff', cursor: 'pointer' }}>
          Adreeraj Das
        </span>
      </Link>
      <button
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(m => !m)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginLeft: 16,
          zIndex: 1300
        }}
        className="navbar-burger"
        tabIndex={0}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme === 'dark' ? '#fff' : '#222'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div
        className="navbar-links"
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <Link href="/"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Home</span></Link>
        <Link href="/about"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>About</span></Link>
        <Link href="/education"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Education</span></Link>
        <Link href="/projects"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Projects</span></Link>
        <Link href="/contact"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Contact</span></Link>
        <span><ThemeToggle theme={theme} toggleTheme={toggleTheme} /></span>
      </div>
      <div
        className="navbar-mobile"
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'absolute',
          top: 60,
          right: 0,
          background: theme === 'dark' ? 'rgba(20,20,20,0.98)' : 'rgba(255,255,255,0.98)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderRadius: '0 0 0 16px',
          width: 200,
          padding: '16px 0',
          zIndex: 1300,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)'
        }}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Link href="/"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Home</span></Link>
          <Link href="/about"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>About</span></Link>
          <Link href="/education"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Education</span></Link>
          <Link href="/projects"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Projects</span></Link>
          <Link href="/contact"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Contact</span></Link>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '12px 24px 0 24px' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .navbar-links {
            display: none !important;
          }
          .navbar-burger {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .navbar-mobile {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default function EducationPage() {
  const [, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(initialTheme);
    }
  }, []);

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
          margin: 0;
          padding: 0;
          font-family: 'Space Mono', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        body.dark {
          background: #000;
          color: white;
        }

        body.light {
          background: #fff;
          color: #111;
        }
        
        * {
          box-sizing: border-box;
        }
        
        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: 700;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
        
        /* Responsive font scaling */
        html {
          font-size: 16px;
        }
        @media (max-width: 1200px) {
          html {
            font-size: 15px;
          }
        }
        @media (max-width: 900px) {
          html {
            font-size: 14px;
          }
        }
        @media (max-width: 600px) {
          html {
            font-size: 13px;
          }
        }
      `}</style>

      <style jsx>{`
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

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        p {
          margin: 8px 0;
        }

        @media (max-width: 1024px) {
          .education-page {
            padding-top: 80px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .content {
            padding-top: 20px;
          }
        }

        @media (max-width: 600px) {
          .education-page {
            padding-top: 60px;
            padding-left: 8px;
            padding-right: 8px;
          }
          .content {
            padding-top: 10px;
          }
          h1 {
            font-size: 1.3rem;
            margin-bottom: 1.2rem;
          }
          h2 {
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
          }
          .education-block {
            padding: 10px;
          }
        }
        
        @media (max-width: 400px) {
          .education-page {
            padding-left: 2px;
            padding-right: 2px;
          }
          .education-block {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
}