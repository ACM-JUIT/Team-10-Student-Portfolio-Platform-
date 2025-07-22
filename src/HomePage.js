import React, { useState, useEffect } from "react";
import { apiService } from "./config/api";

const HomePage = ({ setCurrentPage, setSelectedPortfolio }) => {
  // ... existing code ...

  return (
    <div className="homepage-container fade-in">
      {/* ... existing code ... */}

      <div className="featured-profiles-section">
        <h2 className="section-title">
          {error ? "Featured Student Portfolios (Demo)" : "Featured Student Portfolios"}
        </h2>

        {/* ... existing code ... */}

        <div className="profiles-grid">
          {portfolios.length === 0 ? (
            <div className="no-portfolios">
              <i className="fas fa-folder-open"></i>
              <p>No portfolios found. Be the first to create one!</p>
              <button
                className="hero-button"
                onClick={() => setCurrentPage("form")}
              >
                Create Your Portfolio
              </button>
            </div>
          ) : (
            portfolios.map((portfolio) => (
              <div className="profile-card" key={portfolio._id}>
                {/* ... existing code ... */}
                <button
                  className="view-profile-button"
                  onClick={() => {
                    setSelectedPortfolio(portfolio); // Set the selected portfolio
                    setCurrentPage("portfolioDetail"); // Navigate to the detail page
                  }}
                >
                  <i className="fas fa-eye"></i> View Portfolio
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;
