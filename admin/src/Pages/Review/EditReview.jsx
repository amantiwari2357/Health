import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditReview = () => {
  const { id } = useParams(); // Get the ID of the review to edit
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    review: "",
    locationName: "",
    authorName: "",
  });

  useEffect(() => {
    // Fetch the existing review details
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `https://health-4-xkdr.onrender.com/api/review/single-review/${id}` 
        );
        const data=response?.data?.[0]
       
        setReviewData({
          review: data.review,
          locationName: data.location,
          authorName: data.author,
        });
      } catch (error) {
        console.error("Error fetching review details:", error);
        toast.error("Failed to fetch review details.");
      }
    };

    fetchReviewDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!reviewData.review.trim()) {
      toast.error("Review cannot be empty.");
      return false;
    }
    if (!reviewData.locationName.trim()) {
      toast.error("Location name cannot be empty.");
      return false;
    }
    if (!reviewData.authorName.trim()) {
      toast.error("Author name cannot be empty.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setBtnLoading(true);

    try {
      await axios.put(
        `https://health-4-xkdr.onrender.com/api/review/update-review/${id}`, 
        {
          review: reviewData.review,
          location: reviewData.locationName,
          author: reviewData.authorName,
        }
      );
      toast.success("Review updated successfully!");
      navigate("/all-review"); // redirect to all reviews page
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Review</h4>
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
              disabled={btnLoading}
              className={`${btnLoading ? "not-allowed" : "allowed"}`}
            >
              {btnLoading ? "Please Wait..." : "Update Review"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditReview;
