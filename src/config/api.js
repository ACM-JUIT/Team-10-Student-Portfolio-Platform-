// API Configuration and Service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Service class to handle all backend interactions
class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse JSON, fallback to text if it fails
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Portfolio-specific methods
  async createPortfolio(portfolioData) {
    return this.post('/portfolios', portfolioData);
  }

  async getPortfolios(params = {}) {
    // Default parameters
    const defaultParams = {
      limit: 10,
      skip: 0,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      ...params
    };

    return this.get('/portfolios', defaultParams);
  }

  async getPortfolioById(id) {
    return this.get(`/portfolios/${id}`);
  }

  async updatePortfolio(id, portfolioData) {
    return this.put(`/portfolios/${id}`, portfolioData);
  }

  async deletePortfolio(id) {
    return this.delete(`/portfolios/${id}`);
  }

  async getPortfolioStats() {
    return this.get('/portfolios/stats');
  }

  // Search portfolios
  async searchPortfolios(query, params = {}) {
    const searchParams = {
      q: query,
      ...params
    };
    return this.get('/portfolios/search', searchParams);
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export the class as well for testing purposes
export { ApiService };

// Default export
export default apiService;