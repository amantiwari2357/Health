import React, { useState, useEffect } from "react";
import "./product-tabs.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsTabs = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // show only 10 initially

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
          setVisibleCount(10); // reset when tab changes
        })
        .catch((error) => console.error(error));
    }
  }, [activeTab]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
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
                className={`tab-button ${activeTab === category._id ? "active" : ""}`}
                onClick={() => setActiveTab(category._id)}
                style={{ textTransform: "capitalize" }}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        <div className="tab-content">
          <div className="row">
            {products.slice(0, visibleCount).map((product, index) => (
              <div className="col-md-3 col-6 mb-4" key={product._id}>
                <div className="product-card">
                  <div className="product-image">
                    <img
                      src={product.productImage[0]}
                      alt={`Product ${index + 1}`}
                      className="img-fluid"
                    />
                  </div>
                  <div className="productName">
                    <h3 className="product-title">
                      {truncateText(product.productName, 100)}
                    </h3>
                    <div className="price">
                      <p className="cut-price">
                        <del>₹ {product.productPrice}</del>
                      </p>
                      <p className="original-price">
                        Off {product.productDiscountPercentage}%
                      </p>
                      <p className="current-price">
                        ₹ {Math.floor(product.productFinalPrice)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="add-to-cart mt-2"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="text-center">
              <button className="btn btn-primary mt-3" onClick={handleViewMore}>
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsTabs;
