import React from "react";
import logo from "../Images/Atlas.png";
const Navbar = () => {
  return (
    <div>
      <header className="atlas-header">
        <div className="atlas-logo">
          <img src={logo} width="180px" height="110px" alt="No " />
        </div>
        <nav className="atlas-nav">
          <ul>
            <li style={{ marginTop: "6px" }}>
              \
              <b>
                {" "}
                <a style={{ color: "black" }} href="/aboutUs">
                  About Us
                </a>
              </b>
            </li>
            <li>
              <button style={{ height: "35px" }}>
                {" "}
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
