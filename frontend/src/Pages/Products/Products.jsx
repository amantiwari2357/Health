import React, { useEffect, useState } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://health-4-xkdr.onrender.com/api/all-category"
      );
      const fetchedCategories = response.data;
      setCategories(fetchedCategories);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts(1, false); 
  }, []);
  const fetchProducts = async ( currentPage = 1, append = false) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://health-4-xkdr.onrender.com/api/get-product?page=${currentPage}&limit=10`
      );
  
      console.log("filtered", response);
      const filtered = response.data.products
  
      if (filtered.length === 0) {
        setHasMore(false);
      }else{

        setProducts(append ? [...products, ...filtered] : filtered);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  
  // On scroll, load more
  useEffect(() => {
    const handleScroll = () => {
      const buffer = 700;
  
      if (
        window.innerHeight + document.documentElement.scrollTop + buffer >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);
  // Handle category click
  const handleCategoryChange = (categoryId) => {
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId);
    }
    navigate(`/product-by-category/${categoryId}`)

  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  };
  
  useEffect(() => {
    if (page > 1) {
      fetchProducts( page, true);
    }
  }, [page]);
  function truncateText(text, charLimit) {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  }
  
  return (
    <>
      <Helmet>
        <title>Products - Medicinal Ghee, Agarbatthi, and More</title>
        <meta
          name="description"
          content="Explore our wide range of products including Ghee, Agarbatthi, and other medicinal products. Shop now for the best prices and quality."
        />
      </Helmet>
      <section className="productsPage">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="productSidebar">
                <h4 className="product-heading">Categories</h4>
                <hr />
                <ul className="category-list">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className={
                        selectedCategory === category._id ? "active-category" : ""
                      }
                      onClick={() => handleCategoryChange(category._id)}
                    >
                      {category.categoryName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* All Products */}
            <div className="col-md-9">
              <div className="headings">
                <h2>All Products</h2>
              </div>
              <div className="all-products">
                <div className="row">
                  {products.map((product, index) => (
                    <div key={product._id} className="col-md-3 col-6">
                      <div className="res-margin">
                        <div className="product-card-page">
                          <div className="product-image-product">
                            <img
                              src={product.productImage[0]}
                              alt={product.productName}
                              className="img-fluid"
                            />
                          </div>
                          <div className="productName">
                            <h3 className="product-title">
                              {truncateText(product.productName, 20)}
                            </h3>
                            <div className="price">
                              <p className="cut-price">
                                <del> &#8377;{product.productPrice}</del>
                              </p>
                              <p className="original-price">
                                Off {product.productDiscountPercentage} %
                              </p>
                              <p className="current-price">
                                ₹ {Math.floor(product.productFinalPrice)}
                              </p>
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
                    </div>
                  ))}
                </div>
                {/* {loading && (
                  <div className="text-center mt-4">
                    <p>Loading more products...</p>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
