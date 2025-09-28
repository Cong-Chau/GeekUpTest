import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/albums":
        document.title = "Albums";
        break;
      case "/users":
        document.title = "Users";
        break;
      default:
        document.title = "GeekUp";
    }
  }, [location]);

  return null;
}

export default TitleManager;
