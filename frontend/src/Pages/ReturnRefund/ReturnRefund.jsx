import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./ReturnRefund.css";

const ReturnRefund = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Return & Refund Policy - SW Healthcare</title>
        <meta
          name="description"
          content="Learn about our return and refund policy, including eligibility criteria, timelines, and the process for returns and refunds. Customer satisfaction is our priority at SW Healthcare."
        />
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
                <div className="breadcrumb-nav text-white d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link className="text-white terms-link" to="/return-refund">
                    Return & Refund Policy
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Return & Refund Policy</h1>
          </div>
        </div>
      </section>

      <section className="return-refund-section">
        <div className="container">
          <h1>Return & Refund Policy</h1>
          <div className="section-intro">
            <p>
              At <strong>SW Healthcare</strong>, we are dedicated to providing high-quality healthcare products and services. If you're not fully satisfied with your purchase, we are here to assist you. Below is our comprehensive Return & Refund Policy.
            </p>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-check-circle-fill text-success"></i> Eligibility for Returns
            </h2>
            <ul>
              <li>The product must be unused, undamaged, and in the same condition as you received it.</li>
              <li>The item must be in its original packaging, including all tags and labels.</li>
              <li>A valid receipt or proof of purchase is required.</li>
              <li>Returns must be initiated within 30 days of the purchase date.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-x-circle-fill text-danger"></i> Non-Returnable Items
            </h2>
            <ul>
              <li>Prescription medications or personalized items.</li>
              <li>Perishable goods like health supplements with an expiration date.</li>
              <li>Items that have been opened or used for hygiene reasons (e.g., medical devices, personal health products).</li>
              <li>Gift cards or vouchers.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-credit-card-fill"></i> Refund Process
            </h2>
            <p>Refunds will be processed as follows:</p>
            <ul>
              <li>Refunds will be issued to the original payment method.</li>
              <li>Refunds are typically processed within 7-10 business days after the return is received.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-truck"></i> Return Shipping
            </h2>
            <p>Customers are responsible for the return shipping costs. Shipping costs are non-refundable. Please use a trackable shipping method to ensure the safe return of your items.</p>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-envelope-fill"></i> How to Initiate a Return
            </h2>
            <p>
              To initiate a return, please contact us at:
              <a href="mailto:support@swhealthcare.com" className="highlight">
                {" "}support@swhealthcare.com
              </a>
              with the following details:
            </p>
            <ul>
              <li>Your order number.</li>
              <li>The reason for the return.</li>
              <li>Pictures of the product (if applicable).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="footer-text m-0">
        <div className="container text-center">
          <p>
            By purchasing from SW Healthcare, you acknowledge and agree to the terms of our Return & Refund Policy.
          </p>
        </div>
      </section>
    </>
  );
};

export default ReturnRefund;
