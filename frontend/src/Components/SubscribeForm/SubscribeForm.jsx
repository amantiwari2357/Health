import React from "react";
import newsImage from "../../images/news-bg.png";
import { Link } from "react-router-dom";
const SubscribeForm = () => {
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
    <>
      <section className="subscribes">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Subscribe Us</h2>
              <p>
                To subscribe to our newsletter, simply visit our website or ask
                one of our friendly staff members during your next visit to our
                MiniMarket. Stay connected, stay informed, and enjoy all the
                benefits that come with being part of our MiniMarket community.
              </p>
              {/* <input
                type="text"
                placeholder="type your address email..."
                className="subscribeInput"
                name=""
                id=""
              /> */}
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
            <div className="col-md-6">
              <img className="w-100" src={newsImage} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscribeForm;
