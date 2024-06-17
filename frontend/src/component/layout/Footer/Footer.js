import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="midFooter">
        <h1>Samridhi Enterprises</h1>
        <p>
          {currentYear === 2024
            ? "Copyrights © 2024. All rights reserved."
            : `Copyrights © 2024-${currentYear}`}
        </p>
      </div>
      <div className="footerLinks">
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/sign-up">Signup</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/about-us">About Us</Link> 
      </div>
    </footer>
  );
};

export default Footer;
