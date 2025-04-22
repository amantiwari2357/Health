import React, { useEffect, useState } from "react";
import "./productdetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios"; // Import axios
import Swal from "sweetalert2";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Extract weight from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get("price");
  const stock = queryParams.get("stock");

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(""); // For tracking the selected image
  const [productDetails, setProductDetails] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  // Use axios to fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.swhealthcares.com/api/single-product/${id}`
        );
        setProductDetails(response.data.product);
        // Set the first image as the default selected image
        setCurrentImage(response.data.product.productImage[0]);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProductDetails();

    window.scrollTo({
      top: 0,
    });
  }, [id]);

  const addToCart = () => {
    if (!productDetails) return;
    if (quantity < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one item.",
      });
      return;
    }
    const existingCart = JSON.parse(sessionStorage.getItem("Sw Hwalth Cares")) || [];
    const isProductInCart = existingCart.some(
      (item) => item.productId === productDetails._id
    );

    if (isProductInCart) {
      Swal.fire({
        icon: "warning",
        title: "Product Already in Cart",
        text: "This product is already in your cart.",
      });
    } else {
      const cartProduct = {
        productId: productDetails._id,
        productName: productDetails.productName,
        productImage: productDetails.productImage[0],
        price,
        quantity,
      };
      existingCart.push(cartProduct);
      sessionStorage.setItem("Sw Hwalth Cares", JSON.stringify(existingCart));
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${productDetails.productName} has been added to your cart.`,
      });
      navigate("/cart");
    }
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          {productDetails.productName} - Buy {productDetails.productName} Online
        </title>
        <meta name="description" content={productDetails.productDescription} />
        <meta name="keywords" content={productDetails.productName} />
        <meta property="og:title" content={productDetails.productName} />
        <meta
          property="og:description"
          content={productDetails.productDescription}
        />
        <meta property="og:image" content={productDetails.productImage[0]} />
        <meta
          property="og:url"
          content={`https://example.com/products/${id}`}
        />
      </Helmet>

      <section className="minibreadCrumb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-6">
              <Link
                to="/all-products"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </Link>
            </div>
            <div className="col-md-6 col-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <Link className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </Link>
                <Link className="text-black breadSpan" to="#">
                  {productDetails.productName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-2 order-md-1">
              <div className="review">
                {/* Example review stars */}
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              <div className="product-details-content">
                {/* <h5>
                  <Link to="#">{productDetails.productName}</Link>
                </h5> */}
                <h1>{productDetails.productName}</h1>
                <p>
                  <b>Product Details:</b>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetails.productDetails,
                  }}
                />
                <ul>
                  <li>
                    <b>Category:</b>
                    <span style={{ textTransform: "capitalize" }}>
                      {" "}
                      {productDetails.categoryName.categoryName}
                    </span>
                  </li>
                  <li>
                    <b>Availability:</b>{" "}
                    {stock === "Available" ? "In Stock" : "Out of Stock"}
                  </li>
                  <li>
                    <div>
                      <b>Quantity:</b>
                      <span className="quantity-buttons">
                        <button onClick={decreaseQuantity}>-</button>
                        <span style={{ margin: "0 10px" }}>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                      </span>
                    </div>
                  </li>
                  <li className="price">
                    <b>Price:</b>
                    <span className="fs-2">₹{price}</span>
                    &nbsp;
                  </li>
                  <div>
                    {
                      productDetails?.productPdf && (
                        <li>
                        <a
                          href={productDetails?.productPdf || "https://example.com/pdf"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            backgroundColor: "#16a34a", // green-600
                            color: "#ffffff",
                            padding: "10px 16px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")} // green-700
                          onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")} // green-600
                        >
                          View Product PDF
                        </a>
                      </li>
                      )
                    }
                   
                    <li>
                      {stock === "Available" ? (
                        <button className="add-to-cart" onClick={addToCart}>
                          Add To Cart <i className="bi bi-cart"></i>
                        </button>
                      ) : (
                        <p className="out-of-stock-message">
                          This product is currently out of stock.
                        </p>
                      )}
                    </li>

                  </div>

                </ul>
              </div>
            </div>

            <div className="col-md-6 order-1 order-md-2">
              {/* <div className="slider-container">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Product Image",
                      isFluidWidth: true,
                      src: currentImage,
                    },
                    largeImage: {
                      src: currentImage,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImagePosition: "over", // Ensures zoom appears over the image
                  }}
                />
                <div className="thumbnail-container">
                  {productDetails.productImage.map((img, index) => (
                    <div
                      key={index}
                      className="thumbnail-wrapper"
                      onClick={() => setCurrentImage(img)}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="slider-container">
                <img
                  src={currentImage}
                  alt="Main Product"
                  className="main-image"
                  onClick={handleOpenModal}
                  style={{ cursor: "pointer", width: "100%" }}
                />

                <div className="thumbnail-container">
                  {productDetails?.productImage?.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail-wrapper ${currentImage === img ? "active-thumb" : ""
                        }`}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="close-btn" onClick={handleCloseModal}>
                      ✕
                    </button>
                    <img
                      src={currentImage}
                      alt="Zoomed Product"
                      className="modal-img"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="descriptionsTabs">
            <div className="container">
              <div id="exTab1" className="container">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <Link
                      className="product-details-description-button active"
                      id="tab1"
                      data-bs-toggle="tab"
                      to="#1a"
                    >
                      Description
                    </Link>
                  </li>
                </ul>

                <div className="tab-content mt-3">
                  <div className="tab-pane active" id="1a">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetails.productDescription,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial and other sections */}
    </>
  );
};

export default ProductDetails;
