import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddArticles = () => {
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    eventName: "",
    eventHeading: "",
    eventDetails: "",
    eventImage: "",
    eventsStatus: false,
  });

  const navigate = useNavigate();

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      eventDetails: content,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("eventHeading", data.eventHeading);
    formData.append("eventDetails", data.eventDetails);
    formData.append("eventImage", data.eventImage);
    formData.append("eventsStatus", data.eventsStatus);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add-events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event added successfully!");
      navigate("/all-articles");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add event. Please try again."
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
          <h4>Add Article</h4>
        </div>
        <div className="links">
          <Link to="/all-articles" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="eventName" className="form-label">
              Article Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              name="eventName"
              value={data.eventName}
              onChange={handleChange}
              required
              placeholder="Event Name"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="eventHeading" className="form-label">
              Article Heading<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              id="eventHeading"
              name="eventHeading"
              value={data.eventHeading}
              onChange={handleChange}
              required
              placeholder="Event Heading"
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="eventDetails" className="form-label">
              Article Details<sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              ref={editor}
              value={setData.eventDetails}
              onChange={handleEditorChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="eventImage" className="form-label">
              Article Image<sup className="text-danger">*</sup>
            </label>
            <input
              type="file"
              className="form-control"
              id="eventImage"
              name="eventImage"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="eventsStatus" className="form-label">
              Article Status
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="eventsStatus"
                name="eventsStatus"
                checked={data.eventsStatus}
                onChange={handleCheckboxChange}
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
              {isLoading ? "Please Wait..." : "Add Article"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddArticles;
