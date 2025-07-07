import React, { useState, useEffect } from "react";
import { apiService } from "./config/api";

const HomePage = ({ setCurrentPage }) => {
  // State to store portfolios fetched from backend
  const [portfolios, setPortfolios] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);
  // State for portfolio statistics
  const [stats, setStats] = useState(null);
  // State for pagination
  const [currentPage, setCurrentPageState] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Function to fetch portfolios from backend
  const fetchPortfolios = async (page = 1, limit = 8) => {
    try {
      setLoading(true);
      setError(null);
      
      const skip = (page - 1) * limit;
      const response = await apiService.getPortfolios({ 
        limit, 
        skip, 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      });
      
      // Extract portfolios array from response
      setPortfolios(response.portfolios || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.totalCount || 0);
      setCurrentPageState(page);
      
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      setError(err.message);
      // Fallback to sample data if backend fails
      setPortfolios(getSampleProfiles());
      setTotalCount(getSampleProfiles().length);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch portfolio statistics
  const fetchStats = async () => {
    try {
      const statsData = await apiService.getPortfolioStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Set default stats if backend fails
      setStats({
        totalPortfolios: 0,
        recentPortfolios: 0,
        topColleges: [],
        topDegrees: []
      });
    }
  };

  // Fallback sample profiles in case backend is not available
  const getSampleProfiles = () => [
    {
      _id: "sample1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      imageUrl: "https://placehold.co/200x200/4ADE80/FFFFFF?text=SJ",
      professionalSummary: "Computer Science student passionate about web development and machine learning.",
      skills: "JavaScript:85, React:90, Node.js:80, Python:75, SQL:70",
      projects: "Portfolio Website||Personal portfolio showcasing my projects and skills||React,CSS,JavaScript__Weather App||Real-time weather application with API integration||JavaScript,API,HTML",
      college: "University of Technology",
      degree: "B.Sc. Computer Science",
      cgpa: "3.8",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "sample2",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@example.com",
      imageUrl: "https://placehold.co/200x200/EC4899/FFFFFF?text=MC",
      professionalSummary: "Data Science student with expertise in machine learning and statistical analysis.",
      skills: "Python:90, Machine Learning:85, SQL:80, R:75, TensorFlow:70",
      projects: "Sales Prediction Model||ML model for predicting sales trends||Python,Scikit-learn,Pandas__Data Visualization Dashboard||Interactive dashboard for business analytics||Python,Plotly,Dash",
      college: "Institute of Data Science",
      degree: "M.Sc. Data Science",
      cgpa: "3.9",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "sample3",
      firstName: "Emma",
      lastName: "Williams",
      email: "emma.williams@example.com",
      imageUrl: "https://placehold.co/200x200/3B82F6/FFFFFF?text=EW",
      professionalSummary: "UX Design student focused on creating intuitive and accessible user experiences.",
      skills: "Figma:95, UI Design:90, Prototyping:85, Adobe XD:80, User Research:75",
      projects: "E-commerce Mobile App||Complete UX/UI design for shopping app||Figma,Prototyping,User Research__Accessibility Dashboard||Design system for accessible web applications||Figma,Adobe XD,Design Systems",
      college: "Design Institute",
      degree: "B.Des. User Experience Design",
      cgpa: "3.7",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "sample4",
      firstName: "David",
      lastName: "Kim",
      email: "david.kim@example.com",
      imageUrl: "https://placehold.co/200x200/F59E0B/FFFFFF?text=DK",
      professionalSummary: "Electrical Engineering student specializing in embedded systems and IoT.",
      skills: "C++:90, PCB Design:85, Embedded Systems:88, Arduino:80, IoT:75",
      projects: "Smart Home System||IoT-based home automation system||Arduino,C++,IoT__Traffic Light Controller||Microcontroller-based traffic management||C++,Embedded Systems,Hardware",
      college: "Engineering College",
      degree: "B.E. Electrical Engineering",
      cgpa: "3.6",
      createdAt: new Date().toISOString(),
    },
  ];

  // useEffect to fetch portfolios when component mounts
  useEffect(() => {
    fetchPortfolios();
    fetchStats();
  }, []);

  // Function to parse skills string and return array of top skills
  const parseSkills = (skillsString) => {
    if (!skillsString) return [];
    
    return skillsString
      .split(',')
      .map(skill => skill.trim().split(':')[0])
      .slice(0, 3); // Show only top 3 skills
  };

  // Function to count projects from projects string
  const countProjects = (projectsString) => {
    if (!projectsString) return 0;
    
    return projectsString.split('__').length;
  };

  // Function to generate image URL if not provided
  const getImageUrl = (portfolio) => {
    if (portfolio.imageUrl && portfolio.imageUrl.trim() !== '') {
      return portfolio.imageUrl;
    }
    
    // Generate placeholder with initials
    const initials = `${portfolio.firstName?.[0] || ''}${portfolio.lastName?.[0] || ''}`;
    const colors = ['4ADE80', 'EC4899', '3B82F6', 'F59E0B', '8B5CF6', 'EF4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://placehold.co/200x200/${randomColor}/FFFFFF?text=${initials}`;
  };

  // Function to get degree type for display
  const getDegreeDisplay = (degree) => {
    if (!degree) return "Student";
    
    // Extract degree type for better display
    if (degree.includes("Computer Science") || degree.includes("CS")) return "Computer Science Student";
    if (degree.includes("Data Science")) return "Data Science Student";
    if (degree.includes("Engineering")) return "Engineering Student";
    if (degree.includes("Design")) return "Design Student";
    
    return `${degree} Student`;
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchPortfolios(page);
    }
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination-container">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        <div className="pagination-info">
          Page {currentPage} of {totalPages} ({totalCount} total portfolios)
        </div>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) {
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
          <h2 className="section-title">Loading Student Portfolios...</h2>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Statistics Section */}
        {stats && !error && (
          <div className="stats-section">
            <div className="stat-item">
              <h3>{stats.totalPortfolios}</h3>
              <p>Total Portfolios</p>
            </div>
            <div className="stat-item">
              <h3>{stats.recentPortfolios}</h3>
              <p>This Week</p>
            </div>
            <div className="stat-item">
              <h3>{stats.topColleges?.length || 0}</h3>
              <p>Universities</p>
            </div>
          </div>
        )}
      </div>

      <div className="featured-profiles-section">
        <h2 className="section-title">
          {error ? "Featured Student Portfolios (Demo)" : "Featured Student Portfolios"}
        </h2>
        
        {error && (
          <div className="error-message">
            <p>⚠️ Backend connection failed. Showing sample portfolios.</p>
            <button onClick={() => fetchPortfolios()} className="retry-button">
              <i className="fas fa-sync-alt"></i> Retry Connection
            </button>
          </div>
        )}

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
                <div className="profile-image-container">
                  <img 
                    src={getImageUrl(portfolio)} 
                    alt={`${portfolio.firstName} ${portfolio.lastName}'s profile`}
                    onError={(e) => {
                      const initials = `${portfolio.firstName?.[0] || ''}${portfolio.lastName?.[0] || ''}`;
                      e.target.src = `https://placehold.co/200x200/6B7280/FFFFFF?text=${initials}`;
                    }}
                  />
                  <div className="profile-badge">
                    <span className="badge-text">{formatDate(portfolio.createdAt)}</span>
                  </div>
                </div>
                <div className="profile-info">
                  <h3>{portfolio.firstName} {portfolio.lastName}</h3>
                  <p className="profile-role">{getDegreeDisplay(portfolio.degree)}</p>
                  <p className="profile-college">{portfolio.college}</p>
                  <div className="profile-stats">
                    <span className="projects-count">
                      <i className="fas fa-project-diagram"></i>{" "}
                      {countProjects(portfolio.projects)} projects
                    </span>
                    <span className="cgpa-display">
                      <i className="fas fa-star"></i> CGPA: {portfolio.cgpa || 'N/A'}
                    </span>
                  </div>
                  <div className="profile-skills">
                    {parseSkills(portfolio.skills).map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="profile-summary">
                    <p>{portfolio.professionalSummary?.substring(0, 100) || 'No summary available'}...</p>
                  </div>
                  <button
                    className="view-profile-button"
                    onClick={() => setCurrentPage("samples")}
                  >
                    <i className="fas fa-eye"></i> View Portfolio
                  </button>
                </div>
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