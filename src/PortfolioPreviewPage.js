import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for PortfolioPreviewPage
const PortfolioPreviewPage = ({ data, handleEditDetails }) => {
  // Function to parse skills from a string format
  const parseSkills = (skillsString) => {
    return skillsString
      .split(",") // Split the string by commas to get individual skill pairs
      .map((skillPair) => {
        const parts = skillPair.split(":"); // Split each skill pair by colon
        const name = parts[0] ? parts[0].trim() : "Unnamed Skill"; // Get skill name, default to "Unnamed Skill"
        const level = parts[1] ? parseInt(parts[1].trim(), 10) : 0; // Get skill level, default to 0
        return { name, level: Math.min(100, Math.max(0, level)) }; // Clamp level between 0-100
      })
      .filter((skill) => skill.name !== "Unnamed Skill"); // Filter out unnamed skills
  };

  // Function to parse projects from a string format
  const parseProjects = (projectsString) => {
    return projectsString
      .split("__") // Split the string by double underscores to get individual project entries
      .map((projectEntry) => {
        const parts = projectEntry.split("||"); // Split each project entry by double pipes
        const title = parts[0] ? parts[0].trim() : "Untitled Project"; // Get project title, default to "Untitled Project"
        const description = parts[1]
          ? parts[1].trim()
          : "No description provided."; // Get project description, default to a placeholder
        const technologies = parts[2]
          ? parts[2].split(",").map((tech) => tech.trim()) // Split technologies by comma
          : []; // Default to an empty array if no technologies are provided
        return { title, description, technologies }; // Return an object for the project
      })
      .filter((project) => project.title !== "Untitled Project"); // Filter out untitled projects
  };

  // Parsing skills and projects from the provided data
  const parsedSkills = parseSkills(data.skills);
  const parsedProjects = parseProjects(data.projects);

  return (
    <div
      className="submitted-portfolio-card fade-in"
      id="submittedPortfolioCard" // Main container for the portfolio preview
    >
      {/* Header Section */}
      <div className="portfolio-header">
        <div className="profile-photo-container">
          {data.imageUrl ? ( // Conditional rendering for profile image
            <img
              src={data.imageUrl}
              alt="User  Profile" // Alt text for the image
              className="profile-image"
              onError={(e) => {
                // Error handling for image loading
                e.target.style.display = "none"; // Hide the image if it fails to load
                e.target.parentElement.querySelector(
                  ".fas.fa-user-circle"
                ).style.display = "block"; // Show the default user icon
              }}
            />
          ) : (
            <i className="fas fa-user-circle"></i> // Default user icon if no image is provided
          )}
          <h1 className="header-name">{`${data.firstName} ${data.lastName}`}</h1>{" "}
          {/* Displaying user's full name */}
          <p className="header-title">Computer Science Student</p>{" "}
          {/* Static title for the user */}
          <p className="header-bio">{data.professionalSummary}</p>{" "}
          {/* Displaying user's professional summary */}
          <button className="download-resume-button">
            {" "}
            {/* Button to download resume */}
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
            {parsedSkills.length > 0 ? ( // Conditional rendering based on the presence of skills
              parsedSkills.map(
                (
                  skill,
                  index // Mapping over parsed skills to display them
                ) => (
                  <div className="skill-bar-item" key={index}>
                    <span className="skill-name">{skill.name}</span>{" "}
                    {/* Displaying skill name */}
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ "--skill-level": `${skill.level}%` }} // Setting the skill level for the progress bar
                      ></div>
                      <span className="skill-level-text">{skill.level}%</span>{" "}
                      {/* Displaying skill level percentage */}
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="no-data-message">No skills entered to display.</p> // Message if no skills are available
            )}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="portfolio-section">
          <h2 className="section-title">
            <i className="fas fa-code-branch"></i> Featured Projects
          </h2>
          <div className="projects-grid">
            {parsedProjects.length > 0 ? ( // Conditional rendering based on the presence of projects
              parsedProjects.map(
                (
                  project,
                  index // Mapping over parsed projects to display them
                ) => (
                  <div className="project-card" key={index}>
                    <h3>{project.title}</h3> {/* Displaying project title */}
                    <p>{project.description}</p>{" "}
                    {/* Displaying project description */}
                    <div className="project-tech-tags">
                      {project.technologies.map(
                        (
                          tech,
                          techIndex // Mapping over technologies to display tags
                        ) => (
                          <span key={techIndex} className="tech-tag">
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                    <button className="view-details-button">
                      View Details
                    </button>{" "}
                    {/* Button to view project details */}
                  </div>
                )
              )
            ) : (
              <p className="no-data-message">No projects entered to display.</p> // Message if no projects are available
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
              <strong>Degree:</strong> <span>{data.degree}</span>{" "}
              {/* Displaying degree information */}
            </div>
            <div className="detail-item">
              <strong>College:</strong> <span>{data.college}</span>{" "}
              {/* Displaying college information */}
            </div>
            <div className="detail-item">
              <strong>CGPA/GPA:</strong> <span>{data.cgpa}</span>{" "}
              {/* Displaying CGPA/GPA information */}
            </div>
          </div>
        </div>

        <button className="edit-portfolio-button" onClick={handleEditDetails}>
          {" "}
          {/* Button to edit portfolio details */}
          Edit Portfolio Details
        </button>
      </div>
    </div>
  );
};

export default PortfolioPreviewPage; // Exporting the PortfolioPreviewPage component for use in other parts of the application
