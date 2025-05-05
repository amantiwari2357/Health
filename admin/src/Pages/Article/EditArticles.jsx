import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

const EditArticles = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [eventData, setEventData] = useState({
    eventName: "",
    eventHeading: "",
    eventDetails: "",
    eventImage: "",
    eventsStatus: false,
  });
  const [imagePreview, setImagePreview] = useState("");

  // Fetch the event data on component mount
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://health-4-xkdr.onrender.com/api/get-single-events/${id}`
        );
        setEventData({
          eventName: response.data.eventName,
          eventHeading: response.data.eventHeading,
          eventDetails: response.data.eventDetails,
          eventImage: response.data.eventImage,
          eventsStatus: response.data.eventsStatus,
        });
        setImagePreview(response.data.eventImage); // Show the existing image in the preview
      } catch (error) {
        console.error("Error fetching event data:", error);
        toast.error("Failed to fetch event details.");
      }
    };

    fetchEventData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setEventData((prevState) => ({
      ...prevState,
      eventDetails: content,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setEventData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // Preview selected image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("eventHeading", eventData.eventHeading);
    formData.append("eventDetails", eventData.eventDetails);
    formData.append("eventsStatus", eventData.eventsStatus);
    if (eventData.eventImage) {
      formData.append("eventImage", eventData.eventImage);
    }

    try {
      const response = await axios.put(
        `https://health-4-xkdr.onrender.com/api/update-events/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event updated successfully!");
      navigate("/all-articles"); // Redirect to the all events page
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update event. Please try again."
      );
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Article</h4>
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
              value={eventData.eventName}
              onChange={handleChange}
              required
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
              value={eventData.eventHeading}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="eventDetails" className="form-label">
              Article Details<sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              ref={editor}
              value={eventData.eventDetails}
              onChange={handleEditorChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="eventImage" className="form-label">
              Article Image
            </label>
            <input
              type="file"
              name="eventImage"
              className="form-control"
              id="eventImage"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div className="col-md-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="eventsStatus"
                id="eventsStatus"
                checked={eventData.eventsStatus}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    eventsStatus: e.target.checked,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="eventsStatus">
                Active
              </label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className={`${btnLoading ? "not-allowed" : "allowed"}`}
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Update Article"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticles;
