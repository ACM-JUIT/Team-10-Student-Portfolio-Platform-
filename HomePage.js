import React from "react";

const HomePage = ({ setCurrentPage }) => {
  // Sample profiles data
  const featuredProfiles = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://placehold.co/200x200?text=SJ",
      skills: ["JavaScript", "React", "Node.js"],
      projects: 12,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Science Student",
      image: "https://placehold.co/200x200?text=MC",
      skills: ["Python", "Machine Learning", "SQL"],
      projects: 8,
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "UX Design Student",
      image: "https://placehold.co/200x200?text=EW",
      skills: ["Figma", "UI Design", "Prototyping"],
      projects: 5,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Electrical Engineering Student",
      image: "https://placehold.co/200x200?text=DK",
      skills: ["PCB Design", "Embedded Systems", "C++"],
      projects: 7,
    },
  ];

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

      <div className="featured-profiles-section">
        <h2 className="section-title">Featured Student Portfolios</h2>
        <div className="profiles-grid">
          {featuredProfiles.map((profile) => (
            <div className="profile-card" key={profile.id}>
              <div className="profile-image-container">
                <img src={profile.image} alt={`${profile.name}'s profile`} />
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p className="profile-role">{profile.role}</p>
                <div className="profile-stats">
                  <span className="projects-count">
                    <i className="fas fa-project-diagram"></i>{" "}
                    {profile.projects} projects
                  </span>
                </div>
                <div className="profile-skills">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className="view-profile-button"
                  onClick={() => setCurrentPage("samples")}
                >
                  View Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
