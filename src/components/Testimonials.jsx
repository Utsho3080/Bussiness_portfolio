import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'jamesrreed',
    role: 'Founder',
    company: 'Nobel CPS|Advisor',
    avatar: 'https://www.freelancer.com/ppic/57219890/logo/4596200/profile_logo_4596200.jpg?image-optimizer=force&format=webply&width=120',
    rating: 5,
    review: "Sujit did an amazing job on my landing page design. Highly recommend. Fantastic submissions and perfect handover deliverables. Thank you.”",
  },
  {
    name: 'lisacowley',
    role: 'Founder',
    company: 'Sproutwell',
    avatar: 'https://www.freelancer.com/ppic/39392794/logo/20891922/profile_logo_20891922.jpg?image-optimizer=force&format=webply&width=120',
    rating: 5,
    review: "They do great work was very patience",
  },

  {
    name: 'Sumon Banerjee',
    role: 'Founder',
    company: 'Absolute Publisher',
    avatar: 'review/absolute publisher.jpeg',
    rating: 5,
    review: "আমি আমার অ্যাবসোলিউট পাবলিশার ওয়েবসাইট ডেভেলপমেন্টের কাজটি করিয়েছি এবং অভিজ্ঞতাটি অত্যন্ত সন্তোষজনক ছিল। ওয়েবসাইটটি দেখতে প্রফেশনাল, ব্যবহারেও সহজ এবং কাজের মান ও সাপোর্ট প্রশংসনীয়। মানসম্মত ওয়েবসাইট ডেভেলপমেন্টের জন্য তাদের অবশ্যই সুপারিশ করবো।",
  },
  {
    name: 'Tarvin Sultana',
    role: 'Chairman',
    company: 'St. Thomas Bagnan School',
    avatar: 'review/st thomas.jpeg',
    rating: 5,
    review: "St. Thomas Bagnan School-এর পক্ষ থেকে Sujit কে মার্কেটিং কার্যক্রমের জন্য ধন্যবাদ জানাই। তাদের প্রফেশনাল কাজ এবং ডেডিকেশন আমাদের প্রতিষ্ঠানের অনলাইন উপস্থিতি অনেকটাই বৃদ্ধি করেছে। তাদের টিম অত্যন্ত সহযোগিতাপূর্ণ এবং সময়মতো কাজ সম্পন্ন করেছে। আমরা তাদের সার্ভিসে সম্পূর্ণ সন্তুষ্ট এবং ভবিষ্যতেও একসাথে কাজ করার প্রত্যাশা রাখি।",
  },
  {
    name: 'Priyanka',
    role: 'Owner',
    company: 'Priyanka Fashion World',
    avatar: 'review/priyanka.jpeg',
    rating: 5,
    review: "I get a wonderful experience in their marketing services for my saree business. The team was great and they understood my brand perfectly and helped showcase my products in a very attractive and professional way. Everything was  handled smoothly. I saw a noticeable increase in customer inquiries and engagement. Highly recommended .",
  },
  {
    name: 'Vinod',
    role: 'Owner',
    company: 'Salon Vinod Hair Studio',
    avatar: 'review/vinod.jpeg',
    rating: 5,
    review: "I had a great experience with their marketing services. Their team truly understands how to promote a brand effectively and attract the right audience. From social media handling to overall branding, everything was done professionally and with attention to detail.",
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
