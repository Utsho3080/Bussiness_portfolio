import React, { useState, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isMobileMenuOpen, lenis]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Packages', href: '#packages' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      // Small delay ensures Lenis calculates the target AFTER the menu starts closing
      setTimeout(() => {
        lenis?.scrollTo(href, { offset: -80, duration: 1.2 });
      }, 50);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/orientix.png" alt="Orientix Logo" className="logo-img" style={{ height: '40px', width: 'auto' }} />
        </a>

        <div className="desktop-links">
          {navLinks.filter(link => link.name !== 'Contact').map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <a href="#contact" className="btn-primary" onClick={(e) => handleNavClick(e, '#contact')}>Contact Us</a>

          <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} data-lenis-prevent>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

