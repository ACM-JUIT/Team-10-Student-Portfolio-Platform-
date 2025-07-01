import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // This line should already be there
import "./style.css"; // <<< MAKE SURE THIS LINE IS PRESENT AND CORRECT!

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
