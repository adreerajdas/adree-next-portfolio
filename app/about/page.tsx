"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
    </button>
  );
}

function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" href="/">My Portfolio</Link>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet" />
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/icomoon.css" />
      <link rel="stylesheet" href="/css/bootstrap.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <div id="fh5co-about" className="animate-box">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>About Me</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <ul className="info">
                <li><span className="first-block">Name:</span><span className="second-block">Adreeraj Das</span></li>
                <li><span className="first-block">Email:</span><span className="second-block">dasadreeraJ@gmail.com</span></li>
                <li><span className="first-block">Website:</span><span className="second-block">www.adreehtml.com</span></li>
                <li><span className="first-block">Address:</span><span className="second-block">West Bengal, KOLKATA</span></li>
              </ul>
            </div>
            <div className="col-md-8">
              <h2>Hello There!</h2>
              <p>I'm Adree, a dedicated web developer with a passion for creating dynamic and user-friendly websites. I specialize in both frontend and backend development</p>
              <p>Ensuring a seamless and engaging experience for users. With proficiency in HTML, CSS, JavaScript, and various backend technologies, I strive to bring innovative ideas to life through code. Whether it's designing visually appealing interfaces or developing robust server-side applications, I am committed to delivering high-quality solutions that meet the unique needs of each project. Let's connect and build something amazing together!</p>
              <ul className="fh5co-social-icons">
                <li><a href="https://www.instagram.com/addreeraj/"><i className="icon-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/share/gR4Nx3AEhzXd9sHt/?mibextid=qi2Omg"><i className="icon-facebook3"></i></a></li>
                <li><a href="https://www.linkedin.com/in/adreerajdas"><i className="icon-linkedin2"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
