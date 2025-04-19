import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllArticles = () => {
  const [events, setEvents] = useState([]); // State to store the events data
  const [isLoading, setIsLoading] = useState(false);

  // Fetch events data from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/all-events"
        );
        console.log(response);
        setEvents(response.data); // Assuming the API returns an array of events
      } catch (error) {
        toast.error("Failed to load events!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Delete event function
  const handleDelete = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:8000/api/delete-events/${eventId}`
        );
        setEvents(events.filter((event) => event._id !== eventId)); // Remove the deleted event from the state
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
      }
    } catch (error) {
      toast.error("Failed to delete event!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Articles</h4>
        </div>
        <div className="links">
          <Link to="/add-article" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Article Name</th>
              <th scope="col">Article Heading</th>
              {/* <th scope="col">Event Details</th> */}
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{event.eventName}</td>
                  <td>{event.eventHeading}</td>
                  {/* <td>{event.eventDetails}</td> */}
                  <td>
                    <img
                      src={event.eventImage}
                      alt="Event"
                      width="100"
                      height="50"
                    />
                  </td>
                  <td>{event.eventsStatus ? "Active" : "Inactive"}</td>
                  <td>
                    <Link to={`/edit-article/${event._id}`} className="bt edit">
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="bt delete"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllArticles;
