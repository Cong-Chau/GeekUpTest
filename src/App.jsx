import SideBar from "./components/layout/SideBar";
import Albums from "./pages/Albums";
import Users from "./pages/Users";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="w-5/6 min-h-screen h-auto">
        <Routes>
          <Route path="/albums" element={<Albums />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
