import React, { useState, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { createPortal } from 'react-dom';
import { Linkedin, X } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('modal-open');
      lenis?.stop();
    } else {
      document.body.classList.remove('modal-open');
      lenis?.start();
    }
    return () => {
      document.body.classList.remove('modal-open');
      lenis?.start();
    };
  }, [showPopup, lenis]);

  const handleLegalClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    lenis?.scrollTo(id, { offset: -80 });
  };

  return (
    <footer className="footer">
      <div className="footer-backdrop">Orientix</div>
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/orientix.png" alt="Orientix Logo" style={{ height: '45px', width: 'auto' }} />
          </a>
          <p>Empowering ambitious businesses through cutting-edge technology, data-driven marketing, and ironclad reliability.</p>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
          <a href="#packages" onClick={(e) => handleNavClick(e, '#packages')}>Packages</a>
          <a href="#team" onClick={(e) => handleNavClick(e, '#team')}>Team</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a>
        </div>

        <div className="footer-legal">
          <h4>Legal</h4>
          <a href="#" onClick={handleLegalClick}>Privacy Policy</a>
          <a href="#" onClick={handleLegalClick}>Terms of Service</a>
          <a href="#" onClick={handleLegalClick}>Cookie Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Orientix Technologies. All rights reserved.</p>
        <div className="footer-bottom-links">

          <a href="#"> LinkedIn</a>
        </div>
      </div>

      {showPopup && createPortal(
        <div className="footer-popup-backdrop" onClick={() => setShowPopup(false)} data-lenis-prevent>
          <div className="footer-popup" onClick={e => e.stopPropagation()} data-lenis-prevent>
            <button className="footer-popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
              <X size={20} />
            </button>
            <h3>Coming Soon</h3>
            <p>Our legal documents are currently being updated. Please check back later.</p>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
