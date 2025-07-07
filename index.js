import React from "react"; // Importing the React library to enable the use of React features
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering React components to the DOM
import App from "./App"; // Importing the main App component from the App.js file
import "./style.css"; // Importing the CSS file for styling the application (make sure the path is correct)

const root = ReactDOM.createRoot(document.getElementById("root")); // Creating a root element for rendering React components
// The root element allows React to manage the rendering of components dynamically based on the application's state and user interactions.

root.render(
  // Rendering the React component tree
  <React.StrictMode>
    {" "}
    {/* Enabling StrictMode for highlighting potential problems in the application */}
    <App />{" "}
    {/* Rendering the App component, which is the main component of the application */}
  </React.StrictMode>
);
