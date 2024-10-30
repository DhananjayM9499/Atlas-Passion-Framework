import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../Images/Atlas.png";

const Navbar = () => {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userName || ""); // Assuming 'username' is a field in your token
      } catch (error) {
        console.error("Invalid token:", error);
        setUsername("");
      }
    } else {
      setUsername("");
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUsername("");
    navigate("/");
    // You might want to redirect to the home page or login page after logout
  };

  return (
    <div style={{ backgroundColor: "#fcf9f0" }}>
      <header className="atlas-header">
        <div className="atlas-logo">
          <img src={logo} width="180px" height="110px" alt="Logo" />
        </div>
        <nav className="atlas-nav">
          <ul>
            {/* Display 'About Us' and 'Login' if on the home or about page */}
            {!username &&
              (location.pathname === "/" || location.pathname === "/about") && (
                <>
                  {location.pathname === "/" && (
                    <li style={{ marginTop: "6px" }}>
                      <b>
                        <Link style={{ color: "black" }} to="/about">
                          About Us
                        </Link>
                      </b>
                    </li>
                  )}
                  <li>
                    <button style={{ height: "35px", borderRadius: "5px" }}>
                      <Link to="/login">
                        <b>Login</b>
                      </Link>
                    </button>
                  </li>
                </>
              )}
            {/* Show the username if the user is authenticated */}
            {username && (
              <li style={{ marginTop: "6px", color: "black" }}>
                <b onClick={toggleDropdown} style={{ cursor: "pointer" }}>
                  Welcome, {username}
                </b>
                {dropdownOpen && (
                  <ul
                    className="dropdown-menu"
                    style={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      listStyle: "none",
                      padding: "10px",
                      margin: "0",
                      zIndex: 100,
                    }}
                  >
                    <li>
                      <Link to="/" onClick={() => setDropdownOpen(false)}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        style={{
                          background: "none",
                          border: "none",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
