import React, { useEffect } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import aboutimage from '../../images/grocery.png'
import image1 from '../../images/download.png'
import image2 from '../../images/download (1).png'
import image3 from '../../images/download (2).png'
import image4 from '../../images/download (3).png'


const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, []);
  return (
    <>
      <Helmet>
        <title>About Us - Sw Healthcare</title>
        <meta
          name="description"
          content="Learn about Sw Healthcare, a revolutionary initiative for Gomata protection, Ayurveda medicine, and cultural preservation in India."
        />
        <meta
          name="keywords"
          content="Gomata, Gomata protection, Goseva Mahabhiyan, Ayurveda medicine, Vedalakshana Gomata, Sw Healthcare, Gomata ashrams, environmental refinement, Indian culture, Goseva, Dhenu conservation, sustainable development"
        />
        <meta name="author" content="Shri Godham Mahatirtha" />
      </Helmet>
      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-6">
                <Link
                  to="/"
                  className="back-icon text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <i className="bi bi-arrow-left"></i> Back to category
                </Link>
              </div>
              <div className="col-md-6 col-6 text-end">
                <div className="breadcrumb-nav text-white align-items-center d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link className="text-white terms-link" to="/about-us">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">About Us</h1>
            <p className="text-white mt-3 mb-0">Support 24 × 7</p>
          </div>
        </div>
      </section>
      
      <section className="aboutUs">
        <div className="container">
          <div className="about_content">
            {/* <div className="heading">
              <h2>How we Started?</h2>
            </div> */}
            <div className="row">
              <div className="col-md-6">
                <img src={aboutimage} alt="" className="aboutImage" />
              </div>
              <div className="col-md-6">
                <h2>About The  <span style={{ color: "#6E84D0" }}>SW Healthcare</span></h2>
                <p>SW is your one-stop shop for medical supplies, including Stethoscopes</p>
                <p>The option to use our state-of-the-art laser engraving service.</p>
                <p>With a wide range of products, competitive prices, and fast delivery.</p>
                <p>Whether you're a healthcare professional or an individual, SW is the place to find the medical supplies you need.</p>
                <div className="aboutNumber">
                  <div className="aboutNuberbox">
                    <div className="aboutText">
                      <p className="aboutcounting">200+</p>
                      <p>Vendors</p>
                    </div>
                  </div>
                  <div className="aboutNuberbox">
                    <div className="aboutText">
                      <p className="aboutcounting">654k+</p>
                      <p>Sales</p>
                    </div>
                  </div>
                  <div className="aboutNuberbox">
                    <div className="aboutText">
                      <p className="aboutcounting">587k+</p>
                      <p>Customers</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2>Our <span style={{ color: "rgb(110, 132, 208)" }}>Services</span></h2>
            <p>Customer service should not be a department. It should be the entire company.</p>
          </div>
          <div className="services-row">
            <div className="services-card">
              <div className="services-icon">
                <img src={image1} alt="Free Shipping Icon" />
              </div>
              <p className="services-title">Free Shipping</p>
              <p className="services-description">Free shipping on all US orders or above Rs 2000</p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image2} alt="24x7 Support Icon" />
              </div>
              <p className="services-title">24x7 Support</p>
              <p className="services-description">Contact us 24 hours a day, 7 days a week</p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image3} alt="30 Days Return Icon" />
              </div>
              <p className="services-title">30 Days Return</p>
              <p className="services-description">Simply return it within 30 days for an exchange</p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image4} alt="Payment Secure Icon" />
              </div>
              <p className="services-title">Payment Secure</p>
              <p className="services-description">Secure payments with advanced encryption</p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default About;
