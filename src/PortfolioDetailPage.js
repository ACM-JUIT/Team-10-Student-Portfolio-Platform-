// PortfolioDetailPage.js
import React from "react";
import { useHistory } from "react-router-dom";

const PortfolioDetailPage = ({ portfolio }) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="portfolio-detail-container">
      <button className="back-button" onClick={handleBack}>
        Back to Portfolios
      </button>
      <div className="portfolio-card">
        <div className="portfolio-image-container">
          <img 
            src={portfolio.imageUrl || `https://placehold.co/200x200/6B7280/FFFFFF?text=${portfolio.firstName[0]}${portfolio.lastName[0]}`} 
            alt={`${portfolio.firstName} ${portfolio.lastName}'s profile`} 
          />
        </div>
        <div className="portfolio-info">
          <h2>{portfolio.firstName} {portfolio.lastName}</h2>
          <p className="portfolio-role">{portfolio.degree}</p>
          <p className="portfolio-college">{portfolio.college}</p>
          <p className="portfolio-summary">{portfolio.professionalSummary}</p>
          <div className="portfolio-skills">
            {portfolio.skills.split(',').map((skill, index) => (
              <span key={index} className="skill-tag">{skill.split(':')[0]}</span>
            ))}
          </div>
          <div className="portfolio-projects">
            <h3>Projects:</h3>
            {portfolio.projects.split('__').map((project, index) => (
              <div key={index} className="project-item">
                <p>{project.split('||')[0]}</p>
                <p>{project.split('||')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;