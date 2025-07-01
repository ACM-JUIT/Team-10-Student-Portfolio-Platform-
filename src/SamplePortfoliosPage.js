import React from "react";
import PortfolioPreviewPage from "./PortfolioPreviewPage";

const SamplePortfoliosPage = ({ samplePortfolios, handleEditDetails }) => (
  <div className="samples-container fade-in">
    <h1 className="page-title">Sample StudentFolios</h1>
    <p className="page-subtitle">
      Explore some examples of professional portfolios created with our
      platform.
    </p>
    <div className="sample-portfolios-grid">
      {samplePortfolios.map((sampleData) => (
        <PortfolioPreviewPage
          key={sampleData.id}
          data={sampleData}
          handleEditDetails={handleEditDetails}
        />
      ))}
    </div>
  </div>
);

export default SamplePortfoliosPage;
