import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    eventsImage: "",
    eventsStatus: false,
  });
  const [eventName, setEventName] = useState("");

  const navigate = useNavigate();
  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      setData((prevData) => ({
        ...prevData,
        [name]: newFiles,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    if (data.eventsImage) {
      data.eventsImage.forEach((image) => {
        formData.append("eventImages", image);
      });
    }

    formData.append("eventsStatus", data.eventsStatus);
    formData.append("eventName", eventName);

    try {
      const response = await axios.post(
        "https://api.swhealthcares.com/api/events/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("events added successfully!");
      navigate("/all-events");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add events. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Events</h4>
        </div>
        <div className="links">
          <Link to="/all-events" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <label htmlFor="eventsImage" className="form-label">
              Events Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              name="eventName"
              multiple
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              placeholder="Enter Events Name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="eventsImage" className="form-label">
              Events Image<sup className="text-danger">*</sup>
            </label>
            <input
              type="file"
              className="form-control"
              id="eventsImage"
              name="eventsImage"
              multiple
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="eventsStatus" className="form-label">
              Events Status
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="eventsStatus"
                name="eventsStatus"
                checked={data.eventsStatus}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    eventsStatus: e.target.checked,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="eventsStatus">
                {data.eventsStatus ? "Active" : "Inactive"}
              </label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "not-allowed" : "allowed"}`}
            >
              {isLoading ? "Please Wait..." : "Add Events"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEvents;
