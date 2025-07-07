import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for NavBar
const NavBar = ({ currentPage, setCurrentPage }) => (
  <nav className="navbar">
    {" "}
    {/* Navigation bar container */}
    <div className="navbar-brand" onClick={() => setCurrentPage("home")}>
      {" "}
      {/* Brand name that navigates to the home page when clicked */}
      StudentFolio
    </div>
    <ul className="navbar-nav">
      {" "}
      {/* Unordered list for navigation items */}
      <li className="nav-item">
        {" "}
        {/* List item for the Home link */}
        <button
          className={`nav-link ${currentPage === "home" ? "active" : ""}`} // Conditional class for active link styling
          onClick={() => setCurrentPage("home")} // Changes the current page to "home" when clicked
        >
          Home
        </button>
      </li>
      <li className="nav-item">
        {" "}
        {/* List item for the Create Portfolio link */}
        <button
          className={`nav-link ${currentPage === "form" ? "active" : ""}`} // Conditional class for active link styling
          onClick={() => setCurrentPage("form")} // Changes the current page to "form" when clicked
        >
          Create Portfolio
        </button>
      </li>
      <li className="nav-item">
        {" "}
        {/* List item for the Sample Portfolios link */}
        <button
          className={`nav-link ${currentPage === "samples" ? "active" : ""}`} // Conditional class for active link styling
          onClick={() => setCurrentPage("samples")} // Changes the current page to "samples" when clicked
        >
          Sample Portfolios
        </button>
      </li>
    </ul>
  </nav>
);

// Exporting the NavBar component for use in other parts of the application
export default NavBar;
