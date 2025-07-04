import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const isMobile = window.innerWidth <= 900;
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#FAF9F6",
        padding: "2rem 1rem",
        textAlign: "center",
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(0.9rem, 1vw, 1.2rem)",
        borderTop: "1px solid #444",
        marginTop: isMobile ? "1rem" : "4rem",
        minWidth: "100vw"
      }}
    >
      <p style={{ margin: "0.5rem 0" }}>
        &copy; {new Date().getFullYear()} Deities of Death. All rights reserved.
      </p>
      <p style={{ margin: "0.5rem 0" }}>
        <Link to="/" style={{ color: "#FAF9F6", textDecoration: "underline", marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/privacy" style={{ color: "#FAF9F6", textDecoration: "underline", marginRight: "1rem" }}>
          Privacy Policy
        </Link>
        <Link to="/about" style={{ color: "#FAF9F6", textDecoration: "underline", marginRight: "1rem" }}>
          About
        </Link>
        <Link to="/contact" style={{ color: "#FAF9F6", textDecoration: "underline", marginRight: "1rem" }}>
          Contact
        </Link>
        <Link to="/legal" style={{ color: "#FAF9F6", textDecoration: "underline" }}>
          Legal
        </Link>
      </p>
      <p style={{ margin: "0.5rem 0", color: "#FF4444" }}>
        Made by Looki
      </p>
    </footer>
  );
};

export default Footer;
