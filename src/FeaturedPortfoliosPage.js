import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for FeaturedPortfoliosPage
const FeaturedPortfoliosPage = ({ featuredProfiles, handleViewPortfolio }) => {
  return (
    <div className="featured-portfolios-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Featured Student Portfolios</h1>
        <p className="page-subtitle">
          Discover inspiring portfolios from talented students across various disciplines.
          Get ideas for your own portfolio and see what's possible with StudentFolio.
        </p>
      </div>

      <div className="portfolios-grid">
        {featuredProfiles.map((profile) => (
          <div className="portfolio-card" key={profile.id}>
            <div className="portfolio-image-container">
              <img src={profile.imageUrl} alt={`${profile.firstName} ${profile.lastName}'s profile`} />
              <div className="portfolio-overlay">
                <button
                  className="overlay-button"
                  onClick={() => handleViewPortfolio(profile)}
                >
                  <i className="fas fa-eye"></i> View Portfolio
                </button>
              </div>
            </div>
            <div className="portfolio-info">
              <h3 className="portfolio-name">{`${profile.firstName} ${profile.lastName}`}</h3>
              <p className="portfolio-role">{profile.role}</p>
              <p className="portfolio-summary">{profile.professionalSummary}</p>
              
              <div className="portfolio-stats">
                <div className="stat-item">
                  <i className="fas fa-project-diagram"></i>
                  <span>{profile.projectCount} projects</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>{profile.college}</span>
                </div>
              </div>
              
              <div className="portfolio-skills">
                {profile.skills.split(',').slice(0, 3).map((skill, index) => {
                  const skillName = skill.split(':')[0].trim();
                  return (
                    <span key={index} className="skill-tag">
                      {skillName}
                    </span>
                  );
                })}
                {profile.skills.split(',').length > 3 && (
                  <span className="skill-tag more">
                    +{profile.skills.split(',').length - 3} more
                  </span>
                )}
              </div>
              
              <button
                className="view-portfolio-button"
                onClick={() => handleViewPortfolio(profile)}
              >
                <i className="fas fa-arrow-right"></i> View Full Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="inspiration-section">
        <h2 className="section-title">Get Inspired</h2>
        <p className="section-description">
          These portfolios showcase different approaches to presenting academic and professional achievements.
          Notice how each student highlights their unique strengths and experiences.
        </p>
        <div className="inspiration-tips">
          <div className="tip-item">
            <i className="fas fa-lightbulb"></i>
            <span>Use clear, professional language in your summary</span>
          </div>
          <div className="tip-item">
            <i className="fas fa-star"></i>
            <span>Highlight your most relevant skills and projects</span>
          </div>
          <div className="tip-item">
            <i className="fas fa-images"></i>
            <span>Include a professional profile photo</span>
          </div>
          <div className="tip-item">
            <i className="fas fa-trophy"></i>
            <span>Quantify your achievements where possible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the FeaturedPortfoliosPage component for use in other parts of the application
export default FeaturedPortfoliosPage;