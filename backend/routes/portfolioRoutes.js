const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// POST route to save portfolio data
router.post("/", async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route to fetch all portfolios (optional)
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
