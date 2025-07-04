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

export default function AboutPage() {
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
          flex-wrap: wrap;
        }

        .social-links a {
          color: inherit;
          transition: transform 0.2s;
        }

        .social-links a:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .about-page {
            padding-top: 80px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .content {
            padding-top: 20px;
          }
          .about-grid {
            gap: 1.2rem;
          }
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .info-section, .bio-section {
            padding: 18px;
          }
        }

        @media (max-width: 600px) {
          .about-page {
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
            margin-bottom: 1rem;
          }
          h3 {
            font-size: 1rem;
            margin-bottom: 0.7rem;
          }
          .info-section, .bio-section {
            padding: 10px;
          }
          .about-grid {
            gap: 1rem;
          }
          .social-links {
            gap: 10px;
            margin-top: 16px;
          }
        }
        
        @media (max-width: 400px) {
          .about-page {
            padding-left: 2px;
            padding-right: 2px;
          }
          .info-section, .bio-section {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
}