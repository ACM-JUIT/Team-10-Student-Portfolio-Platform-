import React, { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import PortfolioFormPage from "./PortfolioFormPage";
import PortfolioPreviewPage from "./PortfolioPreviewPage";
import SamplePortfoliosPage from "./SamplePortfoliosPage";
import PortfolioDetailPage from "./PortfolioDetailPage"; // Import the new component
import TempMessageBox from "./TempMessageBox";
import { apiService } from "./config/api"; // Import API service

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    professionalSummary: "",
    skills: "",
    projects: "",
    college: "",
    degree: "",
    cgpa: "",
  });
  const [tempMessage, setTempMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // New state for selected portfolio

  // ... existing code ...

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} setSelectedPortfolio={setSelectedPortfolio} />;
      case "form":
        return (
          <PortfolioFormPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "preview":
        return (
          <PortfolioPreviewPage
            data={formData}
            handleEditDetails={() => setCurrentPage("form")}
            createNewPortfolio={createNewPortfolio}
          />
        );
      case "samples":
        return (
          <SamplePortfoliosPage
            samplePortfolios={samplePortfolios}
            handleEditDetails={() => setCurrentPage("form")}
          />
        );
      case "portfolioDetail":
        return <PortfolioDetailPage portfolio={selectedPortfolio} />; // Render the detail page
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedPortfolio={setSelectedPortfolio} />;
    }
  };

  return (
    <>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <TempMessageBox tempMessage={tempMessage} />
      <div className="page-wrapper">{renderPage()}</div>
    </>
  );
}

export default App;
