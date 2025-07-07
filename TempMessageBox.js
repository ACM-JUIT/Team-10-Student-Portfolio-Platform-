import React from "react"; // Importing the React library to enable the use of React features

// Functional component definition for TempMessageBox
const TempMessageBox = ({ tempMessage }) => {
  // Check if the tempMessage object has a text property; if not, return null (render nothing)
  if (!tempMessage.text) return null;

  return (
    <div
      className={`temp-message-box ${tempMessage.type}`} // Dynamic class name based on the message type (e.g., "error" or "success")
      style={{
        position: "fixed", // Positioning the message box fixed on the screen
        top: "20px", // Distance from the top of the viewport
        left: "50%", // Centering the box horizontally
        transform: "translateX(-50%)", // Adjusting position to truly center the box
        padding: "15px 25px", // Padding inside the message box
        borderRadius: "8px", // Rounded corners for the message box
        color: "white", // Text color
        fontFamily: "Montserrat, sans-serif", // Font family for the text
        zIndex: "1000", // Ensuring the message box appears above other elements
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)", // Shadow effect for depth
        opacity: 1, // Full opacity for visibility
        backgroundColor: tempMessage.type === "error" ? "#DC2626" : "#4CAF50", // Conditional background color based on message type
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // Transition effects for smooth appearance
      }}
    >
      {tempMessage.text} {/* Displaying the message text */}
    </div>
  );
};

// Exporting the TempMessageBox component for use in other parts of the application
export default TempMessageBox;
