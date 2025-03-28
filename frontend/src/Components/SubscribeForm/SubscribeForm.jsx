import React from "react";
import newsImage from "../../images/news-bg.png";

const SubscribeForm = () => {
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
              <input
                type="text"
                placeholder="type your address email..."
                className="subscribeInput"
                name=""
                id=""
              />
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
