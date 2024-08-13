import React from "react";
import { Link } from "react-router-dom";
import image5 from "./images/BlockX.png";

const Header = () => {
  return (
    <headerhome>
      <div className="logohome">
        <img src={image5} style={{ width: "215px" }} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact us</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-linkshome">
        <Link to="/login">Sign In</Link>
        <Link to="/register" className="register-btnhome">
          Register
        </Link>
      </div>
    </headerhome>
  );
};

export default Header;
