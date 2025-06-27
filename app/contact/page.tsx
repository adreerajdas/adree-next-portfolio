"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      )}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  // Centralized theme toggle function
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    // Handle scroll effect
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    
    // Theme initialization
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

    // Theme change listeners
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
      <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: theme === 'dark' ? '#fff' : '#9900ff', fontFamily: 'Space Mono, monospace' }}>
        Adreeraj Das
      </span>
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme === 'dark' ? '#fff' : '#222'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
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
          zIndex: 1300
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

export default function ContactPage() {
  const [theme, setTheme] = useState('light');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Sync theme with Navbar
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpwrovyw', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget)
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const formBg = theme === 'dark' ? 'rgba(20,20,20,0.92)' : 'rgba(255,255,255,0.92)';
  const inputBg = theme === 'dark' ? '#222' : '#f5f5f5';
  const textColor = theme === 'dark' ? '#fff' : '#222';

  return (
    <>
      <Navbar />
      <div className="contact-responsive-container" style={{ display: 'flex', minHeight: '100vh', background: theme === 'dark' ? '#111' : '#f9f9f9' }}>
        <div className="contact-image-col" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
          <img src="/images/contact-photo.jpg" alt="Contact" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.25)' }} />
        </div>
        <div className="contact-form-col" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
          {status === 'success' ? (
            <div style={{ width: '100%', maxWidth: 420, background: formBg, padding: 32, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', textAlign: 'center' }}>
              <h2 style={{ color: textColor, fontFamily: 'Space Mono, monospace', marginBottom: 24 }}>Thank you!</h2>
              <p style={{ color: textColor, fontSize: 18 }}>Your message has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, background: formBg, padding: 32, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', transition: 'background 0.3s' }}>
              <h2 style={{ color: textColor, fontFamily: 'Space Mono, monospace', marginBottom: 24, transition: 'color 0.3s' }}>Contact</h2>
              <input 
                type="text" 
                name="name"
                placeholder="Your Full Name" 
                value={form.name}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  marginBottom: 16, 
                  padding: 12, 
                  borderRadius: 8, 
                  border: 'none', 
                  background: inputBg, 
                  color: textColor, 
                  fontSize: 16,
                  transition: 'background 0.3s, color 0.3s'
                }} 
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                value={form.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  marginBottom: 16, 
                  padding: 12, 
                  borderRadius: 8, 
                  border: 'none', 
                  background: inputBg, 
                  color: textColor, 
                  fontSize: 16,
                  transition: 'background 0.3s, color 0.3s'
                }} 
                required
              />
              <textarea 
                name="message"
                placeholder="Say something about us" 
                rows={5} 
                value={form.message}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  marginBottom: 16, 
                  padding: 12, 
                  borderRadius: 8, 
                  border: 'none', 
                  background: inputBg, 
                  color: textColor, 
                  fontSize: 16, 
                  resize: 'vertical',
                  transition: 'background 0.3s, color 0.3s'
                }} 
                required
              />
              <button 
                type="submit" 
                style={{ 
                  width: '100%', 
                  padding: 12, 
                  borderRadius: 8, 
                  border: 'none', 
                  background: 'linear-gradient(90deg, #9900ff 0%, #5f2eea 100%)', 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: 18, 
                  letterSpacing: 1, 
                  boxShadow: '0 2px 8px rgba(153,0,255,0.18)', 
                  transition: 'background 0.2s, transform 0.2s',
                  cursor: 'pointer'
                }}
                disabled={status === 'sending'}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'
                }
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {/* Review Website Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLg_d8-IUvTkWJ4L4pMRaIoM-HuNsAelBnkQzll8Go_vDKBw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  margin: '16px auto 0 auto',
                  padding: '6px 18px',
                  borderRadius: 5,
                  background: 'linear-gradient(90deg, #5f2eea 0%, #9900ff 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: 0.5,
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(95,46,234,0.13)',
                  transition: 'background 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  minWidth: 90,
                  maxWidth: 180
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'
                }
              >
                Review Website
              </a>
              {status === 'error' && <p style={{ color: 'red', marginTop: 12 }}>Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      <style jsx>{`
        .contact-responsive-container {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
        }
        .contact-image-col, .contact-form-col {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        @media (max-width: 900px) {
          .contact-responsive-container {
            flex-direction: column;
            padding: 0 8px;
          }
          .contact-image-col, .contact-form-col {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .contact-image-col {
            margin-bottom: 24px;
            justify-content: center;
          }
          .contact-form-col {
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .contact-responsive-container {
            padding: 0 2px;
          }
          .contact-form-col form, .contact-form-col > div {
            padding: 16px !important;
            max-width: 100vw !important;
          }
          .contact-form-col h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}