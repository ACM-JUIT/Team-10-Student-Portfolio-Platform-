import React from "react";

const PortfolioFormPage = ({ formData, handleChange, handleSubmit }) => (
  <div className="contact-card fade-in" id="contactFormCard">
    <h1>Build Your StudentFolio</h1>
    <p className="subtitle">
      Enter your details to generate a professional digital portfolio preview.
    </p>

    <form id="portfolioForm" onSubmit={handleSubmit}>
      {/* Personal Details */}
      <div className="form-section-header">Personal Information</div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Aditya"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Sharma"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="name@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Profile Image (Optional)</label>
        <input
          type="file"
          id="imageUrl"
          name="imageUrl"
          accept="image/*"
          onChange={handleChange}
        />
        {formData.imageUrl && (
          <small className="image-preview-text">
            Image selected. Preview will show.
          </small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="professionalSummary">Professional Summary / Bio</label>
        <textarea
          id="professionalSummary"
          name="professionalSummary"
          rows="4"
          placeholder="Passionate CS student focused on AI/ML and full-stack development..."
          required
          value={formData.professionalSummary}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Skills */}
      <div className="form-section-header">Skills</div>
      <div className="form-group">
        <label htmlFor="skills">
          Skills & Proficiency (Comma-separated, e.g., JavaScript:90, Python:85,
          React:80)
        </label>
        <textarea
          id="skills"
          name="skills"
          rows="4"
          placeholder="JavaScript:90, Python:85, React:80, Machine Learning:75, Node.js:70, AWS:60"
          required
          value={formData.skills}
          onChange={handleChange}
        ></textarea>
        <small className="field-hint">
          Format: `SkillName:Proficiency(0-100), AnotherSkill:Proficiency`
        </small>
      </div>

      {/* Projects */}
      <div className="form-section-header">
        Projects (Separate with double underscore '__', fields with double pipe
        '||')
      </div>
      <div className="form-group">
        <label htmlFor="projects">
          Project Details (e.g., Project A||Desc A||Tech1,Tech2__Project B||Desc
          B||Tech3)
        </label>
        <textarea
          id="projects"
          name="projects"
          rows="6"
          placeholder="AI-Powered Study Assistant||A machine learning application that helps students organize study materials...||Python,TensorFlow,React__Campus Food Delivery App||Mobile application for ordering food...||React Native,Node.js,PostgreSQL"
          required
          value={formData.projects}
          onChange={handleChange}
        ></textarea>
        <small className="field-hint">
          Format: `Title||Description||Tech1,Tech2__Next Title||Next
          Desc||NextTech`
        </small>
      </div>

      {/* Education */}
      <div className="form-section-header">Education</div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="college">College/University</label>
          <input
            type="text"
            id="college"
            name="college"
            placeholder="Stanford University"
            required
            value={formData.college}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            placeholder="B.S. Computer Science"
            required
            value={formData.degree}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="cgpa">CGPA / GPA (e.g., 3.8/4.0 or 9.2/10)</label>
        <input
          type="text"
          id="cgpa"
          name="cgpa"
          placeholder="3.8/4.0"
          required
          value={formData.cgpa}
          onChange={handleChange}
        />
      </div>

      <button type="submit" id="submitButton">
        Generate Professional Portfolio
      </button>
    </form>
  </div>
);

export default PortfolioFormPage;
