import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
const Footer = () => {
  const socialLinks = [
    { platform: "YouTube", icon: "bi-youtube", color: "#FF0000", link: "https://www.youtube.com/@SwHealthcare-w6r"},
    { platform: "Facebook", icon: "bi-facebook", color: "#3b5998", link: "https://www.facebook.com/profile.php?id=61574773707483"},
    {
      platform: "Instagram",
      icon: "bi-instagram",
      color: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
      link: "https://www.instagram.com/swhealthcare17/"
    },
    { platform: "Twitter", icon: "bi-twitter", color: "#1DA1F2", link: "https://x.com/swhealthcare17" },
  ];

  return (
    <section className="footer-container">
      <footer className="container">
        {/* Footer Main Section */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            {/* <h4>About Us</h4> */}
            <div>
              <img className="w-50 mb-3" src={logo} alt="" />
            </div>
            <p>
              Discover top-quality healthcare products and solutions at SW
              Healthcare. We bring trusted medical supplies and personal care
              essentials directly to you, ensuring your health and well-being
              are always our priority.
            </p>
            <p>Monday - Friday: 8:00 AM - 9:00 PM</p>
          </div>

          {/* Shop Links */}
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/term-&-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/delivery-information">Delivery Information</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/return-refund">Return & Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Customer Links */}
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li>
                <Link to={"/register"}> Register </Link>
              </li>
              <li>
                <Link to={"/login"}> Login </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {socialLinks.map(({ platform, icon, color, link }, index) => (
                <Link
                  key={index}
                  title={platform}
                  style={{ background: color }}
                  to={link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className={`bi ${icon}`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>
            &copy; 2024 Your Store. All Rights Reserved. | Designed & Powered by{" "}
            <a
              href="https://digiindiasolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F58634", textDecoration: "none" }}
            >
              Digi India Solutions
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
