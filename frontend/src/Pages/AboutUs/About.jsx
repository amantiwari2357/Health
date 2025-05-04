import React, { useEffect, useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import aboutimage from "../../images/grocery.png";
import image1 from "../../images/download.png";
import image2 from "../../images/download (1).png";
import image3 from "../../images/download (2).png";
import image4 from "../../images/download (3).png";
import cert1 from "../../images/image1.png";
import cert2 from "../../images/image2.png";
import cert3 from "../../images/image3.png";
import cert4 from "../../images/image4.png";
import cert5 from "../../images/image5.png";

const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = (imgSrc) => {
    setCurrentImage(imgSrc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentImage("");
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
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
                <h2>
                  About The{" "}
                  <span style={{ color: "#6E84D0" }}>SW Healthcare</span>
                </h2>
                <p>
                  The Brothers' Journey In 2009, two brothers, Jai Jaswani and
                  Rakesh Jaswani, embarked on an entrepreneurial venture in the
                  medical device industry. With a shared passion for innovation
                  and improving healthcare, they founded their company, SW
                  HEALTH CARE. With a vision of stimulating wellness.{" "}
                </p>
                <p>
                  <strong>Early Challenges</strong><br /> The brothers faced numerous challenges, from
                  developing their first product to navigating regulatory
                  approvals. Despite setbacks, they persevered, driven by their
                  vision for accessible and affordable medical devices.
                </p>
                <p>
                  <strong>Breakthroughs and Growth</strong> <br/>Through dedication and hard work, SW
                  HEALTH CARE gained traction. The brothers introduced
                  groundbreaking products, expanded their team, and established
                  a strong market presence.
                </p>
                <p>
  <strong>Legacy and Impact</strong><br />
  Today, SW Health Care is a reputable name in the industry, known for its commitment to quality and innovation. The brothers' journey serves as an inspiration to aspiring entrepreneurs, demonstrating the power of collaboration, resilience, and a shared vision.
</p>

<p>
  <strong>Lessons Learned</strong><br />
  Through their experiences, Jai and Rakesh gained valuable insights:
</p>

<ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
  <li>
    <strong>The importance of teamwork:</strong> Their brotherly bond and complementary skills helped them navigate challenges effectively.
  </li>
  <li>
    <strong>Adaptability:</strong> They demonstrated flexibility in response to changing market conditions and evolving customer needs.
  </li>
  <li>
    <strong>Innovation:</strong> SW Health Care’s dedication to continuous improvement and innovation has been a key driver of its success.
  </li>
</ul>

                <p>
                  The Future As SW Health Care continues to evolve, the brothers
                  remain focused on their mission to improve healthcare
                  outcomes. They're exploring new technologies, such as AI and
                  IoT, to enhance their products and services. Starting from
                  manufacturing of one product we have reached till huge and
                  varied collection of medical devices.
                </p>
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
            <h2>
              Our <span style={{ color: "rgb(110, 132, 208)" }}>Services</span>
            </h2>
            <p>
              Customer service should not be a department. It should be the
              entire company.
            </p>
          </div>
          <div className="services-row">
            <div className="services-card">
              <div className="services-icon">
                <img src={image1} alt="Free Shipping Icon" />
              </div>
              <p className="services-title">Free Shipping</p>
              <p className="services-description">
                Free shipping on all US orders or above Rs 2000
              </p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image2} alt="24x7 Support Icon" />
              </div>
              <p className="services-title">24x7 Support</p>
              <p className="services-description">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image3} alt="30 Days Return Icon" />
              </div>
              <p className="services-title">30 Days Return</p>
              <p className="services-description">
                Simply return it within 30 days for an exchange
              </p>
            </div>
            <div className="services-card">
              <div className="services-icon">
                <img src={image4} alt="Payment Secure Icon" />
              </div>
              <p className="services-title">Payment Secure</p>
              <p className="services-description">
                Secure payments with advanced encryption
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="certification-section">
        <h2 className="certification-title">
          Our{" "}
          <span style={{ color: "rgb(110, 132, 208)" }}>Certifications</span>
        </h2>

        <div className="certification-logos">
          <img
            src={cert1}
            alt="Certificate 1"
            onClick={() => handleImageClick(cert1)}
          />
          <img
            src={cert2}
            alt="Certificate 2"
            onClick={() => handleImageClick(cert2)}
          />
          <img
            src={cert3}
            alt="Certificate 3"
            onClick={() => handleImageClick(cert3)}
          />
          <img
            src={cert4}
            alt="Certificate 4"
            onClick={() => handleImageClick(cert4)}
          />
          <img
            src={cert5}
            alt="Certificate 5"
            onClick={() => handleImageClick(cert5)}
          />
        </div>

        {openModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
              <img
                src={currentImage}
                alt="Certificate Full View"
                className="modal-image"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
