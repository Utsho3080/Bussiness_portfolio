import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Code2, Linkedin, X } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [showPopup]);

  const handleLegalClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <footer className="footer">
      <div className="footer-backdrop">Orientix</div>
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 900 }}>
            <Code2 style={{ color: 'var(--accent-blue)', width: 26, height: 26 }} />
            <span>Orien<span className="text-accent">tix</span></span>
          </a>
          <p>Empowering ambitious businesses through cutting-edge technology, data-driven marketing, and ironclad reliability.</p>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
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
        <div className="footer-popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="footer-popup" onClick={e => e.stopPropagation()}>
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
