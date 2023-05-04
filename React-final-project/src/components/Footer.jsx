import React from "react";
import "../style/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <h1 className="footer__title">BeatBoutique</h1>
      <p className="footer__subtitle">Your music deserves the best gear.</p>
      <div className="footer__social-links">
        <Link className="footer__social-link" to="#">
          <i className="bi bi-instagram"></i>
        </Link>
        <Link className="footer__social-link" to="#">
          <i className="bi bi-twitter"></i>
        </Link>
        <Link className="footer__social-link" to="#">
          <i className="bi bi-facebook"></i>
        </Link>
      </div>
      <nav className="footer__nav">
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <Link className="footer__nav-link" to="/aboutus">
              About Us
            </Link>
          </li>
          <li className="footer__nav-item">
            <Link className="footer__nav-link" to="/contactus">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Beat Boutique App. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
