import React, { useState, useEffect, useRef } from 'react';

const StudentFolioFeatures = ({ setCurrentPage }) => {
  // Remove the local currentPage state
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // ... rest of your component
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: 1,
      icon: '🚀',
      title: 'Easy to Use',
      description: 'Create your professional portfolio in minutes with our intuitive form interface.',
      color: '#3b82f6'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Professional Design',
      description: 'Beautiful, modern templates that make your work stand out to employers.',
      color: '#8b5cf6'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Showcase Skills',
      description: 'Display your technical skills with interactive progress bars and project highlights.',
      color: '#10b981'
    },
    {
      id: 4,
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Your portfolio looks great on all devices - desktop, tablet, and mobile.',
      color: '#f59e0b'
    }
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
    // Add smooth scroll or page transition logic here
    console.log(`Navigating to: ${page}`);
  };

  return (
    <div className="studentfolio-container">
      <section 
        ref={sectionRef} 
        className={`hero-features-section ${isVisible ? 'animate-in' : ''}`}
      >
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Why Choose StudentFolio?</h2>
            <p className="section-subtitle">
              Everything you need to create a standout academic portfolio
            </p>
          </header>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card ${isVisible ? 'slide-up' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--accent-color': feature.color 
                }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="feature-icon">
                  <span className="icon-emoji">{feature.icon}</span>
                  <div className="icon-bg"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                {hoveredCard === feature.id && (
                  <div className="card-shine"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Your Portfolio?</h2>
            <p className="cta-description">
              Join thousands of students who have already created their professional portfolios.
            </p>
            
            <div className="cta-buttons">
              <button
                className="cta-button primary"
                onClick={() => handleNavigation('form')}
                aria-label="Create your portfolio now"
              >
                <span>Create Your Portfolio</span>
                <div className="button-shine"></div>
              </button>
              
              <button
                className="cta-button secondary"
                onClick={() => handleNavigation('featured')}
                aria-label="Browse example portfolios"
              >
                <span>Browse Featured Portfolios</span>
              </button>
            </div>
            <div className="stat-number">Developers</div>
            <br></br>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-label">
  <a href="https://www.linkedin.com/in/abhinav-bajpai-58b36128b/" target="_blank" rel="noopener noreferrer">
    Abhinav Bajpai
  </a>
</div>
              </div>
              <div className="stat-item">
                <span className="stat-number"></span>
                <div className="stat-label">
  <a href="https://www.linkedin.com/in/adityaasingh74/" target="_blank" rel="noopener noreferrer">
    Aditya Singh
  </a>
</div>
              </div>
              <div className="stat-item">
                <span className="stat-number"></span>
                <div className="stat-label">
  <a href="https://www.linkedin.com/in/kundan-krishna366/" target="_blank" rel="noopener noreferrer">
    Kundan Krishna
  </a>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .studentfolio-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Hero Features Section */
        .hero-features-section {
          padding: 100px 0;
          background: #0f172a;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-features-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.2s;
        }

        .animate-in .section-title,
        .animate-in .section-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title::after {
          content: '';
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          margin: 24px auto 0;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.8s ease 0.4s;
        }

        .animate-in .section-title::after {
          transform: scaleX(1);
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        /* Feature Cards */
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Feature Icons */
        .feature-icon {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-emoji {
          font-size: 2.5rem;
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .icon-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--accent-color);
          opacity: 0.2;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .feature-card:hover .icon-emoji {
          transform: scale(1.1);
        }

        .feature-card:hover .icon-bg {
          opacity: 0.3;
          transform: scale(1.1);
        }

        /* Feature Content */
        .feature-content {
          position: relative;
          z-index: 1;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .feature-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          font-size: 1rem;
        }

        /* Card Shine Effect */
        .card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shine 0.6s ease-in-out;
        }

        @keyframes shine {
          to {
            left: 100%;
          }
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: #0f172a;
        }

        .cta-content {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 4rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* CTA Buttons */
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .cta-button {
          position: relative;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          min-width: 220px;
          transition: all 0.3s ease;
        }

        .cta-button span {
          position: relative;
          z-index: 2;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .cta-button.secondary {
          background: transparent;
          color: #60a5fa;
          border: 2px solid #3b82f6;
        }

        .cta-button.secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .cta-button:hover .button-shine {
          left: 100%;
        }

        /* Stats */
        .stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.75rem;
          font-weight: 800;
          color: #60a5fa;
          margin-bottom: 0.5rem;
        }

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  margin-top: 8px;
}

.stat-label a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.8px;
  padding: 12px 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: inline-block;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-label a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.stat-label a:hover::before {
  left: 100%;
}

.stat-label a::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-label a:hover {
  color: #ffffff;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.stat-label a:hover::after {
  opacity: 1;
}

.stat-label a:active {
  transform: translateY(-1px) scale(1.01);
  transition: transform 0.1s ease;
}

/* LinkedIn icon */
.stat-label a span::before {
  content: '💼';
  margin-right: 8px;
  font-size: 1rem;
  opacity: 0.9;
}

/* Floating particles effect */
.stat-label a:hover {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(-3px) scale(1.02); }
  50% { transform: translateY(-5px) scale(1.02); }
}

/* Glow effect */
.stat-label a:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Beautiful focus state for accessibility */
.stat-label a:focus {
  outline: none;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 3px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Mobile responsive with enhanced touch targets */
@media (max-width: 768px) {
  .stat-label a {
    padding: 14px 24px;
    font-size: 1rem;
    min-width: 160px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .stat-label a {
    padding: 16px 28px;
    font-size: 1.1rem;
    width: 100%;
    max-width: 250px;
  }
}

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-features-section {
            padding: 80px 0;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .feature-card {
            padding: 2rem 1.5rem;
          }

          .cta-content {
            padding: 3rem 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .stats {
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          .section-header {
            margin-bottom: 3rem;
          }

          .feature-icon {
            width: 60px;
            height: 60px;
          }

          .icon-emoji {
            font-size: 2rem;
          }

          .cta-content {
            padding: 2.5rem 1.5rem;
          }

          .cta-button {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentFolioFeatures;