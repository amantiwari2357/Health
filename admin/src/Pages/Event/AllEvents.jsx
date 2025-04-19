import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]); // State to store the banner data
  const [isLoading, setIsLoading] = useState(false);

  // Fetch events data from the backend when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.swhealthcares.com/api/events/all-event"
        );
        setEvents(response.data.events);
      } catch (error) {
        toast.error("Failed to load events!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Delete banner function
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
          `https://api.swhealthcares.com/api/events/delete-event/${eventId}`
        );
        setEvents(events.filter((event) => event._id !== eventId)); // Remove the deleted banner from the state
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
          <h4>All Events</h4>
        </div>
        <div className="links">
          <Link to="/add-event" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      {/* <div className="filteration">
        <div className="selects">
          <select>
            <option>Ascending Order </option>
            <option>Descending Order </option>
          </select>
        </div>
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div> */}

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Show on Event Page</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              events?.map((event, index) => (
                <tr key={event._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{event.eventName}</td>
                  <td>
                    <img
                      src={event.eventImages[0]}
                      alt="event"
                      width="100"
                      height="50"
                    />
                  </td>
                  <td>{event.eventStatus ? "Active" : "Inactive"}</td>
                  <td>
                    <Link to={`/edit-event/${event._id}`} className="bt edit">
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

export default AllEvents;
