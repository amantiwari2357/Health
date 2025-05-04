import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./testimonials.css";
import comaImage from "../../images/coma.png";
import axios from "axios";


const Testimonial = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
const [reviews, setReviews] = useState([]);
  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const getShortText = (text) => {
    const words = text.split(" ");
    if (words.length <= 25) return text;
    return words.slice(0, 25).join(" ") + "...";
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/review/all-reviews"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert.error("Failed to load reviews.");
    }
  }
  useEffect(() => {
    fetchReviews()
  }, []);
  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <Slider {...sliderSettings}>
          {reviews?.map((testimonial, index) => {
            const isExpanded = expandedIndex === index;
            const words = testimonial.review.split(" ");
            const shouldTruncate = words.length > 25;

            return (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-content">
                  <img src={comaImage} alt="Quote" className="quote-icon" />
                  <p className="testimonial-feedback">
                    {isExpanded || !shouldTruncate
                      ? testimonial.review
                      : getShortText(testimonial.review)}
                  {shouldTruncate && (
                    <p
                      className="read-more-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </p>
                  )}
                  </p>
                  <h5 className="customer-name">{testimonial.author}</h5>
                  <p className="customer-location">{testimonial.location}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
