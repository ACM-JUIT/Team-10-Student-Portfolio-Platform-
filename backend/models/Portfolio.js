const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String,
  professionalSummary: String,
  skills: String,
  projects: String,
  college: String,
  degree: String,
  cgpa: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
