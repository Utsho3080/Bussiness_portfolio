import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { createPortal } from 'react-dom';
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './Projects.css';

const PROJECTS = [
  {
    title: 'sproutwelldecor',
    category: 'Web Development',
    coverImage: '/project/sproutwelldecor.jpeg',
    images: ['/project/sproutwelldecor2.png'],
    description: 'A modern e-commerce website for a premium home decor brand — intuitive browse, cart, and checkout experience.',
    liveUrl: 'https://sproutwelldecor.com.au/',
  },
  {
    title: 'Fashion app UI Design',
    category: 'App Design',
    coverImage: '/project/fashion app design.jpeg',
    images: [
      '/project/fashion app design 2.jpeg',
      '/project/fashion app design 5.png',
    ],
    description: 'A modern mobile app UI for a premium fashion and clothing brand — intuitive browse, cart, and checkout experience.',
    liveUrl: '#',
  },
  {
    title: 'Educational Consultant website',
    category: 'Web Development',
    coverImage: '/project/educational website.jpeg',
    images: ['/project/educational website 2.jpeg'],
    description: 'A educational consultant website with all the features of a modern website.',
    liveUrl: '#',
  },
  {
    title: 'Beauty Saloon Website',
    category: 'Web Development',
    coverImage: '/project/Beauty saloon.jpeg',
    images: ['/project/Beauty saloon 2.jpeg'],
    description: 'A beauty saloon website with all the features of a modern website.',
    liveUrl: '#',
  },
  {
    title: 'Liquor App UI Design',
    category: 'App Design',
    coverImage: '/project/beer_website.jpeg',
    images: ['/project/beer_website 2.png',
      '/project/beer_website 3.png',

    ],
    description: 'A modern mobile app UI for a premium liquor delivery service — intuitive browse, cart, and checkout experience.',
    liveUrl: '#',
  },
  {
    title: 'Seemy',
    category: 'website design',
    coverImage: '/project/seemy.jpeg',
    images: ['/project/seemy 2.jpeg',
      '/project/seemy 3.jpeg',
      '/project/seemy 4.jpeg'],

    description: 'A modern website UI for a eyeglass and sunglass delivery service — intuitive browse, cart, and checkout experience.',
    liveUrl: '#',
  },
  {
    title: 'Absolute Publisher',
    category: 'Website Development',
    coverImage: '/project/book publisher.jpeg',
    images: ['/project/book publisher 2.jpeg'],
    description: 'A book publisher website with all the features of a modern website with book selling',
    liveUrl: '#',
  },
  {
    title: "Potter's Shed",
    category: 'Website Development',
    coverImage: '/project/potters shed.jpeg',
    images: ['/project/potters shed 2.jpeg'],
    description: 'A gifting website where seling the flower and plants pots and many more things',
    liveUrl: 'https://pottersshed.com.au/',
  },
  {
    title: 'Doctor Mitchell',
    category: 'Website Development',
    coverImage: '/project/doctor website.jpg',
    images: ['/project/doctor website 2.jpeg'],
    description: 'a complete website for a doctor with all the features of a modern website with appoinment booking system and many more features',
    liveUrl: '#',
  },
];

// ── Popup Modal ──
const ProjectModal = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.classList.add('modal-open');
    lenis?.stop();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('modal-open');
      lenis?.start();
    };
  }, [onClose, lenis]);

  const prev = () => setImgIdx(i => (i - 1 + project.images.length) % project.images.length);
  const next = () => setImgIdx(i => (i + 1) % project.images.length);

  return createPortal(
    <div className="proj-modal-backdrop" onClick={onClose} data-lenis-prevent>
      <div className="proj-modal" onClick={e => e.stopPropagation()} data-lenis-prevent>
        <button className="proj-modal-close" onClick={onClose}><X size={20} /></button>

        {/* Image Slider */}
        <div className="proj-modal-gallery">
          <img src={project.images[imgIdx]} alt={project.title} className="proj-modal-img" />
          {project.images.length > 1 && (
            <>
              <button className="proj-modal-nav left" onClick={prev}><ChevronLeft size={24} /></button>
              <button className="proj-modal-nav right" onClick={next}><ChevronRight size={24} /></button>
              <div className="proj-modal-dots">
                {project.images.map((_, i) => (
                  <button key={i} className={`proj-dot ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="proj-modal-info">
          <div>
            <span className="proj-modal-cat">{project.category}</span>
            <h3 className="proj-modal-title">{project.title}</h3>
            <p className="proj-modal-desc">{project.description}</p>
          </div>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-live-btn">
              <ExternalLink size={18} /> View Live Project
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Main Component ──
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const tickerWrapperRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftAnchor = useRef(0);

  const handleSelect = (proj) => {
    setSelectedProject(proj);
  };

  const onMouseDown = (e) => {
    if (selectedProject) return;
    isDown.current = true;
    startX.current = e.pageX - tickerWrapperRef.current.offsetLeft;
    scrollLeftAnchor.current = tickerWrapperRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    setIsPaused(false);
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDown.current || selectedProject) return;
    e.preventDefault();
    const x = e.pageX - tickerWrapperRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed modifier
    tickerWrapperRef.current.scrollLeft = scrollLeftAnchor.current - walk;
  };

  // Pure JS Auto-Scroll Loop
  useEffect(() => {
    const el = tickerWrapperRef.current;
    let animationId;

    const playTicker = () => {
      // Stops the ticker if paused by hover, being dragged, or if modal is open
      if (!isPaused && !isDown.current && !selectedProject && el) {
        el.scrollLeft += 1; // Adjust this number for scrolling speed

        const singleSetWidth = el.scrollWidth / 10;

        // Infinite Loop Reset Logic
        if (el.scrollLeft >= singleSetWidth * 6) {
          el.scrollLeft = singleSetWidth * 2;
        } else if (el.scrollLeft <= singleSetWidth) {
          el.scrollLeft = singleSetWidth * 5;
        }
      }
      animationId = requestAnimationFrame(playTicker);
    };

    animationId = requestAnimationFrame(playTicker);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, selectedProject]);

  // Initial scroll setup so we start in the middle of our clones
  useEffect(() => {
    if (tickerWrapperRef.current) {
      const el = tickerWrapperRef.current;
      el.scrollLeft = (el.scrollWidth / 10) * 4;
    }
  }, []);

  const scrollBy = (dir) => {
    const el = tickerWrapperRef.current;
    if (el) {
      const scrollAmount = window.innerWidth / 3;
      el.scrollTo({
        left: el.scrollLeft + (dir === 'next' ? scrollAmount : -scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <div>
            <h2 className="projects-title">
              We Have <em>Build</em>
            </h2>
            <p className="projects-subtitle">
              We go beyond traditional marketing. We deliver value with cutting-edge, data-driven strategies.
            </p>
          </div>
        </div>

        {/* <button className="proj-edge-btn left" onClick={() => scrollBy('prev')}>
          <ChevronLeft size={32} />
        </button>
        <button className="proj-edge-btn right" onClick={() => scrollBy('next')}>
          <ChevronRight size={32} />
        </button> */}

        <div
          className="proj-ticker-wrapper"
          ref={tickerWrapperRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="proj-ticker-track">
            {[...Array(10)].map((_, idx) => (
              <React.Fragment key={idx}>
                {PROJECTS.map((proj, i) => (
                  <button
                    key={`${i}-${idx}`}
                    className="proj-card"
                    onClick={() => handleSelect(proj)}
                  >
                    <div className="proj-card-img-wrap">
                      <img src={proj.coverImage} alt={proj.title} className="proj-card-img" />
                      <div className="proj-card-overlay">
                        <span className="proj-card-open">View Project</span>
                      </div>
                    </div>
                    <div className="proj-card-body">
                      <span className="proj-card-cat">{proj.category}</span>
                      <h3 className="proj-card-title">{proj.title}</h3>
                    </div>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;