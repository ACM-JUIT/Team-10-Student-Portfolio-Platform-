import React from "react";

const NavBar = ({ currentPage, setCurrentPage }) => (
  <nav className="navbar">
    <div className="navbar-brand" onClick={() => setCurrentPage("home")}>
      StudentFolio
    </div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <button
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${currentPage === "form" ? "active" : ""}`}
          onClick={() => setCurrentPage("form")}
        >
          Create Portfolio
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${currentPage === "samples" ? "active" : ""}`}
          onClick={() => setCurrentPage("samples")}
        >
          Sample Portfolios
        </button>
      </li>
    </ul>
  </nav>
);

export default NavBar;
