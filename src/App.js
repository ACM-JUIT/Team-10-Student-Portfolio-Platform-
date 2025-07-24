import React, { useState } from "react"; // Importing React and useState hook
import NavBar from "./NavBar"; // Importing NavBar component
import HomePage from "./HomePage"; // Importing HomePage component
import PortfolioFormPage from "./PortfolioFormPage"; // Importing PortfolioFormPage component
import PortfolioPreviewPage from "./PortfolioPreviewPage"; // Importing PortfolioPreviewPage component
import SamplePortfoliosPage from "./SamplePortfoliosPage"; // Importing SamplePortfoliosPage component
import FeaturedPortfoliosPage from "./FeaturedPortfoliosPage"; // Importing FeaturedPortfoliosPage component
import TempMessageBox from "./TempMessageBox"; // Importing TempMessageBox component
import StudentFolioFeatures from "./StudentFolioFeatures"; // Add this line with your other imports

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

  // State to hold selected portfolio data for preview
  const [selectedPortfolioData, setSelectedPortfolioData] = useState(null);

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
    setSelectedPortfolioData(formData);
    setCurrentPage("preview");
  };

  // Function to handle viewing a specific portfolio
  const handleViewPortfolio = (portfolioData) => {
    setSelectedPortfolioData(portfolioData);
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

  // Featured profiles data (moved from HomePage)
  const featuredProfiles = [
    {
      id: "featured1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      imageUrl: "https://placehold.co/200x200?text=SJ",
      professionalSummary: "Passionate Computer Science student with expertise in modern web technologies and a strong foundation in software development principles.",
      skills: "JavaScript:90, React:85, Node.js:80, Python:75, Git:88, HTML/CSS:92",
      projects: "E-Commerce Platform||Built a full-stack e-commerce application with user authentication and payment integration||React,Node.js,MongoDB__Task Management App||Developed a collaborative task management tool with real-time updates||JavaScript,Socket.io,Express__Weather Dashboard||Created a responsive weather application using external APIs||React,API Integration,CSS",
      college: "Stanford University",
      degree: "B.S. Computer Science",
      cgpa: "3.8/4.0",
      role: "Computer Science Student",
      projectCount: 12,
    },
    {
      id: "featured2",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@example.com",
      imageUrl: "https://placehold.co/200x200?text=MC",
      professionalSummary: "Data Science enthusiast with strong analytical skills and experience in machine learning algorithms and data visualization techniques.",
      skills: "Python:95, Machine Learning:88, SQL:85, Pandas:90, Matplotlib:82, TensorFlow:78",
      projects: "Customer Segmentation Analysis||Analyzed customer data to identify key segments using clustering algorithms||Python,Scikit-learn,Pandas__Stock Price Predictor||Built a machine learning model to predict stock prices using historical data||Python,TensorFlow,NumPy__Data Visualization Dashboard||Created interactive dashboards for business intelligence||Python,Plotly,Dash",
      college: "MIT",
      degree: "B.S. Data Science",
      cgpa: "3.9/4.0",
      role: "Data Science Student",
      projectCount: 8,
    },
    {
      id: "featured3",
      firstName: "Emma",
      lastName: "Williams",
      email: "emma.williams@example.com",
      imageUrl: "https://placehold.co/200x200?text=EW",
      professionalSummary: "Creative UX Design student focused on user-centered design principles and creating intuitive digital experiences.",
      skills: "Figma:95, UI Design:90, Prototyping:88, Adobe XD:85, User Research:82, Wireframing:90",
      projects: "Mobile Banking App Design||Designed a comprehensive mobile banking interface with focus on accessibility||Figma,Prototyping,User Research__E-learning Platform UI||Created user interface for online learning platform with emphasis on student engagement||Adobe XD,Wireframing,Design Systems__Restaurant Ordering System||Designed seamless ordering experience for restaurant chain||Figma,User Testing,Prototyping",
      college: "California Institute of Arts",
      degree: "B.A. User Experience Design",
      cgpa: "3.7/4.0",
      role: "UX Design Student",
      projectCount: 5,
    },
    {
      id: "featured4",
      firstName: "David",
      lastName: "Kim",
      email: "david.kim@example.com",
      imageUrl: "https://placehold.co/200x200?text=DK",
      professionalSummary: "Electrical Engineering student specializing in embedded systems and hardware design with practical experience in IoT projects.",
      skills: "C++:90, PCB Design:85, Embedded Systems:88, Arduino:92, VHDL:78, Circuit Analysis:85",
      projects: "Smart Home Automation||Developed IoT-based home automation system with mobile app control||Arduino,C++,Mobile Development__Drone Control System||Built autonomous drone navigation system using sensors and microcontrollers||C++,Embedded Systems,Sensors__Industrial Monitoring Device||Created device for monitoring industrial equipment parameters||PCB Design,C++,Data Logging",
      college: "Georgia Institute of Technology",
      degree: "B.S. Electrical Engineering",
      cgpa: "3.6/4.0",
      role: "Electrical Engineering Student",
      projectCount: 7,
    },
  ];

  // Function to render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
        case "features":
  return <StudentFolioFeatures setCurrentPage={setCurrentPage} />;
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
            data={selectedPortfolioData || formData}
            handleEditDetails={() => setCurrentPage("form")}
          />
        );
      case "samples":
        return (
          <SamplePortfoliosPage
            samplePortfolios={samplePortfolios}
            handleEditDetails={() => setCurrentPage("form")}
            handleViewPortfolio={handleViewPortfolio}
          />
        );
      case "featured":
        return (
          <FeaturedPortfoliosPage
            featuredProfiles={featuredProfiles}
            handleViewPortfolio={handleViewPortfolio}
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