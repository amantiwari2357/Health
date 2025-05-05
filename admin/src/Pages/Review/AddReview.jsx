import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    review: "",
    locationName: "",
    authorName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    if (!reviewData.review.trim()) {
      toast.error("Review cannot be empty.");
      return false;
    }
    if (!reviewData.locationName.trim()) {
      toast.error("Location Name cannot be empty.");
      return false;
    }
    if (!reviewData.authorName.trim()) {
      toast.error("Author Name cannot be empty.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://health-4-xkdr.onrender.com/api/review/add-review", 
        {
          review: reviewData.review,
          location: reviewData.locationName,
          author: reviewData.authorName,
        }
      );
      toast.success("Review added successfully!");
      // Clear the form after successful submission
      setReviewData({ review: "", locationName: "", authorName: "" });
      navigate("/all-review"); // <-- Redirect to all reviews page
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Review</h4>
        </div>
        <div className="links">
          <Link to="/all-review" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="review" className="form-label">
              Review<sup className="text-danger">*</sup>
            </label>
            <textarea
              name="review"
              className="form-control"
              id="review"
              value={reviewData.review}
              onChange={handleChange}
              placeholder="Write the review..."
              rows="4"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="locationName" className="form-label">
              Location Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="locationName"
              className="form-control"
              id="locationName"
              value={reviewData.locationName}
              onChange={handleChange}
              placeholder="Location Name"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="authorName" className="form-label">
              Author Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="authorName"
              className="form-control"
              id="authorName"
              value={reviewData.authorName}
              onChange={handleChange}
              placeholder="Author Name"
            />
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "not-allowed" : "allowed"}`}
            >
              {isLoading ? "Please Wait..." : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddReview;
