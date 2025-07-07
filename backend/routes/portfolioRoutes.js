const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// POST route to save portfolio data
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { firstName, lastName, email, professionalSummary, skills, projects, college, degree, cgpa } = req.body;
    
    if (!firstName || !lastName || !email || !professionalSummary || !skills || !projects || !college || !degree || !cgpa) {
      return res.status(400).json({ 
        error: "All required fields must be provided",
        required: ["firstName", "lastName", "email", "professionalSummary", "skills", "projects", "college", "degree", "cgpa"]
      });
    }

    // Check if email already exists
    const existingPortfolio = await Portfolio.findOne({ email: email.toLowerCase() });
    if (existingPortfolio) {
      return res.status(409).json({ 
        error: "Portfolio with this email already exists",
        existingId: existingPortfolio._id
      });
    }

    // Create new portfolio with lowercase email
    const portfolioData = {
      ...req.body,
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      professionalSummary: professionalSummary.trim(),
      skills: skills.trim(),
      projects: projects.trim(),
      college: college.trim(),
      degree: degree.trim(),
      cgpa: cgpa.trim()
    };

    const newPortfolio = new Portfolio(portfolioData);
    await newPortfolio.save();
    
    res.status(201).json({
      message: "Portfolio created successfully",
      portfolio: newPortfolio
    });
  } catch (err) {
    console.error("Error creating portfolio:", err);
    res.status(500).json({ error: "Internal server error while creating portfolio" });
  }
});

// GET route to fetch all portfolios
router.get("/", async (req, res) => {
  try {
    const { limit = 10, skip = 0, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const portfolios = await Portfolio.find()
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-__v'); // Exclude version field
    
    const totalCount = await Portfolio.countDocuments();
    
    res.json({
      portfolios,
      totalCount,
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (err) {
    console.error("Error fetching portfolios:", err);
    res.status(500).json({ error: "Internal server error while fetching portfolios" });
  }
});

// GET route to fetch a specific portfolio by ID
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).select('-__v');
    
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    
    res.json(portfolio);
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid portfolio ID format" });
    }
    res.status(500).json({ error: "Internal server error while fetching portfolio" });
  }
});

// PUT route to update a portfolio
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, professionalSummary, skills, projects, college, degree, cgpa } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !professionalSummary || !skills || !projects || !college || !degree || !cgpa) {
      return res.status(400).json({ 
        error: "All required fields must be provided",
        required: ["firstName", "lastName", "email", "professionalSummary", "skills", "projects", "college", "degree", "cgpa"]
      });
    }

    // Check if email already exists for another portfolio
    const existingPortfolio = await Portfolio.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.params.id } 
    });
    
    if (existingPortfolio) {
      return res.status(409).json({ 
        error: "Portfolio with this email already exists" 
      });
    }

    // Update portfolio
    const updateData = {
      ...req.body,
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      professionalSummary: professionalSummary.trim(),
      skills: skills.trim(),
      projects: projects.trim(),
      college: college.trim(),
      degree: degree.trim(),
      cgpa: cgpa.trim()
    };

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json({
      message: "Portfolio updated successfully",
      portfolio: updatedPortfolio
    });
  } catch (err) {
    console.error("Error updating portfolio:", err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid portfolio ID format" });
    }
    res.status(500).json({ error: "Internal server error while updating portfolio" });
  }
});

// DELETE route to delete a portfolio
router.delete("/:id", async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!deletedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    
    res.json({ 
      message: "Portfolio deleted successfully",
      deletedPortfolio: {
        id: deletedPortfolio._id,
        name: `${deletedPortfolio.firstName} ${deletedPortfolio.lastName}`
      }
    });
  } catch (err) {
    console.error("Error deleting portfolio:", err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid portfolio ID format" });
    }
    res.status(500).json({ error: "Internal server error while deleting portfolio" });
  }
});

// GET route to search portfolios
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10, skip = 0 } = req.query;
    
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    
    const portfolios = await Portfolio.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { college: searchRegex },
        { degree: searchRegex },
        { skills: searchRegex },
        { professionalSummary: searchRegex }
      ]
    })
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .select('-__v');
    
    const totalCount = await Portfolio.countDocuments({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { college: searchRegex },
        { degree: searchRegex },
        { skills: searchRegex },
        { professionalSummary: searchRegex }
      ]
    });
    
    res.json({
      portfolios,
      totalCount,
      searchQuery: query,
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (err) {
    console.error("Error searching portfolios:", err);
    res.status(500).json({ error: "Internal server error while searching portfolios" });
  }
});

// GET route to get portfolio statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalPortfolios = await Portfolio.countDocuments();
    const recentPortfolios = await Portfolio.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });
    
    // Get most common colleges
    const collegeStats = await Portfolio.aggregate([
      { $group: { _id: "$college", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get most common degree types
    const degreeStats = await Portfolio.aggregate([
      { $group: { _id: "$degree", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      totalPortfolios,
      recentPortfolios,
      topColleges: collegeStats,
      topDegrees: degreeStats
    });
  } catch (err) {
    console.error("Error getting portfolio stats:", err);
    res.status(500).json({ error: "Internal server error while getting statistics" });
  }
});

module.exports = router;