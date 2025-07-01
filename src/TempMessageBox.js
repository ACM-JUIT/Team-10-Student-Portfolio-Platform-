import React from "react";

const TempMessageBox = ({ tempMessage }) => {
  if (!tempMessage.text) return null;

  return (
    <div
      className={`temp-message-box ${tempMessage.type}`}
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "15px 25px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "Montserrat, sans-serif",
        zIndex: "1000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        opacity: 1,
        backgroundColor: tempMessage.type === "error" ? "#DC2626" : "#4CAF50",
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
    >
      {tempMessage.text}
    </div>
  );
};

export default TempMessageBox;
