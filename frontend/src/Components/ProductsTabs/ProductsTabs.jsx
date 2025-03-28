import React, { useState, useEffect } from "react";
import "./product-tabs.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductsTabs = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedWeights, setSelectedWeights] = useState({}); // New state for selected weights

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get("https://api.swhealthcares.com/api/all-category")
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) setActiveTab(response.data[0]._id);
      });
  }, []);

  useEffect(() => {
    if (activeTab) {
      axios
        .get("https://api.swhealthcares.com/api/get-product")
        .then((response) => {
          const filteredProducts = response.data.products.filter(
            (product) => product.categoryName._id === activeTab
          );
          setProducts(filteredProducts);
        })
        .catch((error) => console.error(error));
    }
  }, [activeTab]);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  };

  return (
    <section className="products-tabs mt-3">
      <div className="container">
        <div className="product_heading_tab">
          <div className="tabsection">
            <h2>
              <b>Advanced Medical Solutions</b> <br />
              Enhancing Health and Comfort with Quality Care!
            </h2>
          </div>
          <div className="tabs">
            {categories.slice(0, 7).map((category) => (
              <button
                key={category._id}
                className={`tab-button ${
                  activeTab === category._id ? "active" : ""
                }`}
                onClick={() => setActiveTab(category._id)}
                style={{ textTransform: "capitalize" }}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        <div className="tab-content mt-3">
          <div className="slider-container">
            <Slider {...settings}>
              {products.map((product, index) => {
                return (
                  <div key={product._id}>
                    <div className="product-card">
                      <div className="product-image">
                        <img
                          src={product.productImage[0]}
                          alt={`Product ${index + 1}`}
                        />
                      </div>
                      <div className="productName">
                        <h3 className="product-title">
                          {truncateText(product.productName, 100)}
                        </h3>
                        <div className="price text-end">
                          <span className="current-price">
                            <del> ₹ {product.productPrice}</del>
                          </span>
                          <br />
                          <span className="discount-price text-danger">
                            Off {product.productDiscountPercentage} %
                          </span>
                          <br />
                          <span className="current-price">
                            ₹ {product.productFinalPrice}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="add-to-cart"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsTabs;
