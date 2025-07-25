// src/api.js

// Change this URL if your backend runs elsewhere
const BACKEND_URL = "http://localhost:5000/api/portfolios";

export const apiService = {
  createPortfolio: async (formData) => {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create portfolio");
    }
    // Expecting backend returns { portfolio: { ... } }
    return await response.json();
  },

  // You can add other API functions here in future, if needed
};
