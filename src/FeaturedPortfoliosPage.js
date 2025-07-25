import React, { useState, useEffect } from "react";
import { apiService } from "./config/api";

const FeaturedPortfoliosPage = ({ featuredProfiles, handleViewPortfolio }) => {
  // State from BrowsePortfoliosPage
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSearching, setIsSearching] = useState(false);

  const portfoliosPerPage = 12;

  useEffect(() => {
    if (searchQuery.trim()) {
      searchPortfolios();
    } else {
      fetchPortfolios();
    }
  }, [currentPage, sortBy, sortOrder]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * portfoliosPerPage;
      const response = await apiService.getPortfolios({
        limit: portfoliosPerPage,
        skip,
        sortBy,
        sortOrder
      });
      
      setPortfolios(response.portfolios || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.totalCount || 0);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const searchPortfolios = async () => {
    try {
      setLoading(true);
      setIsSearching(true);
      const skip = (currentPage - 1) * portfoliosPerPage;
      const response = await apiService.searchPortfolios(searchQuery, {
        limit: portfoliosPerPage,
        skip
      });
      
      setPortfolios(response.portfolios || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.totalCount || 0);
    } catch (error) {
      console.error('Error searching portfolios:', error);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchQuery.trim()) {
      searchPortfolios();
    } else {
      setIsSearching(false);
      fetchPortfolios();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    fetchPortfolios();
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render featured portfolio card (from original FeaturedPortfoliosPage)
  const renderFeaturedCard = (profile) => (
    <div className="portfolio-card" key={`featured-${profile.id}`}>
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
  );

  // Render fetched portfolio card (from original BrowsePortfoliosPage)
  const renderFetchedCard = (portfolio) => (
    <div key={`fetched-${portfolio._id}`} className="portfolio-card">
      <div className="portfolio-image-container">
        {portfolio.imageUrl ? (
          <>
            <img 
              src={portfolio.imageUrl} 
              alt={`${portfolio.firstName} ${portfolio.lastName}`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="portfolio-overlay" style={{display: 'none'}}>
              <button
                className="overlay-button"
                onClick={() => handleViewPortfolio(portfolio)}
              >
                <i className="fas fa-eye"></i> View Portfolio
              </button>
            </div>
          </>
        ) : (
          <div className="portfolio-overlay" style={{display: 'flex', position: 'static', opacity: 1, background: 'var(--bg-elevated)'}}>
            <i className="fas fa-user" style={{fontSize: '3rem', color: 'var(--text-muted)'}}></i>
          </div>
        )}
      </div>
      
      <div className="portfolio-info">
        <h3 className="portfolio-name">
          {portfolio.firstName} {portfolio.lastName}
        </h3>
        
        <div className="portfolio-stats">
          <div className="stat-item">
            <i className="fas fa-graduation-cap"></i>
            <span>{portfolio.degree}</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-university"></i>
            <span>{portfolio.college}</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-star"></i>
            <span>CGPA: {portfolio.cgpa}</span>
          </div>
        </div>

        <p className="portfolio-summary">
          {portfolio.professionalSummary.substring(0, 120)}
          {portfolio.professionalSummary.length > 120 ? '...' : ''}
        </p>

        <div className="portfolio-stats" style={{marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)'}}>
          <span className="stat-item">
            <i className="fas fa-calendar-alt"></i>
            <span>{formatDate(portfolio.createdAt)}</span>
          </span>
        </div>

        <button 
          className="view-portfolio-button"
          onClick={() => handleViewPortfolio(portfolio)}
        >
          <i className="fas fa-eye"></i> View Portfolio
        </button>
      </div>
    </div>
  );

  // Combine featured and fetched portfolios for display
  const getAllPortfolios = () => {
    const allPortfolios = [];
    
    // Add featured portfolios first (if not searching)
    if (!isSearching && featuredProfiles && featuredProfiles.length > 0) {
      featuredProfiles.forEach(profile => {
        allPortfolios.push({
          ...profile,
          isFeatured: true,
          displayId: `featured-${profile.id}`
        });
      });
    }
    
    // Add fetched portfolios
    if (portfolios && portfolios.length > 0) {
      portfolios.forEach(portfolio => {
        allPortfolios.push({
          ...portfolio,
          isFeatured: false,
          displayId: `fetched-${portfolio._id}`
        });
      });
    }
    
    return allPortfolios;
  };

  const allPortfolios = getAllPortfolios();
  const totalDisplayCount = isSearching ? totalCount : totalCount + (featuredProfiles ? featuredProfiles.length : 0);

  return (
    <div className="featured-portfolios-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Student Portfolios</h1>
        <p className="page-subtitle">
          Discover inspiring portfolios from talented students across various disciplines.
          Get ideas for your own portfolio and see what's possible with StudentFolio.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="browse-controls" style={{marginBottom: 'var(--space-2xl)', background: 'var(--card-bg)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)'}}>
        <form onSubmit={handleSearch} className="search-form" style={{marginBottom: 'var(--space-lg)'}}>
          <div className="search-input-group" style={{display: 'flex', gap: 'var(--space-sm)', alignItems: 'center'}}>
            <input
              type="text"
              placeholder="Search by name, college, skills, or degree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: 'var(--space-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
            <button type="submit" style={{
              background: 'var(--gradient-blue)',
              color: 'white',
              border: 'none',
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              minWidth: '50px'
            }}>
              <i className="fas fa-search"></i>
            </button>
            {isSearching && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  minWidth: '50px'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </form>

        <div className="sort-controls" style={{display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap'}}>
          <span style={{color: 'var(--text-secondary)', fontWeight: '500'}}>Sort by:</span>
          <button 
            className={`sort-btn ${sortBy === 'createdAt' ? 'active' : ''}`}
            onClick={() => handleSortChange('createdAt')}
            style={{
              background: sortBy === 'createdAt' ? 'var(--primary-blue)' : 'var(--bg-elevated)',
              color: sortBy === 'createdAt' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-sm) var(--space-md)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Date Created
            {sortBy === 'createdAt' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'firstName' ? 'active' : ''}`}
            onClick={() => handleSortChange('firstName')}
            style={{
              background: sortBy === 'firstName' ? 'var(--primary-blue)' : 'var(--bg-elevated)',
              color: sortBy === 'firstName' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-sm) var(--space-md)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Name
            {sortBy === 'firstName' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'college' ? 'active' : ''}`}
            onClick={() => handleSortChange('college')}
            style={{
              background: sortBy === 'college' ? 'var(--primary-blue)' : 'var(--bg-elevated)',
              color: sortBy === 'college' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: 'var(--space-sm) var(--space-md)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            College
            {sortBy === 'college' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info" style={{marginBottom: 'var(--space-xl)', textAlign: 'center'}}>
        {isSearching ? (
          <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem'}}>
            Found <strong style={{color: 'var(--text-primary)'}}>{totalCount}</strong> portfolios matching "{searchQuery}"
          </p>
        ) : (
          <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem'}}>
            Showing <strong style={{color: 'var(--text-primary)'}}>{totalDisplayCount}</strong> total portfolios 
            {featuredProfiles && featuredProfiles.length > 0 && (
              <span> (including <strong style={{color: 'var(--primary-blue)'}}>{featuredProfiles.length}</strong> featured)</span>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container" style={{textAlign: 'center', padding: 'var(--space-3xl)'}}>
          <div className="loading-spinner" style={{marginBottom: 'var(--space-lg)'}}>
            <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem', color: 'var(--primary-blue)'}}></i>
          </div>
          <p style={{color: 'var(--text-secondary)'}}>Loading portfolios...</p>
        </div>
      )}

      {/* Portfolios Grid */}
      {!loading && (
        <>
          {allPortfolios.length > 0 ? (
            <div className="portfolios-grid">
              {allPortfolios.map((portfolio) => 
                portfolio.isFeatured ? renderFeaturedCard(portfolio) : renderFetchedCard(portfolio)
              )}
            </div>
          ) : (
            <div className="no-results" style={{
              textAlign: 'center', 
              padding: 'var(--space-3xl)', 
              background: 'var(--card-bg)', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid var(--border-color)'
            }}>
              <div className="no-results-icon" style={{marginBottom: 'var(--space-lg)'}}>
                <i className="fas fa-search" style={{fontSize: '3rem', color: 'var(--text-muted)'}}></i>
              </div>
              <h3 style={{color: 'var(--text-primary)', marginBottom: 'var(--space-md)'}}>No portfolios found</h3>
              {isSearching ? (
                <p style={{color: 'var(--text-secondary)'}}>
                  Try adjusting your search terms or{' '}
                  <button 
                    onClick={handleClearSearch} 
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-blue)',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    browse all portfolios
                  </button>
                </p>
              ) : (
                <p style={{color: 'var(--text-secondary)'}}>No portfolios have been created yet. Be the first!</p>
              )}
            </div>
          )}

          {/* Pagination - only show for fetched results */}
          {totalPages > 1 && (
            <div className="pagination" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginTop: 'var(--space-3xl)',
              padding: 'var(--space-xl)'
            }}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>

              <div className="pagination-numbers" style={{display: 'flex', gap: 'var(--space-xs)'}}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        background: currentPage === pageNum ? 'var(--primary-blue)' : 'var(--bg-elevated)',
                        color: currentPage === pageNum ? 'white' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        padding: 'var(--space-sm) var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        minWidth: '40px'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}

      {/* Inspiration Section - only show when not searching */}
      {!isSearching && (
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
      )}
    </div>
  );
};

export default FeaturedPortfoliosPage;