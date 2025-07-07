import React, { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import PortfolioFormPage from "./PortfolioFormPage";
import PortfolioPreviewPage from "./PortfolioPreviewPage";
import SamplePortfoliosPage from "./SamplePortfoliosPage";
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
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission

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

    // Validate required fields
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayTemporaryMessage("Please enter a valid email address.", "error");
      return;
    }

    // CGPA validation (assuming it's out of 4.0 or 10.0)
    const cgpaValue = parseFloat(cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
      displayTemporaryMessage("Please enter a valid CGPA (0-10).", "error");
      return;
    }

    // If validation passes, try to save to backend
    setIsSubmitting(true);
    
    try {
      // Save to backend
      const savedPortfolio = await apiService.createPortfolio(formData);
      
      displayTemporaryMessage(
        "Portfolio created successfully! Redirecting to preview...",
        "success"
      );
      
      // Wait a moment to show success message, then navigate
      setTimeout(() => {
        setCurrentPage("preview");
      }, 1500);
      
    } catch (error) {
      console.error("Error saving portfolio:", error);
      displayTemporaryMessage(
        "Failed to save portfolio to server. You can still preview your portfolio.",
        "warning"
      );
      
      // Still allow user to preview even if backend fails
      setTimeout(() => {
        setCurrentPage("preview");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to create a new portfolio (reset form)
  const createNewPortfolio = () => {
    setFormData({
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
    setCurrentPage("form");
  };

  // Enhanced sample portfolios with more diverse examples
  const samplePortfolios = [
    {
      id: "sample1",
      firstName: "Sarvesh",
      lastName: "Garg",
      email: "sarvesh.garg@example.com",
      imageUrl: "https://placehold.co/120x120/4ADE80/1A202C?text=SG",
      professionalSummary: "A dynamic cloud engineer with expertise in AWS and modern DevOps practices. Passionate about building scalable solutions and automating deployment processes.",
      skills: "AWS:95, Docker:80, Kubernetes:70, Go:90, JavaScript:85, React:75, Node.js:80, Python:78, Linux:85",
      projects: "Cloud Migration Tool||Developed a robust tool for migrating on-premise applications to AWS with zero downtime||Go,AWS,Lambda,Docker__Microservice Gateway||Implemented a scalable API Gateway for internal services with JWT authentication||Node.js,Express,JWT,Redis__DevOps Pipeline||Created CI/CD pipeline reducing deployment time by 80%||Jenkins,Docker,Kubernetes,AWS",
      college: "Indian Institute of Technology",
      degree: "B.Tech Computer Science",
      cgpa: "8.7/10.0",
    },
    {
      id: "sample2",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@example.com",
      imageUrl: "https://placehold.co/120x120/EC4899/FFFFFF?text=PS",
      professionalSummary: "Data Science enthusiast with strong analytical skills and experience in machine learning. Focused on deriving actionable insights from complex datasets.",
      skills: "Python:92, Machine Learning:88, SQL:85, TensorFlow:82, Pandas:90, NumPy:87, Matplotlib:83, R:75",
      projects: "Sales Forecasting Model||Built ML model predicting sales with 94% accuracy for retail chain||Python,Scikit-learn,Pandas,XGBoost__Customer Segmentation||Developed clustering algorithm for targeted marketing campaigns||Python,K-means,Matplotlib,Seaborn__Sentiment Analysis Tool||Created NLP model for social media sentiment analysis||Python,NLTK,TensorFlow,Flask",
      college: "Delhi University",
      degree: "M.Sc. Data Science",
      cgpa: "9.1/10.0",
    },
    {
      id: "sample3",
      firstName: "Rahul",
      lastName: "Patel",
      email: "rahul.patel@example.com",
      imageUrl: "https://placehold.co/120x120/3B82F6/FFFFFF?text=RP",
      professionalSummary: "Full-stack developer with passion for creating user-friendly web applications. Experienced in modern JavaScript frameworks and responsive design.",
      skills: "JavaScript:90, React:88, Node.js:85, MongoDB:80, Express:82, HTML/CSS:92, TypeScript:78, Next.js:75",
      projects: "E-commerce Platform||Full-stack online shopping platform with payment integration||React,Node.js,MongoDB,Stripe__Task Management App||Collaborative project management tool with real-time updates||React,Socket.io,Express,PostgreSQL__Weather Dashboard||Interactive weather application with geolocation features||React,API Integration,Chart.js",
      college: "Pune University",
      degree: "B.E. Information Technology",
      cgpa: "8.4/10.0",
    },
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