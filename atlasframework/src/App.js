import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AtlasSearch from "./Atlas/SearchEngine/AtlasSearch";
import About from "./Atlas/About/About";
import Login from "./Atlas/Auth/Login";
import Signup from "./Atlas/Auth/Signup";
import VerifyOTP from "./Atlas/Auth/VerifyOTP";
import Home from "./Atlas/Component/Home";
import { ToastContainer } from "react-toastify";
import {
  PrivateRoute,
  UserRoute,
  AdminRoute,
} from "./Atlas/Routes/PrivateRoute";
import Admin from "./Atlas/Admin/Admin";

function App() {
  return (
    <div className="app-container">
      <ToastContainer position="top-left" autoClose={1000} />
      <Router>
        {/* Public Routes */}
        <Routes>
          <Route path="/" element={<AtlasSearch />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
        </Routes>

        {/* Protected User Routes */}
        <Routes>
          <Route
            path="/user"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          {/* Additional protected routes can be added here */}
        </Routes>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          {/* Additional protected routes can be added here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
