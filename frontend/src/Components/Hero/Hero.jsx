import React, { useEffect, useState } from "react";
// import bannerImage1 from "../../images/banner1.jpg";
import "./hero.css";
import Slider from "react-slick";
import grocery from "../../images/grocery.png";
import CountUp from "react-countup";

import ProductsTabs from "../ProductsTabs/ProductsTabs";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
const [article, setArticle] = useState([]);
  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/all-banner"
      );
      console.log(response);
      const newData = response.data.banners;
      const filterData = newData.filter((x) => x.bannerStatus === true);
      setBanner(filterData);
    } catch (error) {
      // toast.error("Failed to load banners!");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-product"
      );
      const productData = response.data.products || [];
      const bestsellers = productData.filter(
        (product) => product.bestseller === true
      );
      setProducts(bestsellers);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const handleViewDetails = (product) => {
    navigate(
      `/product/product-details/${product._id}?&price=${product.productFinalPrice}&stock=${product.stock}`
    );
  };

  const handleScroll = () => {
    const section = document.getElementById("stats-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setInView(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  var settings = {
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const articles = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function truncateText(text, charLimit) {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  }



const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/all-events");
    console.log("fetch article",response.data);
    
    setArticle(response.data);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};
  useEffect(() => {
    fetchBanners();
    fetchProducts();
    fetchArticles();
  },[])
  return (
    <>
      <section className="sidebutton">
        <a href="#home">
          <i class="bi bi-arrow-up-circle"></i>
        </a>
      </section>
      <section className="sidewhatsapp">
        <a target="_blank" href="https://wa.me/9220442515">
          <i class="bi bi-whatsapp"></i>
        </a>
      </section>
      <section className="sidecall">
        <a href="tel:+919220442515">
          <i class="bi bi-telephone"></i>
        </a>
      </section>
      <section id="home" className="hero">
        <div className="heroCarousel">
          <div
            id="carouselExampleControls"
            data-bs-target="#carouselExampleControls"

            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
            onhover="false"
          >
            <div className="carousel-inner">
              {banner.length > 0
                ? banner.map((bannerItem, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={bannerItem.id || index} // Assuming each banner has a unique `id`
                    >
                      <img
                        src={bannerItem.bannerImage} // Assuming the banner has an 'image' property
                        className="d-block"
                        alt={`Banner ${index + 1}`}
                      />
                    </div>
                  ))
                : // <div className="carousel-item active">
                  //   <img
                  //     src={bannerImage1} // Fallback to a default image
                  //     className="d-block w-100"
                  //     alt="Default Banner"
                  //   />
                  // </div>
                  null}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="hero-product">
        <div className="container">
          <div className="headings">
            <h2>Bestsellers</h2>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {products &&
                products.map((product, index) => (
                  <div key={index}>
                    <div className="product-card">
                      {/* <Link to={"/product/product-details"}> */}
                      <div className="product-image">
                        <img
                          src={product.productImage[0]}
                          alt={product.productName}
                        />
                      </div>
                      <div className="productName">
                        <h3 className="product-title">
                          {truncateText(product.productName, 100)}
                          {/* {product.productName} */}
                        </h3>
                        <div className="price text-end">
                          <>
                            <span className="current-price">
                              <del>&#8377; {product.productPrice}</del>
                            </span>{" "}
                            <br />
                            <span className="original-price">
                              Off {product.productDiscountPercentage}%
                            </span>{" "}
                            <br />
                            <span className="current-price">
                              &#8377; {product.productFinalPrice}
                            </span>
                          </>
                        </div>
                      </div>
                      {/* </Link> */}

                      <button
                        onClick={() => handleViewDetails(product)}
                        className="add-to-cart"
                      >
                        View Details <i class="bi bi-chevron-double-right"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="grocery">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h4>Welcome To SW Healthcare</h4>
              <h2>
                <b>SW Healthcare</b> is your one-stop shop for medical supplies,
                including Stethoscopes
              </h2>
              <p>
                The option to use our state-of-the-art laser engraving service.
                With a wide range of products, competitive prices, and fast
                delivery. Whether you're a healthcare professional or an
                individual, SW is the place to find the medical supplies you
                need.
              </p>
              <Link className="button_" to="/all-products">
                Check More Products <i class="bi bi-bag"></i>
              </Link>
            </div>
            <div className="col-md-5">
              <img className="w-100" src={grocery} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="countUp">
        <div id="stats-section" className="stats-container">
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={200} duration={2} />}+</h1>
            <p>Vendors</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={654} duration={2} />}K+</h1>
            <p>Sales</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={587} duration={2} />}K+</h1>
            <p>Customers</p>
          </div>
          <div className="stat-item">
            <h1>
              {inView && (
                <CountUp start={0} end={4.9} duration={2} decimals={1} />
              )}
              +
            </h1>
            <p>Happy Clients And Partners</p>
          </div>
        </div>
      </section>

      <section className="productDetailsCols">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="fruitvegitabls1">
                <div className="overlay">
                  <div className="firstCol">
                    <h6>URO-Flo Urine Bag</h6>
                    <h4>Reliable and Comfortable Solution</h4>
                    <p>
                      The URO-Flo Urine Bag from SW Healthcare is designed for
                      comfort and hygienic urine collection. Perfect for
                      patients with specific medical needs, this product offers
                      both reliability and convenience for long-term use.
                    </p>
                    {/* <Link className="button_" to="">
                      Show More
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls2">
                <div className="overlay">
                  <h6>Premium Douche Set</h6>
                  <h4>Effective Personal Hygiene</h4>
                  <p>
                    SW Healthcare's Premium Douche Set is designed to provide
                    effective personal care and hygiene. It ensures comfort,
                    cleanliness, and refreshment, making it an essential part of
                    your daily hygiene routine.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls3">
                <div className="overlay">
                  <h6>Steam Vaporizer</h6>
                  <h4>Improve Respiratory Health</h4>
                  <p>
                    SW Healthcare's Steam Vaporizer provides an effective
                    solution to ease respiratory congestion. Ideal for
                    individuals suffering from cold or flu, this product helps
                    to clear nasal passages and promotes healthy breathing.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductsTabs />

      <section className="article">
        <div className="container">
          <div className="headings">
            <h2>Articles</h2>
            <div className="Article-carousel">
              <div className="slider-container">
                <Slider {...articles}>
                  {article.map((item, index) => (
                    <div>
                      <div className="article_card">
                        <img src={item.eventImage} alt="" />
                        <h5 dangerouslySetInnerHTML={{ __html: truncateText(item.eventName, 20) }}></h5>
                        <p dangerouslySetInnerHTML={{ __html: truncateText(item.eventDetails, 50) }}></p>

                        <p className="date">{item.date}</p>
                        <div className="d-flex justify-start">
                          <Link className="button_" to={`/article/${item._id}`}>
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
};

export default Hero;
