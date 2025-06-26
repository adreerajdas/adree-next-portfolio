"use client";

import Script from "next/script";

export default function HomePage() {
  return (
    <main>
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet" />
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/icomoon.css" />
      <link rel="stylesheet" href="/css/bootstrap.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <Script src="/js/modernizr-2.6.2.min.js" strategy="beforeInteractive" />
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
                    <h3><span>Web Developer</span></h3>
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
      </div>
    </main>
  );
}
