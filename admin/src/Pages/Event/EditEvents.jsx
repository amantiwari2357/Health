import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEvents = () => {
  const { id } = useParams(); // Get events ID from the URL params
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [eventsData, setEventsData] = useState({
    eventsImage: "",
    eventsStatus: false,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [eventName, setEventName] = useState("");

  // Fetch the events data on component mount
  useEffect(() => {
    const fetcheventsData = async () => {
      try {
        const response = await axios.get(
          `https://api.swhealthcares.com/api/events/single-event/${id}`
        );

        setEventsData({
          eventsStatus: response.data.event.eventStatus,
        });
        setEventName(response.data.event.eventName);
        setImagePreview(response.data.event.eventImages); // Show the existing image in the preview
      } catch (error) {
        console.error("Error fetching events data:", error);
        toast.error("Failed to fetch events details.");
      }
    };

    fetcheventsData();
  }, [id]);

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      setEventsData((prevData) => ({
        ...prevData,
        [name]: newFiles,
      }));

      setImagePreview("");
      const previews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreview((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  const handleActiceChange = (e) => {
    setEventsData((prevData) => ({
      ...prevData,
      eventsStatus: e.target.checked,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();

    formData.append("eventStatus", eventsData.eventsStatus);
    if (eventsData.eventsImage && eventsData?.eventsImage) {
      eventsData.eventsImage?.forEach((image) => {
        formData.append("eventImages", image);
      });
    }
    if (eventName) {
      formData.append("eventName", eventName);
    }
    try {
      const response = await axios.put(
        `https://api.swhealthcares.com/api/events/update-event/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("events updated successfully!");
      navigate("/all-events");
    } catch (error) {
      console.error("Error updating events:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update events. Please try again."
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
          <h4>Edit events</h4>
        </div>
        <div className="links">
          <Link to="/all-eventss" className="add-new">
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
              events Image
            </label>
            <input
              type="file"
              name="eventsImage"
              className="form-control"
              id="eventsImage"
              multiple
              onChange={handleFileChange}
            />
            <div className="container mt-3">
              <div className="row">
                {imagePreview.length > 0 &&
                  imagePreview.map((image, index) => {
                    return (
                      <div className="col-md-2 col-6 mb-3" key={index}>
                        <img
                          src={image}
                          alt="Preview"
                          style={{ width: "100%", height: "100px" }}
                          className="img-fluid rounded shadow object-fit-cover"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="eventsStatus"
                id="eventsStatus"
                checked={eventsData.eventsStatus}
                onChange={handleActiceChange}
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="eventsStatus"
              >
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
              {btnLoading ? "Please Wait..." : "Update events"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEvents;
