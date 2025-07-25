import React, { useState, useEffect } from "react";
import { apiService } from "./config/api";

const BrowsePortfoliosPage = ({ handleViewPortfolio }) => {
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

  return (
    <div className="browse-portfolios-container fade-in">
      <div className="browse-header">
        <h1 className="page-title">Browse Student Portfolios</h1>
        <p className="page-subtitle">
          Discover amazing work from talented students around the world
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="browse-controls">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search by name, college, skills, or degree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
            {isSearching && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                className="clear-search-btn"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </form>

        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <button 
            className={`sort-btn ${sortBy === 'createdAt' ? 'active' : ''}`}
            onClick={() => handleSortChange('createdAt')}
          >
            Date Created
            {sortBy === 'createdAt' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'firstName' ? 'active' : ''}`}
            onClick={() => handleSortChange('firstName')}
          >
            Name
            {sortBy === 'firstName' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'college' ? 'active' : ''}`}
            onClick={() => handleSortChange('college')}
          >
            College
            {sortBy === 'college' && (
              <i className={`fas fa-arrow-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            )}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        {isSearching ? (
          <p>Found <strong>{totalCount}</strong> portfolios matching "{searchQuery}"</p>
        ) : (
          <p>Showing <strong>{totalCount}</strong> total portfolios</p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Loading portfolios...</p>
        </div>
      )}

      {/* Portfolios Grid */}
      {!loading && (
        <>
          {portfolios.length > 0 ? (
            <div className="portfolios-grid">
              {portfolios.map((portfolio) => (
                <div key={portfolio._id} className="portfolio-card">
                  <div className="portfolio-card-header">
                    {portfolio.imageUrl ? (
                      <img 
                        src={portfolio.imageUrl} 
                        alt={`${portfolio.firstName} ${portfolio.lastName}`}
                        className="portfolio-card-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="portfolio-card-placeholder" style={{display: portfolio.imageUrl ? 'none' : 'flex'}}>
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  
                  <div className="portfolio-card-content">
                    <h3 className="portfolio-card-name">
                      {portfolio.firstName} {portfolio.lastName}
                    </h3>
                    
                    <div className="portfolio-card-info">
                      <p className="portfolio-card-degree">
                        <i className="fas fa-graduation-cap"></i>
                        {portfolio.degree}
                      </p>
                      <p className="portfolio-card-college">
                        <i className="fas fa-university"></i>
                        {portfolio.college}
                      </p>
                      <p className="portfolio-card-gpa">
                        <i className="fas fa-star"></i>
                        CGPA: {portfolio.cgpa}
                      </p>
                    </div>

                    <p className="portfolio-card-summary">
                      {portfolio.professionalSummary.substring(0, 120)}
                      {portfolio.professionalSummary.length > 120 ? '...' : ''}
                    </p>

                    <div className="portfolio-card-meta">
                      <span className="created-date">
                        <i className="fas fa-calendar-alt"></i>
                        {formatDate(portfolio.createdAt)}
                      </span>
                    </div>

                    <div className="portfolio-card-actions">
                      <button 
                        className="view-portfolio-btn primary"
                        onClick={() => handleViewPortfolio(portfolio)}
                      >
                        <i className="fas fa-eye"></i>
                        View Portfolio
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>No portfolios found</h3>
              {isSearching ? (
                <p>Try adjusting your search terms or <button onClick={handleClearSearch} className="link-btn">browse all portfolios</button></p>
              ) : (
                <p>No portfolios have been created yet. Be the first!</p>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>

              <div className="pagination-numbers">
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
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowsePortfoliosPage;