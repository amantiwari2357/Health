import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./faq.css";
import { Helmet } from "react-helmet";

const Faq = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>FAQ - SW Healthcare</title>
        <meta
          name="description"
          content="Frequently Asked Questions about SW Healthcare and our range of health-related products."
        />
        <meta
          name="keywords"
          content="FAQ, SW Healthcare, health products, URO-FLow Urin Bag, Douche Set Premium, Steam Vaporizer, Surgical Tape, Gloves, Hot Water Bottle, Electric Warm Bag, Pulse Oximeter, Digital Thermometer"
        />
      </Helmet>
      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center mb-4">
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
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Frequently Asked Questions</h1>
            <p className="text-white mt-3 mb-0">Support 24 × 7</p>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="container">
          <div className="faq-heading-content">
            <h1>
              <b>FAQ</b>
            </h1>
            <p>These are the most frequently asked questions.</p>
            <p>
              If you have any questions, please &nbsp;
              <Link href="/contact-us">Contact Us.</Link>
            </p>
          </div>
          <div className="faq-questions">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    1. What is SW Healthcare?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      SW Healthcare is a trusted provider of health-related
                      products, offering solutions like URO-FLow Urin Bags,
                      Douche Sets, Steam Vaporizers, Surgical Tapes, Gloves,
                      Hot Water Bottles, and much more to enhance patient care
                      and everyday wellness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    2. What types of products does SW Healthcare offer?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      We offer a wide range of products, including URO-FLow
                      Urin Bags, Douche Sets, Steam Vaporizers, Surgical Tapes,
                      Gloves, Hot Water Bottles, Electric Warm Bags, Pulse
                      Oximeters, Digital Thermometers, IV Fixators, Masks,
                      Surgeon's Caps, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    3. Are SW Healthcare products suitable for home use?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Yes, many of our products, such as steam vaporizers, hot
                      water bottles, and digital thermometers, are designed for
                      both professional medical settings and home use. We aim
                      to make healthcare accessible and convenient.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    4. How can I purchase SW Healthcare products?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      You can purchase our products through our official
                      website or by contacting our sales team directly. We also
                      have partnerships with leading healthcare distributors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    5. What makes SW Healthcare products unique?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Our products are developed with a focus on quality,
                      durability, and user safety. We prioritize innovation and
                      customer satisfaction, ensuring our solutions meet
                      professional healthcare standards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    6. Can I get support or guidance on using your products?
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Absolutely! Our customer support team is available 24 ×
                      7 to assist you. We provide product manuals, usage
                      guidelines, and expert support to ensure a seamless
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
