import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../Images/Atlas.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: " #fcf9f0" }}>
      <header className="atlas-header">
        <div className="atlas-logo">
          <img src={logo} width="180px" height="110px" alt="No " />
        </div>
        <nav className="atlas-nav">
          <ul>
            {/* Conditionally hide the About Us link if the current location is /about */}
            {location.pathname !== "/about" && (
              <li style={{ marginTop: "6px" }}>
                <b>
                  <a style={{ color: "black" }} href="/about">
                    About Us
                  </a>
                </b>
              </li>
            )}
            <li>
              <button style={{ height: "35px", borderRadius: "5px" }}>
                <a href="/">
                  <b>Login</b>
                </a>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
