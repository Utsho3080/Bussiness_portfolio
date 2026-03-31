import React, { useState, useEffect } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const whatsappNumber = "+918100730178"; // REPLACE WITH USER'S NUMBER
  const message = "Hi Orientrix team! I'm interested in your services.";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button when Hero (#home) is in view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById('home');
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
