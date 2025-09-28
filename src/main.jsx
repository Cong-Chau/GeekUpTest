import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import TitleManager from "./components/items/TitleManager";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TitleManager />
    <App />
  </BrowserRouter>
);
