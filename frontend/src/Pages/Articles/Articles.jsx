import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Events = () => {
  const [data, setData] = useState([]);

  const getapiData = async () => {
    try {
      const response = await axios.get(
        "https://health-4-xkdr.onrender.com/api/all-events"
      );
      setData(response.data);
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
            {data.map((item, index) => (
              <div className="col-md-3 col-sm-6 col-12" key={index}>
                <div className="event-card shadow-sm rounded overflow-hidden">
                  {/* <Link to={`/event/${item._id}`}> */}
                  <img
                    src={item.eventImage}
                    alt={item.eventName}
                    className="img-fluid w-100"
                  />
                  {/* </Link> */}
                  <div className="event-card-body p-3">
                    {/* <Link
                      to={`/event/${item._id}`}
                      style={{ textDecoration: 'none', color: '#6E84D0' }} // Customize the color as needed
                    > */}
                    <h5 className="event-name mb-2 text-capitalize">
                      {item.eventName}
                    </h5>
                    <p className="event-date text-muted text-end">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        // hour: '2-digit',
                        // minute: '2-digit',
                        // second: '2-digit',
                      }).format(new Date(item.updatedAt))}
                    </p>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
