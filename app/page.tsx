"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";

function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Check for saved theme in localStorage
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) {
      setTheme(saved);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(saved);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.body.classList.add(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
        // Sun icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      ) : (
        // Moon icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      )}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    // Listen for theme changes
    const updateTheme = () => {
      const t = document.body.classList.contains('dark') ? 'dark' : 'light';
      setTheme(t);
    };
    updateTheme();
    window.addEventListener('storage', updateTheme);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('storage', updateTheme);
      observer.disconnect();
    };
  }, []);

  // Close menu on navigation (for accessibility)
  const handleNavClick = () => setMenuOpen(false);

  // Dynamic background for dark/light mode
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
        <Link href="#fh5co-about"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>About</span></Link>
        <Link href="/education"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Education</span></Link>
        <Link href="/projects"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Projects</span></Link>
        <Link href="/contact"><span style={{ textDecoration: "none", color: theme === 'dark' ? '#fff' : '#222', fontWeight: 500 }}>Contact</span></Link>
        <span><ThemeToggle /></span>
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
          <Link href="#fh5co-about"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>About</span></Link>
          <Link href="/education"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Education</span></Link>
          <Link href="/projects"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Projects</span></Link>
          <Link href="/contact"><span style={{ padding: '12px 24px', width: '100%', textAlign: 'right', color: theme === 'dark' ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNavClick}>Contact</span></Link>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '12px 24px 0 24px' }}>
          <ThemeToggle />
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

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();
    window.addEventListener('storage', updateTheme);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('storage', updateTheme);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* ThemeToggle removed from here, now in Navbar */}

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet" />

      {/* CSS Files */}
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/icomoon.css" />
      <link rel="stylesheet" href="/css/bootstrap.css" />
      <link rel="stylesheet" href="/css/style.css" />

      {/* Modernizr JS */}
      <Script src="/js/modernizr-2.6.2.min.js" strategy="beforeInteractive" />
      {/*[if lt IE 9]*/}
      {/* <Script id="respond-js" src="/js/respond.min.js" strategy="beforeInteractive" /> */}
      {/*<![endif]*/}

      {/* Main HTML Content */}
      <div className="fh5co-loader"></div>
      <div id="page">
        <header id="fh5co-header" className="fh5co-cover js-fullheight" role="banner" style={{ backgroundImage: 'url(/images/cover_bg_3.jpg)' }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <div className="display-t js-fullheight">
                  <div className="display-tc js-fullheight animate-box" data-animate-effect="fadeIn">
                    <div className="profile-thumb" style={{ background: 'url(/images/user-3.jpg)' }}></div>
                    <h1><span>Adreeraj Das</span></h1>
                    <h3><span>Full Stack Developer</span></h3>
                    <ul className="fh5co-social-icons">
                      <li><a href="https://www.instagram.com/addreeraj/"><i className="icon-instagram"></i></a></li>
                      <li><a href="https://www.facebook.com/share/gR4Nx3AEhzXd9sHt/?mibextid=qi2Omg"><i className="icon-facebook2"></i></a></li>
                      <li><a href="https://www.linkedin.com/in/adreerajdas"><i className="icon-linkedin2"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id="fh5co-about" className="animate-box">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>About Me</h2>
              </div>
            </div>
            <div className="row about-row-responsive">
              <div
                className="about-info-col"
                style={{ wordBreak: 'break-word', marginLeft: '-18px', maxWidth: 260 }}
              >
                <ul className="info">
                  <li><span className="first-block">Name:</span><span className="second-block">Adreeraj Das</span></li>
                  <li><span className="first-block">Email:</span><span className="second-block" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '170px' }} title="dasadreeraj@gmail.com">dasadreeraj@gmail.com</span></li>
                  <li><span className="first-block">Website:</span><span className="second-block">
                    <a
                      href="https://adreerajdas.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: theme === 'dark' ? '#fff' : '#222',
                        textDecoration: 'underline'
                      }}
                    >
                      adreerajdas
                    </a>
                  </span></li>
                  <li><span className="first-block">Address:</span><span className="second-block">West Bengal, KOLKATA</span></li>
                </ul>
              </div>
              <div className="about-text-col">
                <h2>Hello There!</h2>
                <p>I’m a Full Stack Developer with a passion for building responsive websites and applications that offer seamless functionality and user experience. I specialize in UI/UX design and professional video editing, combining creativity with technical skills to craft meaningful digital solutions.</p>
                <p>Currently pursuing a Diploma in Computer Science & Technology at Technique Polytechnic Institute, I maintain a GPA of 8.3 and consistently explore new technologies through hands-on projects.</p>
                <p>I have also worked on IoT-based projects, focusing on practical, real-world applications in areas like safety and automation.</p>
                <p>As the Design Lead and Admin of InnovateX, a tech community of 500+ developers, I lead creative initiatives and mentor aspiring technologists.</p>
                <ul className="fh5co-social-icons">
                  <li><a href="https://www.instagram.com/addreeraj/"><i className="icon-instagram"></i></a></li>
                  <li><a href="https://www.facebook.com/share/gR4Nx3AEhzXd9sHt/?mibextid=qi2Omg"><i className="icon-facebook3"></i></a></li>
                  <li><a href="https://www.linkedin.com/in/adreerajdas"><i className="icon-linkedin2"></i></a></li>
                </ul>
              </div>
            </div>
            <style jsx>{`
              .about-row-responsive {
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
              }
              .about-info-col {
                min-width: 220px;
                max-width: 260px;
                flex: 1 1 220px;
                background: none;
              }
              .about-text-col {
                flex: 2 1 320px;
                min-width: 0;
                background: none;
              }
              .fh5co-social-icons {
                margin-top: 12px;
              }
              .fh5co-cover .fh5co-social-icons {
                margin-top: 20px;
              }
              @media (max-width: 900px) {
                .about-row-responsive {
                  flex-direction: column;
                  align-items: center;
                }
                .about-info-col, .about-text-col {
                  max-width: 100% !important;
                  width: 100% !important;
                  margin-left: 0 !important;
                }
                .about-info-col {
                  margin-bottom: 24px;
                }
                .about-text-col {
                  text-align: center;
                }
                .fh5co-social-icons {
                  justify-content: center;
                }
              }
              @media (max-width: 600px) {
                .about-row-responsive {
                  padding: 0 8px;
                }
                .about-text-col h2 {
                  font-size: 1.4rem;
                }
              }
            `}</style>
          </div>
        </div>
        <div id="fh5co-resume" className="fh5co-bg-color" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="row animate-box">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading" style={{ marginBottom: 0 }}>
                {/* <h2>My Resume</h2> removed as requested */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-md-offset-0">
                <ul className="timeline">
                  <li className="timeline-heading text-center animate-box">
                    <div style={{
                      background: 'var(--timeline-label-bg, #fff)',
                      color: 'var(--timeline-label-color, #222)',
                      borderRadius: 8,
                      padding: '8px 24px',
                      display: 'inline-block',
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                      TOP PROJECTS
                    </div>
                  </li>
                  <li className="animate-box timeline-unverted">
                    <div className="timeline-badge"><i className="icon-suitcase"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">SecureStorage</h3>
                        <span className="company">Mar 2025 – Apr 2025</span><br />
                        <span className="company">Technique Polytechnic Institute</span>
                      </div>
                      <div className="timeline-body">
                        <p>A web-based password manager developed as part of a Software Engineering minor project. It features secure user registration/login, Java-based encryption for password storage with notes, and a clean, responsive UI.</p>
                        <p><strong>Tech Stack:</strong> Java · Python · React.js · HTML · CSS · JavaScript · MySQL</p>
                        <a
                          href="https://www.linkedin.com/in/adreerajdas/details/projects/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            marginTop: 10,
                            padding: '8px 20px',
                            fontSize: '1.08rem',
                            background: '#9900ff',
                            color: '#fff',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#7a42ff'}
                          onMouseLeave={e => e.currentTarget.style.background = '#9900ff'}
                        >
                          View More Detail
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted animate-box">
                    <div className="timeline-badge"><i className="icon-suitcase"></i></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">Writing Wizard</h3>
                        <span className="company">Aug 2024 – Sep 2024</span><br />
                        <span className="company">Technique Polytechnic Institute</span>
                      </div>
                      <div className="timeline-body">
                        <p>A compact 2D CNC writing machine (100×150mm) for engraving text and patterns. Features smooth X-Y motion, uses Universal G-code Sender, and is compatible with Arduino IDE, Inkscape, and UGS. Ideal for DIY and educational projects.</p>
                        <p><strong>Skills:</strong> Electronics · C/C++ · Machine Design · Arduino · Machining</p>
                        <a
                          href="https://www.linkedin.com/in/adreerajdas/details/projects/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            marginTop: 10,
                            padding: '8px 20px',
                            fontSize: '1.08rem',
                            background: '#9900ff',
                            color: '#fff',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#7a42ff'}
                          onMouseLeave={e => e.currentTarget.style.background = '#9900ff'}
                        >
                          View More Detail
                        </a>
                      </div>
                    </div>
                  </li>
                  <br />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="fh5co-features" className="animate-box">
          <div className="container">
            <div className="services-padding">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                  <h2>My Services</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="feature-left">
                    <span className="icon">
                      <i className="icon-image"></i>
                    </span>
                    <div className="feature-copy">
                      <h3>Graphic Design</h3>
                      <p>Creative designs for digital and print media, tailored to your brand.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="feature-left">
                    <span className="icon">
                      <i className="icon-laptop"></i>
                    </span>
                    <div className="feature-copy">
                      <h3>Full Stack Development</h3>
                      <p>Modern, responsive websites and web apps from start to finish.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="feature-left">
                    <span className="icon">
                      <i className="icon-film"></i>
                    </span>
                    <div className="feature-copy">
                      <h3>Video Editing</h3>
                      <p>Engaging video content and social media reels for your brand.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="fh5co-skills" className="animate-box">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>Skills</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="progress-wrap">
                  <h3><span className="name-left">HTML &amp; CSS</span><span className="value-right">80%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-1 progress-bar-striped active" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="progress-wrap">
                  <h3><span className="name-left">JAVA</span><span className="value-right">100%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-3 progress-bar-striped active" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="progress-wrap">
                  <h3><span className="name-left">Next.js</span><span className="value-right">70%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-4 progress-bar-striped active" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="progress-wrap">
                  <h3><span className="name-left">React</span><span className="value-right">50%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-1 progress-bar-striped active" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="progress-wrap">
                  <h3><span className="name-left">ADOBE PHTOSHOP</span><span className="value-right">100%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-5 progress-bar-striped active" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="progress-wrap">
                  <h3><span className="name-left">ADOBE Premiere Pro</span><span className="value-right">75%</span></h3>
                  <div className="progress">
                    <div className="progress-bar progress-bar-3 progress-bar-striped active" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="fh5co-started" className="fh5co-bg-dark">
          <div className="overlay"></div>
          <div className="container">
            <div className="row animate-box">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>Hire Me! OR Work With Me</h2>
                <p>Versatile developer skilled in HTML, CSS, JavaScript, PHP, React.js, and C++, complemented by expertise in Adobe Photoshop and Premiere Pro, ready to bring creative and technical excellence to your projects.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="/contact" className="btn btn-default btn-lg">Contact Me</a>
                  <a href="/resume/adreeraj-cv.pdf" className="btn btn-default btn-lg" download>Download CV</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="fh5co-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>&copy; THANK YOU 2024. All Rights Reserved. <br />Designed by ADREE <a href="https://www.instagram.com/addreeraj/" target="_blank" rel="noopener noreferrer">FOLLOW</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="gototop js-top">
          <a href="#" className="js-gotop"><i className="icon-arrow-up22"></i></a>
        </div>
        {/* ...rest of the HTML content from index.html goes here, converted to JSX... */}
      </div>

      {/* JS Files at the end of body */}
      <Script src="/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.easing.1.3.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.stellar.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.easypiechart.min.js" strategy="afterInteractive" />
      {/* <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCefOgb1ZWqYtj7raVSmN4PL2WkTrc-KyA&sensor=false" strategy="afterInteractive" /> removed to fix 'Cannot read properties of undefined (reading 'maps')' error */}
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}