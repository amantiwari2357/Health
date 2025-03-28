import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
const Events = () => {
  const [data, setData] = useState([]);

  const getapiData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/events/all-event"
      );
      setData(response.data.events);
      console.log(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getapiData();
  }, []);

  return (
    <>
      {/* Breadcrumb Section */}
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
                  <Link className="text-white terms-link" to="/event">
                    Events
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Events</h1>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section py-5">
        <div className="container">
          <div className="row g-4">
          <div className="event-container">
  {data &&
    data.map((event, eventIndex) =>
      event.eventImages.map((image, imgIndex) => (
        <div className="col-md-3 col-sm-6 col-12 event-card" key={`${eventIndex}-${imgIndex}`}>
          <img
            src={image}
            alt={`Event ${imgIndex + 1}`}
            className="event-card-img"
          />
        </div>
      ))
    )}
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
