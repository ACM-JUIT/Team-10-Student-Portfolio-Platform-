import React, { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import PortfolioFormPage from "./PortfolioFormPage";
import PortfolioPreviewPage from "./PortfolioPreviewPage";
import SamplePortfoliosPage from "./SamplePortfoliosPage";
import TempMessageBox from "./TempMessageBox";

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

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "imageUrl" && files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        displayTemporaryMessage(
          "Please upload an image file (PNG, JPG, GIF, etc.).",
          "error"
        );
        setFormData((prevData) => ({ ...prevData, [id]: "" }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const displayTemporaryMessage = (msg, type = "info") => {
    setTempMessage({ text: msg, type: type });
    setTimeout(() => {
      setTempMessage({ text: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Submitting form to backend...");
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

  // Validation
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
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/portfolios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to save portfolio.");
    }

    const result = await response.json();
    console.log("Saved to backend:", result);
    displayTemporaryMessage("Portfolio saved successfully!", "success");
    setCurrentPage("preview");
  } catch (error) {
    console.error("Error submitting form:", error);
    displayTemporaryMessage("Something went wrong while saving.", "error");
  }
};


  const samplePortfolios = [
    {
      id: "sample1",
      firstName: "Rohit",
      lastName: "Sharma",
      email: "rohit.sharma@gmail.com",
      imageUrl: "https://placehold.co/120x120/4ADE80/1A202C?text=RS",
      professionalSummary:
        "A dynamic software engineer with expertise in cloud architecture and scalable web applications.",
      skills:
        "AWS:95, Docker:80, Kubernetes:70, Go:90, JavaScript:85, React:75, Node.js:80",
      projects:
        "Cloud Migration Tool||Developed a robust tool for migrating on-premise applications to AWS.||Go,AWS,Lambda__Microservice Gateway||Implemented an API Gateway for internal services.||Node.js,Express,JWT",
      college: "University of Engineering",
      degree: "M.Sc. Software Engineering",
      cgpa: "2.64/4.00",
    },
    // Add more sample portfolios as needed
  ];

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

  return (
    <>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <TempMessageBox tempMessage={tempMessage} />
      <div className="page-wrapper">{renderPage()}</div>
    </>
  );
}

export default App;
