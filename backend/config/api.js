// config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Create a new portfolio
  createPortfolio: async (portfolioData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create portfolio');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      throw error;
    }
  },

  // Get all portfolios with pagination
  getPortfolios: async (options = {}) => {
    try {
      const { limit = 10, skip = 0, sortBy = 'createdAt', sortOrder = 'desc' } = options;
      
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`${API_BASE_URL}/portfolios?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }
  },

  // Get a specific portfolio by ID
  getPortfolioById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Update a portfolio
  updatePortfolio: async (id, portfolioData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update portfolio');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating portfolio:', error);
      throw error;
    }
  },

  // Delete a portfolio
  deletePortfolio: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete portfolio');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      throw error;
    }
  },

  // Search portfolios
  searchPortfolios: async (query, options = {}) => {
    try {
      const { limit = 10, skip = 0 } = options;
      
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/portfolios/search/${encodeURIComponent(query)}?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to search portfolios');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching portfolios:', error);
      throw error;
    }
  },

  // Get portfolio statistics
  getPortfolioStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios/stats/overview`);

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio statistics');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolio statistics:', error);
      throw error;
    }
  },
};