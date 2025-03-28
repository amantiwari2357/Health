import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './delivery.css';
import { Helmet } from "react-helmet";

const DeliveryInformation = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Delivery Information | SW Health Care</title> {/* Page title */}
        <meta
          name="description"
          content="Learn about SW Health Care's delivery policies, shipping timelines, and coverage areas. Get seamless delivery of health and wellness products."
        />
        <meta name="keywords" content="delivery information, SW Health Care delivery, shipping policies, health products delivery" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://swhealthcare.com/delivery-information" />
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
                  <Link className="text-white terms-link" to="/delivery-information">
                    Delivery Information
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Delivery Information</h1>
          </div>
        </div>
      </section>

      <section className="delivery-section">
        <div className="container">
          <h1>Delivery Information</h1>
          <p>
            At SW Health Care, we are committed to ensuring timely and reliable delivery of your health and wellness products. Here are the details of our delivery process and policies:
          </p>

          <h2>1. Delivery Timelines</h2>
          <p>
            Our goal is to deliver your orders as quickly as possible. Estimated delivery timelines are as follows:
          </p>
          <ul>
            <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
            <li><strong>Express Shipping:</strong> 1-2 business days.</li>
            <li><strong>International Shipping:</strong> 7-10 business days, depending on location.</li>
          </ul>

          <h2>2. Shipping Charges</h2>
          <p>
            Shipping charges are calculated based on your delivery location and the total weight of your order. Our shipping policy includes:
          </p>
          <ul>
            <li>Free standard shipping on orders above $50.</li>
            <li>Express shipping available at a flat rate of $10.</li>
            <li>International shipping fees vary by region and order size.</li>
          </ul>

          <h2>3. Delivery Areas</h2>
          <p>
            We deliver to a wide range of locations both domestically and internationally. Here are the areas we serve:
          </p>
          <ul>
            <li>All major cities and towns within the country.</li>
            <li>Remote areas may experience extended delivery times.</li>
            <li>International locations subject to availability and local regulations.</li>
          </ul>

          <h2>4. Issues with Delivery</h2>
          <p>
            If you encounter any issues with your delivery, such as delays or damaged products, please contact our support team at &nbsp;
            <Link to="mailto:support@swhealthcare.com" className="highlight">
              support@swhealthcare.com
            </Link>
            &nbsp; or call us at +1 800-123-4567. We also offer easy returns and exchanges within 15 days of delivery.
          </p>

          <Link to="/contact-us" className="cta-btn">
            Contact Us for Assistance
          </Link>
        </div>
      </section>

      <section className="footer-text">
        <div className="container text-center">
          <p>
            For more details, visit our &nbsp;
            <Link to="/faq" className="highlight">
              FAQ page
            </Link>
            &nbsp; or reach out to us directly.
          </p>
        </div>
      </section>
    </>
  );
};

export default DeliveryInformation;
