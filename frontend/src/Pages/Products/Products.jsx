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

  // Fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.swhealthcares.com/api/all-category"
        );
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          const firstCategory = fetchedCategories[0];
          setSelectedCategory(firstCategory._id);
          fetchProducts(firstCategory._id, 1, false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  const fetchProducts = async (categoryId, currentPage = 1, append = false) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.swhealthcares.com/api/get-product?page=${currentPage}&limit=10`
      );

      const filtered = response.data.products.filter(
        (product) => product.categoryName._id === categoryId
      );

      if (filtered.length === 0) {
        setHasMore(false);
      }

      setProducts((prev) => (append ? [...prev, ...filtered] : filtered));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // On scroll, load more
  useEffect(() => {const handleScroll = () => {
    const buffer = 200; 
  
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

  // Watch for page change
  useEffect(() => {
    if (selectedCategory && page > 1) {
      fetchProducts(selectedCategory, page, true);
    }
  }, [page]);

  // Handle category click
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
    setHasMore(true);
    fetchProducts(categoryId, 1, false);
  };

  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  };

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
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 productSidebar">
              <h4>Categories</h4>
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

            {/* All Products */}
            <div className="col-md-9 all-products">
              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-md-4 col-6 res-margin">
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
                          {truncateText(product.productName, 100)}
                        </h3>
                        <div className="price">
                          <span className="current-price">
                            <del> &#8377;{product.productPrice}</del>
                          </span>{" "}
                          <br />
                          <span className="current-price text-danger">
                            Off {product.productDiscountPercentage} %
                          </span>{" "}
                          <br />
                        </div>
                        <div className="current-price">
                          {" "}
                          &#8377;{product.productFinalPrice}
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
                ))}
              </div>
              {loading && (
                <div className="text-center mt-4">
                  <p>Loading more products...</p>
                </div>
              )}
              {/* {!hasMore && (
                <div className="text-center mt-4 text-muted">
                  <p>No more products to show</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
