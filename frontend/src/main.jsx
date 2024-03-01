import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./style/normalize.css";
import App from "./App.jsx";
import router from "./routes"; // Import your routes

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} /> // Use your routes
);