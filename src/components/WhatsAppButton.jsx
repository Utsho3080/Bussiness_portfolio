import React, { useState, useEffect } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const whatsappNumber = "+918100730178"; // REPLACE WITH USER'S NUMBER
  const message = "Hi Orientrix team! I'm interested in your services.";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('home');
    
    // Initial check in case Hero is already in view
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      setVisible(rect.bottom <= 100); // Only show if we've scrolled past the top
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button when Hero (#home) is in view
        // Using threshold 0 and checking isIntersecting for maximum sensitivity
        setVisible(!entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px" // Offset for the navbar height
      }
    );

    if (heroSection) observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`whatsapp-float ${!visible ? 'hidden' : ''}`}>
      <button onClick={openWhatsApp} aria-label="Chat on WhatsApp" className="whatsapp-btn">
        <img
          src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000"
          alt="WhatsApp"
          className="whatsapp-icon-img"
        />
        <span className="btn-tooltip">Chat with us</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
