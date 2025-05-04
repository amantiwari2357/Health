import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ArticleDetails.css"; // Import the external CSS file

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const getEventDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.swhealthcares.com/api/get-single-events/${id}`
      );
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <section className="event-details">
      <div className="container">
        {/* Header Section */}
        <div className="event-header">
          <h2>{event.eventHeading}</h2>
          {/* <h3>{event.eventHeading}</h3> */}
        </div>

        {/* Image Section */}
        <div className="event-image">
          <img
            src={event.eventImage}
            alt={event.eventName}
            className="img-fluid"
          />
        </div>

        {/* Event Content Section */}
        <div className="event-content">
          <div dangerouslySetInnerHTML={{ __html: event.eventDetails }}></div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
