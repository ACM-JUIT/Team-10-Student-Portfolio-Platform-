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
    </div>
  );
};

export default HomePage;