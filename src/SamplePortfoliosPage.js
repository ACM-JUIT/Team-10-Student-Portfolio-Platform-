import React from "react"; // Importing the React library to enable the use of React features
import PortfolioPreviewPage from "./PortfolioPreviewPage"; // Importing the PortfolioPreviewPage component to display individual portfolio previews

// Functional component definition for SamplePortfoliosPage
const SamplePortfoliosPage = ({ samplePortfolios, handleEditDetails }) => (
  <div className="samples-container fade-in">
    {" "}
    {/* Main container for the sample portfolios page */}
    <h1 className="page-title">Sample StudentFolios</h1>{" "}
    {/* Main title of the page */}
    <p className="page-subtitle">
      {" "}
      {/* Subtitle providing context for the page */}
      Explore some examples of professional portfolios created with our
      platform.
    </p>
    <div className="sample-portfolios-grid">
      {" "}
      {/* Grid container for displaying sample portfolios */}
      {samplePortfolios.map(
        (
          sampleData // Mapping over the sample portfolios array
        ) => (
          <PortfolioPreviewPage
            key={sampleData.id} // Unique key for each portfolio preview
            data={sampleData} // Passing the sample portfolio data to the PortfolioPreviewPage component
            handleEditDetails={handleEditDetails} // Passing the edit details handler function
          />
        )
      )}
    </div>
  </div>
);

// Exporting the SamplePortfoliosPage component for use in other parts of the application
export default SamplePortfoliosPage;
