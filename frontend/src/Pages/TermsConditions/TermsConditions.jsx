import React, { useEffect } from "react";
import "./TermsConditions.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms and Conditions</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of using SW Healthcare's platform, including policies on purchasing health-related products and user conduct."
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
                <div className="breadcrumb-nav text-white align-items-center d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link
                    className="text-white terms-link"
                    to="/terms-conditions"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Terms and Conditions</h1>
            <p className="text-white mt-3 mb-0">Effective from [Date]</p>
          </div>
        </div>
      </section>
      <section className="terms-section">
        <h1 className="text-center">Terms & Conditions</h1>
        <div className="container">
          <div className="terms-content">
            <div>
              <h4>Introduction</h4>
            </div>
            <p>
              Welcome to SW Healthcare. These Terms and Conditions outline the
              rules and regulations for using our platform and services,
              including purchasing our health-related products. By accessing our
              website and using our services, you agree to abide by these terms.
              Please read them carefully.
            </p>

            <div>
              <h4>Acceptance of Terms</h4>
            </div>
            <p>
              By visiting, registering, or using our platform in any way, you
              agree to be bound by these Terms and Conditions, as well as any
              additional terms that may be applicable to specific services or
              features we provide.
            </p>

            <div>
              <h4>Products We Offer</h4>
            </div>
            <p>
              SW Healthcare specializes in providing high-quality health-related
              products, including:
            </p>
            <ul>
              <li>URO-Flow Urine Bag</li>
              <li>Douche Set Premium</li>
              <li>Steam Vaporizer</li>
              <li>Surgical Tape</li>
              <li>Gloves</li>
              <li>Hot Water Bottle</li>
              <li>Electric Warm Bag</li>
              <li>Pulse Oximeter</li>
              <li>Digital Thermometer</li>
              <li>Patient Care Items</li>
              <li>IV Fixator</li>
              <li>Masks</li>
              <li>Surgeon Caps</li>
              <li>And more health-related essentials.</li>
            </ul>

            <div>
              <h4>Use of Our Platform</h4>
            </div>
            <p>
              You may use our platform for purchasing our products and accessing
              related services. Any misuse of the platform, including but not
              limited to fraudulent purchases or unauthorized activities, is
              strictly prohibited.
            </p>

            <div>
              <h4>Order and Payment Policy</h4>
            </div>
            <p>
              All orders placed on our platform are subject to acceptance and
              availability. Payments must be made through authorized channels,
              and we reserve the right to cancel any order that violates our
              policies or appears suspicious.
            </p>

            <div>
              <h4>Returns and Refunds</h4>
            </div>
            <p>
              Our return and refund policy is designed to ensure customer
              satisfaction. Products may be returned within the specified period
              if they are defective or damaged. Please review our Returns Policy
              for detailed information.
            </p>

            <div>
              <h4>Content Ownership</h4>
            </div>
            <p>
              The content on this website, including text, images, and media, is
              the property of SW Healthcare. You are granted a limited,
              non-exclusive license to access and use the site for personal
              purposes, but you may not reproduce, distribute, or display any
              part of the content without prior written permission.
            </p>

            <div>
              <h4>User Conduct</h4>
            </div>
            <p>
              Users must not engage in conduct that:
            </p>
            <ul>
              <li>Violates any local, national, or international laws.</li>
              <li>Damages, disables, or overburdens our platform.</li>
              <li>
                Interferes with or disrupts the functionality of the website or
                services.
              </li>
              <li>
                Promotes harmful activities or violates the rights of others.
              </li>
              <li>
                Uses the platform for unauthorized commercial purposes.
              </li>
            </ul>

            <div>
              <h4>Privacy and Data Protection</h4>
            </div>
            <p>
              We respect your privacy and are committed to protecting your
              personal information. Please review our Privacy Policy for details
              on how we collect, use, and protect your data while using our
              platform.
            </p>

            <div>
              <h4>Liability and Indemnification</h4>
            </div>
            <p>
              SW Healthcare is not liable for any damages arising from the use
              of the platform, including but not limited to indirect,
              incidental, or consequential damages. By using our platform, you
              agree to indemnify and hold harmless SW Healthcare and its
              affiliates from any claims or damages arising from your actions.
            </p>

            <div>
              <h4>Modifications to Terms</h4>
            </div>
            <p>
              We reserve the right to modify or update these Terms and
              Conditions at any time. Any changes will be communicated through
              the platform, and your continued use of the services signifies
              your acceptance of those changes.
            </p>

            <div>
              <h4>Governing Law</h4>
            </div>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising from the
              use of this platform will be subject to the jurisdiction of the
              courts located in [Location].
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
