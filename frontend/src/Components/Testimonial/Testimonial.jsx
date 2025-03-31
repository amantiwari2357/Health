import React from "react";
import Slider from "react-slick";
import "./testimonials.css";
import comaImage from "../../images/coma.png";

const testimonialsData = [
  {
    feedback:
      "I recently purchased medical equipment from this website, and I couldn’t be happier with my experience. The website is easy to navigate, making it simple to find exactly what I needed. The product quality is top-notch, and everything arrived quickly and in perfect condition. I felt confident with secure payment options, and the customer support team was incredibly helpful when I had a question. I highly recommend this site to anyone looking for reliable, high-quality medical equipment!",
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: comaImage,
  },
  {
    feedback:
      "I recently bought mother and baby care products from this website, and I’m extremely satisfied with my purchase.  The products are of excellent quality, and they arrived promptly and in perfect condition. I highly recommend this site for anyone looking for reliable, high-quality equipment for mother and baby care.",
    name: "Ramesh Kumar",
    location: "Delhi, India",
    image: comaImage,
  },
  {
    feedback:
      "I recently purchased hospital care equipment for my hospital I recently purchased hospital care equipment  I highly recommend this website for anyone looking for reliable and high-quality hospital care equipment!",
    name: "Neha Patel",
    location: "Ahmedabad, India",
    image: comaImage,
  },
  {
    feedback:
      "I purchased patient care equipment for my grandfather bad sore it’s been perfect for providing the care my grandfather need. The shipping was fast, and everything arrived in excellent condition. i am happy with there product and service",
    name: "Anil Singh",
    location: "Lucknow, India",
    image: comaImage,
  },
  {
    feedback:
      "I recently purchased an infusion set for hospital care.  The infusion set is of excellent quality, durable, and works perfectly for our hospital needs. Shipping was fast, and everything arrived in perfect condition.I also appreciated the secure payment process and responsive customer support. I highly recommend this site for anyone needing reliable medical equipment like infusion sets",
    name: "Akash Singh",
    location: "New Delhi, India",
    image: comaImage,
  },
];

const Testimonial = () => {
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

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <Slider {...sliderSettings}>
          {testimonialsData.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <img src={testimonial.image} alt="Quote" className="quote-icon" />
                <p className="testimonial-feedback">{testimonial.feedback}</p>
                <h5 className="customer-name">{testimonial.name}</h5>
                <p className="customer-location">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
