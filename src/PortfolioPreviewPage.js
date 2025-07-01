import React from "react";

const PortfolioPreviewPage = ({ data, handleEditDetails }) => {
  const parseSkills = (skillsString) => {
    return skillsString
      .split(",")
      .map((skillPair) => {
        const parts = skillPair.split(":");
        const name = parts[0] ? parts[0].trim() : "Unnamed Skill";
        const level = parts[1] ? parseInt(parts[1].trim(), 10) : 0;
        return { name, level: Math.min(100, Math.max(0, level)) }; // Clamp level between 0-100
      })
      .filter((skill) => skill.name !== "Unnamed Skill");
  };

  const parseProjects = (projectsString) => {
    return projectsString
      .split("__")
      .map((projectEntry) => {
        const parts = projectEntry.split("||");
        const title = parts[0] ? parts[0].trim() : "Untitled Project";
        const description = parts[1]
          ? parts[1].trim()
          : "No description provided.";
        const technologies = parts[2]
          ? parts[2].split(",").map((tech) => tech.trim())
          : [];
        return { title, description, technologies };
      })
      .filter((project) => project.title !== "Untitled Project");
  };

  const parsedSkills = parseSkills(data.skills);
  const parsedProjects = parseProjects(data.projects);

  return (
    <div
      className="submitted-portfolio-card fade-in"
      id="submittedPortfolioCard"
    >
      {/* Header Section */}
      <div className="portfolio-header">
        <div className="profile-photo-container">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt="User  Profile"
              className="profile-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.querySelector(
                  ".fas.fa-user-circle"
                ).style.display = "block";
              }}
            />
          ) : (
            <i className="fas fa-user-circle"></i>
          )}
          <h1 className="header-name">{`${data.firstName} ${data.lastName}`}</h1>
          <p className="header-title">Computer Science Student</p>
          <p className="header-bio">{data.professionalSummary}</p>
          <button className="download-resume-button">
            <i className="fas fa-download"></i> Download Resume
          </button>
        </div>
      </div>

      <div className="portfolio-content">
        {/* Skills Section (Bar Chart) */}
        <div className="portfolio-section">
          <h2 className="section-title">
            <i className="fas fa-chart-bar"></i> Skills
          </h2>
          <div className="skills-grid">
            {parsedSkills.length > 0 ? (
              parsedSkills.map((skill, index) => (
                <div className="skill-bar-item" key={index}>
                  <span className="skill-name">{skill.name}</span>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ "--skill-level": `${skill.level}%` }}
                    ></div>
                    <span className="skill-level-text">{skill.level}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">No skills entered to display.</p>
            )}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="portfolio-section">
          <h2 className="section-title">
            <i className="fas fa-code-branch"></i> Featured Projects
          </h2>
          <div className="projects-grid">
            {parsedProjects.length > 0 ? (
              parsedProjects.map((project, index) => (
                <div className="project-card" key={index}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="view-details-button">View Details</button>
                </div>
              ))
            ) : (
              <p className="no-data-message">No projects entered to display.</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="portfolio-section">
          <h2 className="section-title">
            <i className="fas fa-graduation-cap"></i> Education
          </h2>
          <div className="education-details">
            <div className="detail-item">
              <strong>Degree:</strong> <span>{data.degree}</span>
            </div>
            <div className="detail-item">
              <strong>College:</strong> <span>{data.college}</span>
            </div>
            <div className="detail-item">
              <strong>CGPA/GPA:</strong> <span>{data.cgpa}</span>
            </div>
          </div>
        </div>

        <button className="edit-portfolio-button" onClick={handleEditDetails}>
          Edit Portfolio Details
        </button>
      </div>
    </div>
  );
};

export default PortfolioPreviewPage;
