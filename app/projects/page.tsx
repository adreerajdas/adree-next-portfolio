"use client";

import { useState, useEffect, useCallback } from "react";
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
      <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: theme === 'dark' ? '#fff' : '#9900ff' }}>
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

export default function ProjectsPage() {
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Simulate loading content
    setTimeout(() => setIsLoading(false), 800);
    
    return () => observer.disconnect();
  }, []);

  // Project data from your main page
  const projects = [
    {
      id: 1,
      title: "SecureStorage",
      description: "A web-based password manager for my Software Engineering minor project. Features secure user registration/login, encrypted password storage with notes, Java-based encryption, and a clean, modern UI.",
      image: "/images/portfolio-2.jpg",
      category: "web",
      date: "Mar 2025 - Apr 2025",
      link: "#",
      technologies: ["Java", "Python", "HTML", "React.js", "JavaScript", "CSS", "MySQL"]
    },
    {
      id: 2,
      title: "Writing Wizard",
      description: "A 2D CNC writing machine for text and patterns on various materials. Features a 100mm x 150mm work area, smooth X-Y movement, and Universal G-code Sender support. Compatible with Arduino IDE, Inkscape, and UGS. Great for education and DIY.",
      image: "/images/portfolio-3.jpg",
      category: "hardware",
      date: "Aug 2024 - Sep 2024",
      link: "#",
      technologies: ["Electronics", "C++", "Machine Design", "C", "Machine Learning", "Machining", "Back-End Web Development"]
    },
    {
      id: 7,
      title: "Wireless Notice Board",
      description: "A wireless notice board using ESP32, enabling real-time message updates via Wi-Fi. Developed as a 2nd-year minor project at Technique Polytechnic Institute. Efficient, scalable, and cost-effective for modern communication.",
      image: "/images/wirelessnoticeboard.jpeg",
      category: "hardware",
      date: "Jan 2025 - Mar 2025",
      link: "https://monitorboard.netlify.app/",
      technologies: ["ESP32", "Wi-Fi", "LCD Display", "IoT", "Embedded Systems", "Wireless Communication"]
    },
    {
      id: 8,
      title: "My Own Portfolio",
      description: "Personal portfolio built with Next.js, TypeScript, and advanced CSS/Tailwind. Features modern UI, interactive buttons, and detailed project showcase. Updated June 2025.",
      image: "/images/portfolio.jpg",
      category: "web",
      date: "Aug 2024",
      link: "https://adreerajdas.netlify.app/",
      technologies: ["Next.js", "TypeScript", "CSS", "Tailwind CSS", "HTML", "JavaScript", "Front-End Development", "Back-End Web Development"],
      hideDetails: true
    },
    {
      id: 3,
      title: "QR CODE GENERATOR",
      description: "A web application that generates QR codes for any given text or URL, built with HTML, CSS, and JavaScript.",
      image: "/images/portfolio-4.jpg",
      category: "web",
      date: "2023",
      link: "https://qrgeneratorbyadree.netlify.app/",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 4,
      title: "UI / UX DESIGN",
      description: "Designed user interfaces and experiences for various applications, focusing on usability and aesthetic appeal.",
      image: "/images/portfolio-6.jpg",
      category: "design",
      date: "2023",
      link: "#",
      technologies: ["Figma", "Adobe XD", "Photoshop"]
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const bgColor = theme === 'dark' ? '#111' : '#f9f9f9';
  const textColor = theme === 'dark' ? '#fff' : '#222';
  const cardBg = theme === 'dark' ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const accentColor = theme === 'dark' ? '#5f2eea' : '#9900ff';

  return (
    <>
      <Navbar />
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet" />
      
      <div style={{ 
        minHeight: '100vh', 
        background: bgColor,
        color: textColor,
        paddingTop: '80px',
        paddingBottom: '40px',
        transition: 'background 0.3s, color 0.3s'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{
              fontSize: '2.8rem',
              marginBottom: '1rem',
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              color: accentColor,
              position: 'relative'
            }}>
              My Projects
            </h1>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '40px'
            }}>
              <button 
                onClick={() => setFilter('all')}
                style={{
                  background: filter === 'all' ? accentColor : 'transparent',
                  color: filter === 'all' ? '#fff' : textColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: '20px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 500
                }}
              >
                All Projects
              </button>
              <button 
                onClick={() => setFilter('web')}
                style={{
                  background: filter === 'web' ? accentColor : 'transparent',
                  color: filter === 'web' ? '#fff' : textColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: '20px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 500
                }}
              >
                Web Development
              </button>
              <button 
                onClick={() => setFilter('design')}
                style={{
                  background: filter === 'design' ? accentColor : 'transparent',
                  color: filter === 'design' ? '#fff' : textColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: '20px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 500
                }}
              >
                UI/UX Design
              </button>
              <button 
                onClick={() => setFilter('hardware')}
                style={{
                  background: filter === 'hardware' ? accentColor : 'transparent',
                  color: filter === 'hardware' ? '#fff' : textColor,
                  border: `1px solid ${accentColor}`,
                  borderRadius: '20px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 500
                }}
              >
                Hardware
              </button>
            </div>
          </div>

          <div className="projects-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '30px'
          }}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: theme === 'dark' 
                    ? '0 8px 32px rgba(0,0,0,0.2)' 
                    : '0 8px 32px rgba(0,0,0,0.1)',
                  border: `1px solid ${borderColor}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  transform: 'translateY(0)',
                  opacity: isLoading ? 0 : 1,
                  animation: isLoading ? 'none' : `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = theme === 'dark' 
                    ? '0 12px 40px rgba(0,0,0,0.3)' 
                    : '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme === 'dark' 
                    ? '0 8px 32px rgba(0,0,0,0.2)' 
                    : '0 8px 32px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.5s'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: accentColor,
                    color: '#fff',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {project.date}
                  </div>
                </div>
                
                <div style={{ padding: '25px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      margin: 0,
                      color: textColor
                    }}>
                      {project.title}
                    </h2>
                    <span style={{
                      background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                      color: accentColor,
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      textTransform: 'uppercase'
                    }}>
                      {project.category}
                    </span>
                  </div>
                  
                  <p style={{ 
                    marginBottom: '20px', 
                    lineHeight: 1.6,
                    color: theme === 'dark' ? '#ccc' : '#555'
                  }}>
                    {project.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        style={{
                          background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                          color: accentColor,
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 500
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {project.id === 1 ? (
                      // Only for the first project: remove View Project, update View Details link
                      <a 
                        href="https://www.linkedin.com/in/adreerajdas/details/projects/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: textColor,
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px',
                          padding: '10px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                        }}
                      >
                        View Details
                      </a>
                    ) : project.id === 3 ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          background: 'transparent',
                          color: accentColor,
                          border: `1px solid ${accentColor}`,
                          borderRadius: '8px',
                          padding: '10px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = accentColor;
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = accentColor;
                        }}
                      >
                        View Project
                      </a>
                    ) : project.id === 7 ? (
                      <>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            background: 'transparent',
                            color: accentColor,
                            border: `1px solid ${accentColor}`,
                            borderRadius: '8px',
                            padding: '10px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = accentColor;
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = accentColor;
                          }}
                        >
                          View Project
                        </a>
                        <a 
                          href="https://www.linkedin.com/in/adreerajdas/details/projects/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            color: textColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '8px',
                            padding: '10px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                          }}
                        >
                          View Details
                        </a>
                      </>
                    ) : project.id === 8 ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          background: 'transparent',
                          color: accentColor,
                          border: `1px solid ${accentColor}`,
                          borderRadius: '8px',
                          padding: '10px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = accentColor;
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = accentColor;
                        }}
                      >
                        View Project
                      </a>
                    ) : index === 1 ? (
                      // For Writing Wizard: remove View Project, update View Details link
                      <a 
                        href="https://www.linkedin.com/in/adreerajdas/details/projects/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: textColor,
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px',
                          padding: '10px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                        }}
                      >
                        View Details
                      </a>
                    ) : (
                      <>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            background: 'transparent',
                            color: accentColor,
                            border: `1px solid ${accentColor}`,
                            borderRadius: '8px',
                            padding: '10px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = accentColor;
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = accentColor;
                          }}
                        >
                          View Project
                        </a>
                        <a 
                          href="#" 
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            color: textColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '8px',
                            padding: '10px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                          }}
                        >
                          View Details
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Work Experience Section */}
          <div style={{ 
            marginTop: '80px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.3rem',
              marginBottom: '1.5rem',
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              color: accentColor,
              position: 'relative'
            }}>
              Work Experience
            </h2>
            
            <div className="workexp-flex" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              justifyContent: 'center',
              alignItems: 'stretch',
              maxWidth: '1440px',
              margin: '0 auto',
            }}>
              {/* InnovateX */}
              <div className="workexp-card" style={{
                flex: '1 1 350px',
                background: cardBg,
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: theme === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.2)' 
                  : '0 8px 32px rgba(0,0,0,0.1)',
                border: `1px solid ${borderColor}`,
                padding: '30px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                transform: 'translateY(0)',
                opacity: isLoading ? 0 : 1,
                animation: isLoading ? 'none' : 'fadeIn 0.6s ease-out forwards',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 12px 40px rgba(0,0,0,0.3)' 
                  : '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.2)' 
                  : '0 8px 32px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div style={{ textAlign: 'left', position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ 
                      fontSize: '1.5rem',
                      margin: 0,
                      marginBottom: '8px',
                      color: textColor
                    }}>
                      InnovateX
                    </h3>
                    <img 
                      className="innovatex-logo"
                      src="/images/navlogo.png" 
                      alt="InnovateX Logo" 
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginLeft: 6,
                        boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.32)' : '0 2px 8px rgba(0,0,0,0.08)',
                        border: `2px solid ${accentColor}`,
                        background: '#fff',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      margin: 0,
                      fontWeight: 500,
                      color: textColor,
                      marginBottom: '5px'
                    }}>
                      Mar 2025 - Present
                    </p>
                    <p style={{ 
                      margin: 0,
                      color: theme === 'dark' ? '#aaa' : '#666',
                      fontSize: '0.95rem'
                    }}>
                      4 mos
                    </p>
                  </div>
                </div>
                <div style={{ 
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '20px'
                }}>
                  <p style={{ 
                    margin: 0,
                    color: theme === 'dark' ? '#ddd' : '#555',
                    lineHeight: 1.6,
                    textAlign: 'left'
                  }}>
                    As Admin & Design Lead at InnovateX, I oversee administrative operations and lead the design team in creating innovative solutions. My responsibilities include managing project timelines, coordinating team efforts, and ensuring high-quality design outputs.
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '25px',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    Team Leadership
                  </span>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    UI/UX Design
                  </span>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    Project Management
                  </span>
                </div>
              </div>

              {/* Intern, PC Maintenance & Computer Network */}
              <div className="workexp-card" style={{
                flex: '1 1 350px',
                background: cardBg,
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: theme === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.2)' 
                  : '0 8px 32px rgba(0,0,0,0.1)',
                border: `1px solid ${borderColor}`,
                padding: '30px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                transform: 'translateY(0)',
                opacity: isLoading ? 0 : 1,
                animation: isLoading ? 'none' : 'fadeIn 0.6s ease-out forwards',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 12px 40px rgba(0,0,0,0.3)' 
                  : '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.2)' 
                  : '0 8px 32px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div style={{ textAlign: 'left', position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ 
                      fontSize: '1.5rem',
                      margin: 0,
                      marginBottom: '8px',
                      color: textColor
                    }}>
                      Intern, PC Maintenance & Computer Network
                    </h3>
                    <img 
                      className="tpi-logo"
                      src="/images/tpi.jpeg" 
                      alt="TPI Logo" 
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginLeft: 6,
                        boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.32)' : '0 2px 8px rgba(0,0,0,0.08)',
                        border: `2px solid ${accentColor}`,
                        background: '#fff',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      margin: 0,
                      fontWeight: 500,
                      color: textColor,
                      marginBottom: '5px'
                    }}>
                      Sep - Oct 2024
                    </p>
                    <p style={{ 
                      margin: 0,
                      color: theme === 'dark' ? '#aaa' : '#666',
                      fontSize: '0.95rem'
                    }}>
                      2 mos
                    </p>
                  </div>
                </div>
                <div style={{ 
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '20px'
                }}>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: theme === 'dark' ? '#ddd' : '#555',
                    lineHeight: 1.6,
                    textAlign: 'left',
                    fontSize: '1rem'
                  }}>
                    <li>Hands-on CPU assembly, network troubleshooting, hardware maintenance.</li>
                    <li>Collaborated on resolving technical issues to enhance analytical skills.</li>
                  </ul>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '25px',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    PC Maintenance
                  </span>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    PPT Making
                  </span>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    Team Work
                  </span>
                  <span style={{
                    background: theme === 'dark' ? 'rgba(95,46,234,0.2)' : 'rgba(153,0,255,0.1)',
                    color: accentColor,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer style={{ 
        background: theme === 'dark' ? '#000' : '#f0f0f0',
        color: theme === 'dark' ? '#aaa' : '#555',
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: `1px solid ${borderColor}`,
        transition: 'background 0.3s, color 0.3s'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px',
            marginBottom: '20px'
          }}>
            <a 
              href="https://www.instagram.com/addreeraj/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: theme === 'dark' ? '#aaa' : '#555',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = accentColor}
              onMouseLeave={e => e.currentTarget.style.color = theme === 'dark' ? '#aaa' : '#555'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/share/gR4Nx3AEhzXd9sHt/?mibextid=qi2Omg" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: theme === 'dark' ? '#aaa' : '#555',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = accentColor}
              onMouseLeave={e => e.currentTarget.style.color = theme === 'dark' ? '#aaa' : '#555'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/adreerajdas" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: theme === 'dark' ? '#aaa' : '#555',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = accentColor}
              onMouseLeave={e => e.currentTarget.style.color = theme === 'dark' ? '#aaa' : '#555'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          
          <p style={{ 
            fontSize: '0.9rem',
            margin: '10px 0'
          }}>
            &copy; {new Date().getFullYear()} Adreeraj Das. All Rights Reserved.
          </p>
          <p style={{ 
            fontSize: '0.9rem',
            margin: '10px 0',
            color: theme === 'dark' ? '#777' : '#888'
          }}>
            Designed and developed by Adree
          </p>
        </div>
      </footer>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        body {
          font-family: 'Space Mono', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          transition: background 0.3s, color 0.3s;
        }
        * {
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: 700;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        /* Responsive grid for projects */
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 700px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .workexp-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .workexp-card {
            width: 100% !important;
            margin: 16px auto !important;
            border-radius: 20px !important;
            padding: 18px !important;
            min-width: unset !important;
            max-width: unset !important;
          }
          .projects-page {
            padding: 10px !important;
          }
          .workexp-card img, .workexp-card .innovatex-logo, .workexp-card .tpi-logo {
            width: 32px !important;
            height: 32px !important;
          }
          .workexp-card h3 {
            font-size: 1.1rem !important;
          }
        }
        @media (max-width: 400px) {
          .projects-page {
            padding: 2px !important;
          }
          .workexp-card h3 {
            font-size: 1rem !important;
          }
          .workexp-card {
            padding: 10px !important;
            margin: 8px auto !important;
            border-radius: 16px !important;
            min-width: unset !important;
            max-width: unset !important;
          }
        }
      `}</style>
    </>
  );
}