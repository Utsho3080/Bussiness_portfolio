import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import './Contact.css';

// ─────────────────────────────────────────────────────────────────────────────
// Fill in these three values from your EmailJS dashboard (emailjs.com)
//   1. Service ID  → Email Services → your service → Service ID
//   2. Template ID → Email Templates → your template → Template ID
//   3. Public Key  → Account → API Keys → Public Key
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const EMAIL = 'sahasujit8100@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section-heading text-center">
        <h2 className="title">Let's <span className="text-accent">Connect</span></h2>
        <p className="subtitle">Ready to start your next big project?</p>
      </div>

      <div className="contact-container reveal">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We'd love to hear from you. Fill out the form or reach out directly.</p>

          <a href={`mailto:${EMAIL}`} className="info-item info-link">
            <Mail className="info-icon" />
            <span>sahasujit8100@gmail.com</span>
          </a>

          <a
            href="https://wa.me/918583043080 "
            target="_blank"
            rel="noopener noreferrer"
            className="info-item info-link"
          >
            <MessageCircle className="info-icon whatsapp-icon" />
            <span>Chat on WhatsApp</span>
          </a>

          <a href="tel:+916290575057" className="info-item info-link">
            <Phone className="info-icon" />
            <span>+91 6290575057</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="How can we help?"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="form-feedback success">✅ Message sent! We'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="form-feedback error">❌ Something went wrong. Please try again or contact us directly.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
