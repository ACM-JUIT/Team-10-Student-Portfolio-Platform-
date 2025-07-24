import React from "react";

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="homepage-container fade-in">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to <span className="highlight">StudentFolio</span>
        </h1>
        <p className="hero-subtitle">
          Showcase your academic journey with a professional digital portfolio.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-button"
            onClick={() => setCurrentPage("form")}
          >
            <i className="fas fa-pencil-alt"></i> Get Started
          </button>
          <button
            className="hero-button secondary"
            onClick={() => setCurrentPage("samples")}
          >
            <i className="fas fa-eye"></i> View Sample Portfolios
          </button>
        </div>
      </div>

      <div className="hero-features-section">
        <h2 className="section-title">Why Choose StudentFolio?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3>Easy to Use</h3>
            <p>Create your professional portfolio in minutes with our intuitive form interface.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-palette"></i>
            </div>
            <h3>Professional Design</h3>
            <p>Beautiful, modern templates that make your work stand out to employers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Showcase Skills</h3>
            <p>Display your technical skills with interactive progress bars and project highlights.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Responsive</h3>
            <p>Your portfolio looks great on all devices - desktop, tablet, and mobile.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Build Your Portfolio?</h2>
        <p>Join thousands of students who have already created their professional portfolios.</p>
        <div className="cta-buttons">
          <button
            className="cta-button primary"
            onClick={() => setCurrentPage("form")}
          >
            Create Your Portfolio
          </button>
          <button
            className="cta-button secondary"
            onClick={() => setCurrentPage("featured")}
          >
            Browse Featured Portfolios
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;