import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    role: 'Founder',
    company: 'Sproutwell',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "The team delivered an absolutely stunning e-commerce site. Our conversion rate jumped 40% in the first month. Professional, creative, and incredibly responsive — couldn't ask for more.",
  },
  {
    name: 'Priya Singh',
    role: 'Marketing Head',
    company: 'GrowthLabs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "Their social media strategy tripled our qualified leads within 2 months. The content quality was impeccable and the campaign targeting was laser-precise. Highly recommended!",
  },
  {
    name: 'Rahul Verma',
    role: 'CEO',
    company: 'TechCore India',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "From logo to full brand identity system — they nailed every detail. The brand guidelines document alone was world-class. Our team uses it daily and clients love our new look.",
  },
  {
    name: 'Neha Kapoor',
    role: 'Product Manager',
    company: 'FinDash',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "The analytics dashboard they built handles 50k+ concurrent users flawlessly. Clean code, beautiful UI, and delivered ahead of schedule. The best dev team we've worked with.",
  },
  {
    name: 'Suresh Kumar',
    role: 'Director',
    company: 'AdVantage',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "The paid ad campaigns they ran hit 2 million users and drove a 65% spike in brand awareness. The ROI was exceptional. We've renewed our contract for the third year running.",
  },
  {
    name: 'Anita Rao',
    role: 'Co-founder',
    company: 'BeautyBloom',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: "Our Shopify redesign was transformative. The mobile experience especially is buttery smooth. Sales from mobile devices doubled and customer complaints about the site dropped to zero.",
  },
];

const StarRating = ({ rating }) => (
  <div className="testi-stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? '#f59e0b' : 'none'} color={i < rating ? '#f59e0b' : '#d1d5db'} />
    ))}
  </div>
);

const Testimonials = () => {
  const [page, setPage] = useState(0);
  const PER_PAGE = 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="testimonials" id="testimonials">
      <div className="testi-container">
        {/* Header */}
        <div className="testi-header">
          <h2 className="testi-title">
            What Our <em>Clients</em><br />Say About Us
          </h2>
          <div className="testi-nav">
            <button className="testi-nav-btn" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
              <ChevronLeft size={22} />
            </button>
            <span className="testi-page-count">{page + 1} / {totalPages}</span>
            <button className="testi-nav-btn" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="testi-grid">
          {visible.map((t, i) => (
            <div key={`${page}-${i}`} className="testi-card reveal active">
              <Quote size={32} className="testi-quote-icon" />
              <StarRating rating={t.rating} />
              <p className="testi-review">"{t.review}"</p>
              <div className="testi-author">
                <img src={t.avatar} alt={t.name} className="testi-avatar" />
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-role">{t.role}, <span>{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="testi-dots">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className={`testi-dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
