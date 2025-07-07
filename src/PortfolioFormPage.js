import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for PortfolioFormPage
const PortfolioFormPage = ({ formData, handleChange, handleSubmit }) => (
  <div className="contact-card fade-in" id="contactFormCard">
    {" "}
    {/* Main container for the portfolio form */}
    <h1>Build Your StudentFolio</h1> {/* Main heading for the form */}
    <p className="subtitle">
      {" "}
      {/* Subtitle providing instructions */}
      Enter your details to generate a professional digital portfolio preview.
    </p>
    <form id="portfolioForm" onSubmit={handleSubmit}>
      {" "}
      {/* Form element with a submit handler */}
      {/* Personal Details Section */}
      <div className="form-section-header">Personal Information</div>{" "}
      {/* Section header */}
      <div className="form-row">
        {" "}
        {/* Row for first and last name inputs */}
        <div className="form-group">
          {" "}
          {/* Group for first name input */}
          <label htmlFor="firstName">First Name</label>{" "}
          {/* Label for the input */}
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Aditya" // Placeholder text for the input
            required // Indicates that this field is required
            value={formData.firstName} // Controlled input value
            onChange={handleChange} // Event handler for input changes
          />
        </div>
        <div className="form-group">
          {" "}
          {/* Group for last name input */}
          <label htmlFor="lastName">Last Name</label>{" "}
          {/* Label for the input */}
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Sharma" // Placeholder text for the input
            required // Indicates that this field is required
            value={formData.lastName} // Controlled input value
            onChange={handleChange} // Event handler for input changes
          />
        </div>
      </div>
      <div className="form-group">
        {" "}
        {/* Group for email input */}
        <label htmlFor="email">Email</label> {/* Label for the input */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="name@example.com" // Placeholder text for the input
          required // Indicates that this field is required
          value={formData.email} // Controlled input value
          onChange={handleChange} // Event handler for input changes
        />
      </div>
      <div className="form-group">
        {" "}
        {/* Group for profile image input */}
        <label htmlFor="imageUrl">Profile Image (Optional)</label>{" "}
        {/* Label for the input */}
        <input
          type="file"
          id="imageUrl"
          name="imageUrl"
          accept="image/*" // Accepts image files only
          onChange={handleChange} // Event handler for input changes
        />
        {formData.imageUrl && ( // Conditional rendering for image preview text
          <small className="image-preview-text">
            Image selected. Preview will show.
          </small>
        )}
      </div>
      <div className="form-group">
        {" "}
        {/* Group for professional summary input */}
        <label htmlFor="professionalSummary">
          Professional Summary / Bio
        </label>{" "}
        {/* Label for the input */}
        <textarea
          id="professionalSummary"
          name="professionalSummary"
          rows="4" // Number of rows for the textarea
          placeholder="Passionate CS student focused on AI/ML and full-stack development..." // Placeholder text
          required // Indicates that this field is required
          value={formData.professionalSummary} // Controlled input value
          onChange={handleChange} // Event handler for input changes
        ></textarea>
      </div>
      {/* Skills Section */}
      <div className="form-section-header">Skills</div> {/* Section header */}
      <div className="form-group">
        {" "}
        {/* Group for skills input */}
        <label htmlFor="skills">
          Skills & Proficiency (Comma-separated, e.g., JavaScript:90, Python:85,
          React:80) {/* Label for the input */}
        </label>
        <textarea
          id="skills"
          name="skills"
          rows="4" // Number of rows for the textarea
          placeholder="JavaScript:90, Python:85, React:80, Machine Learning:75, Node.js:70, AWS:60" // Placeholder text
          required // Indicates that this field is required
          value={formData.skills} // Controlled input value
          onChange={handleChange} // Event handler for input changes
        ></textarea>
        <small className="field-hint">
          {" "}
          {/* Hint for the skills format */}
          Format: `SkillName:Proficiency(0-100), AnotherSkill:Proficiency`
        </small>
      </div>
      {/* Projects Section */}
      <div className="form-section-header">
        Projects (Separate with double underscore '__', fields with double pipe
        '||') {/* Section header */}
      </div>
      <div className="form-group">
        {" "}
        {/* Group for projects input */}
        <label htmlFor="projects">
          Project Details (e.g., Project A||Desc A||Tech1,Tech2__Project B||Desc
          B||Tech3) {/* Label for the input */}
        </label>
        <textarea
          id="projects"
          name="projects"
          rows="6" // Number of rows for the textarea
          placeholder="AI-Powered Study Assistant||A machine learning application that helps students organize study materials...||Python,TensorFlow,React__Campus Food Delivery App||Mobile application for ordering food...||React Native,Node.js,PostgreSQL" // Placeholder text
          required // Indicates that this field is required
          value={formData.projects} // Controlled input value
          onChange={handleChange} // Event handler for input changes
        ></textarea>
        <small className="field-hint">
          {" "}
          {/* Hint for the projects format */}
          Format: `Title||Description||Tech1,Tech2__Next Title||Next
          Desc||NextTech`
        </small>
      </div>
      {/* Education Section */}
      <div className="form-section-header">Education</div>{" "}
      {/* Section header */}
      <div className="form-row">
        {" "}
        {/* Row for college and degree inputs */}
        <div className="form-group">
          {" "}
          {/* Group for college input */}
          <label htmlFor="college">College/University</label>{" "}
          {/* Label for the input */}
          <input
            type="text"
            id="college"
            name="college"
            placeholder="Stanford University" // Placeholder text
            required // Indicates that this field is required
            value={formData.college} // Controlled input value
            onChange={handleChange} // Event handler for input changes
          />
        </div>
        <div className="form-group">
          {" "}
          {/* Group for degree input */}
          <label htmlFor="degree">Degree</label> {/* Label for the input */}
          <input
            type="text"
            id="degree"
            name="degree"
            placeholder="B.S. Computer Science" // Placeholder text
            required // Indicates that this field is required
            value={formData.degree} // Controlled input value
            onChange={handleChange} // Event handler for input changes
          />
        </div>
      </div>
      <div className="form-group">
        {" "}
        {/* Group for CGPA/GPA input */}
        <label htmlFor="cgpa">CGPA / GPA (e.g., 3.8/4.0 or 9.2/10)</label>{" "}
        {/* Label for the input */}
        <input
          type="text"
          id="cgpa"
          name="cgpa"
          placeholder="3.8/4.0" // Placeholder text
          required // Indicates that this field is required
          value={formData.cgpa} // Controlled input value
          onChange={handleChange} // Event handler for input changes
        />
      </div>
      <button type="submit" id="submitButton">
        {" "}
        {/* Submit button for the form */}
        Generate Professional Portfolio
      </button>
    </form>
  </div>
);

// Exporting the PortfolioFormPage component for use in other parts of the application
export default PortfolioFormPage;
