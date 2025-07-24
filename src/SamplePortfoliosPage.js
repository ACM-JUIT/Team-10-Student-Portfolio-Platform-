import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for SamplePortfoliosPage
const SamplePortfoliosPage = ({ samplePortfolios, handleEditDetails, handleViewPortfolio }) => {
  return (
    <div className="sample-portfolios-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Sample Portfolio Templates</h1>
        <p className="page-subtitle">
          Explore our template samples to understand the structure and format.
          Use these as inspiration for creating your own unique portfolio.
        </p>
      </div>

      <div className="samples-grid">
        {samplePortfolios.map((portfolio) => (
          <div className="sample-card" key={portfolio.id}>
            <div className="sample-header">
              <div className="sample-image-container">
                {portfolio.imageUrl ? (
                  <img src={portfolio.imageUrl} alt={`${portfolio.firstName} ${portfolio.lastName}'s profile`} />
                ) : (
                  <i className="fas fa-user-circle"></i>
                )}
              </div>
              <div className="sample-info">
                <h3 className="sample-name">{`${portfolio.firstName} ${portfolio.lastName}`}</h3>
                <p className="sample-email">{portfolio.email}</p>
                <p className="sample-degree">{portfolio.degree}</p>
              </div>
            </div>

            <div className="sample-content">
              <div className="sample-summary">
                <h4>Professional Summary</h4>
                <p>{portfolio.professionalSummary}</p>
              </div>

              <div className="sample-skills">
                <h4>Top Skills</h4>
                <div className="skills-preview">
                  {portfolio.skills.split(',').slice(0, 3).map((skill, index) => {
                    const [name, level] = skill.split(':');
                    return (
                      <div key={index} className="skill-preview-item">
                        <span className="skill-name">{name?.trim()}</span>
                        <span className="skill-level">{level?.trim()}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="sample-projects">
                <h4>Featured Projects</h4>
                <div className="projects-count">
                  <i className="fas fa-code-branch"></i>
                  <span>{portfolio.projects.split('__').length} projects showcased</span>
                </div>
              </div>
            </div>

            <div className="sample-actions">
              <button
                className="sample-button view"
                onClick={() => handleViewPortfolio(portfolio)}
              >
                <i className="fas fa-eye"></i> View Portfolio
              </button>
              <button
                className="sample-button edit"
                onClick={handleEditDetails}
              >
                <i className="fas fa-edit"></i> Use This Template
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="template-features">
        <h2 className="section-title">What's Included in Our Templates</h2>
        <div className="features-list">
          <div className="feature-item">
            <i className="fas fa-user"></i>
            <div className="feature-content">
              <h3>Personal Information</h3>
              <p>Professional headshot, contact details, and personal branding</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-chart-bar"></i>
            <div className="feature-content">
              <h3>Skills Visualization</h3>
              <p>Interactive progress bars showing your proficiency levels</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-project-diagram"></i>
            <div className="feature-content">
              <h3>Project Showcase</h3>
              <p>Detailed project descriptions with technologies used</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-graduation-cap"></i>
            <div className="feature-content">
              <h3>Education Details</h3>
              <p>Academic achievements, degree information, and GPA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="get-started-section">
        <h2>Ready to Create Your Portfolio?</h2>
        <p>Start building your professional portfolio using our easy-to-use form.</p>
        <button
          className="get-started-button"
          onClick={handleEditDetails}
        >
          <i className="fas fa-plus"></i> Create New Portfolio
        </button>
      </div>
    </div>
  );
};

// Exporting the SamplePortfoliosPage component for use in other parts of the application
export default SamplePortfoliosPage;