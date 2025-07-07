import React, { useState } from "react"; // Importing React and useState hook
import NavBar from "./NavBar"; // Importing NavBar component
import HomePage from "./HomePage"; // Importing HomePage component
import PortfolioFormPage from "./PortfolioFormPage"; // Importing PortfolioFormPage component
import PortfolioPreviewPage from "./PortfolioPreviewPage"; // Importing PortfolioPreviewPage component
import SamplePortfoliosPage from "./SamplePortfoliosPage"; // Importing SamplePortfoliosPage component
import TempMessageBox from "./TempMessageBox"; // Importing TempMessageBox component

function App() {
  // State to track the current page being displayed
  const [currentPage, setCurrentPage] = useState("home");
  // The currentPage state is used in the renderPage function to determine which component to render
  //the setCurrentPage function is called to update this state, triggering a re-render of the component with the new page

  // State to hold form data for the portfolio
  const [formData, setFormData] = useState({
    /* formData state is updated whenever the user
     types in the form fields or uploads an image*/
    /* handleChange function 
    updates the relevant field in the formData object.*/
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

  // State to manage temporary messages for user feedback
  // when the user submits the form with missing fields
  const [tempMessage, setTempMessage] = useState({ text: "", type: "" });

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    // Special handling for image uploads
    if (id === "imageUrl" && files && files[0]) {
      const file = files[0];
      // Validate that the uploaded file is an image
      if (!file.type.startsWith("image/")) {
        displayTemporaryMessage(
          "Please upload an image file (PNG, JPG, GIF, etc.).",
          "error"
        );
        setFormData((prevData) => ({ ...prevData, [id]: "" })); // Reset imageUrl in formData
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // onloadend event handler oart of JS API which is used to read the contents of files
        // IN CODE onloadend is assigned a function that updates the formData
        setFormData((prevData) => ({ ...prevData, [id]: reader.result })); // Set the image URL in formData
        // ... is spread operator, to make a copy of prevData
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      // Update formData for other inputs
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  // Function to display temporary messages to the user
  const displayTemporaryMessage = (msg, type = "info") => {
    setTempMessage({ text: msg, type: type }); // Set the message and type
    setTimeout(() => {
      setTempMessage({ text: "", type: "" }); // Clear the message after 3 seconds
    }, 3000);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const {
      firstName,
      lastName,
      email,
      professionalSummary,
      skills,
      projects,
      college,
      degree,
      cgpa,
    } = formData;

    // Validate that all required fields are filled
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      professionalSummary.trim() === "" ||
      skills.trim() === "" ||
      projects.trim() === "" ||
      college.trim() === "" ||
      degree.trim() === "" ||
      cgpa.trim() === ""
    ) {
      displayTemporaryMessage(
        "Please fill in all required entries. Profile image upload is optional.",
        "error"
      );
      return; // Exit if validation fails
    }

    // If validation passes, navigate to the preview page
    setCurrentPage("preview");
  };

  // Sample portfolio data for demonstration purposes
  const samplePortfolios = [
    {
      id: "sample1",
      firstName: "Sarvesh",
      lastName: "Garg",
      email: "sarvesh.garg@example.com",
      imageUrl: "https://placehold.co/120x120/4ADE80/1A202C?text=AS",
      professionalSummary: "A dynamic worker with basic in HTML and Paint.",
      skills:
        "AWS:95, Docker:80, Kubernetes:70, Go:90, JavaScript:85, React:75, Node.js:80",
      projects:
        "Cloud Migration Tool||Developed a robust tool for migrating on-premise applications to AWS.||Go,AWS,Lambda__Microservice Gateway||Implemented an API Gateway for internal services.||Node.js,Express,JWT",
      college: "University of Engineering",
      degree: "M.Sc. Software Engineering",
      cgpa: "4.0/4.0",
    },
    // More sample portfolios can be added here
  ];

  // Function to render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "form":
        return (
          <PortfolioFormPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        );
      case "preview":
        return (
          <PortfolioPreviewPage
            data={formData}
            handleEditDetails={() => setCurrentPage("form")}
          />
        );
      case "samples":
        return (
          <SamplePortfoliosPage
            samplePortfolios={samplePortfolios}
            handleEditDetails={() => setCurrentPage("form")}
          />
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Main return statement rendering the application
  return (
    <>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <TempMessageBox tempMessage={tempMessage} />
      <div className="page-wrapper">{renderPage()}</div>
    </>
  );
}

export default App; // Exporting the App component for use in other parts of the application
