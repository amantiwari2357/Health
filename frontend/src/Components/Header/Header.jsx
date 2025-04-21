import React, { useEffect, useState } from "react";
import "./header.css";
import logo from "../../images/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import catPdf from "../../images/catpdf.pdf";
import axios from "axios";
// import axios from "axios";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);
  }, [location.search]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const searchbarToggle = () => {
    setSearch(!search);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(value)}`);
    } else {
      navigate(`/all-products`);
    }
  };

  //   if (value.trim() === "") {
  //     setSearchResults([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`https://api.swhealthcares.com/api/search`, {
  //       params: { productName: value }, // Pass query params in Axios
  //     });
  //     console.log(response);
  //     setSearchResults(response.data.products || []);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   }
  // };

  const loginValue = sessionStorage.getItem("Login");

  // Fetch categories on load
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          // fetchProducts(firstCategory._id, 1, false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/product-by-category/${categoryId}`)
    // setPage(1);
    // setHasMore(true);
    // fetchProducts(categoryId, 1, false);
  };
  return (
    <>
      {/* Top Header Section */}
      <section className="headerTop">
        <div className="container">
          <div className="row desktopHeaderTop align-items-center">
            <div className="col-md-3">
              <div className="top-header-main">
                <ul className="list-unstyled d-flex gap-3">
                  <li>
                    <Link to="/about-us" aria-label="About">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://forms.gle/Yot8FHmFj4fvpXh67"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact"
                    >
                      Warranty Registration
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <marquee
                behavior="smooth"
                style={{ color: "var(--themeColor)" }}
                direction=""
              >
                <b> Welcome To SW Healthcare</b>. SW Healthcare is your one-stop
                shop for medical supplies, including Stethoscopes.
              </marquee>
            </div>
            <div className="col-md-3 text-end">
              <div className="top-header-search">
                <p onClick={searchbarToggle} style={{ cursor: "pointer" }}>
                  <i className="bi bi-search" aria-hidden="true"></i> Search
                </p>
                {loginValue ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Profile
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/register")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Register
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Top Header */}
          <div className="row responsiveHeaderTop">
            <div className="col-8 p-0">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search"
                className="m-0"
              />
            </div>
            <div className="col-4 p-0 text-end">
              <div className="top-header-search">
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-primary"
                >
                  <i className="bi bi-person" aria-hidden="true"></i> Register
                </button>
              </div>
            </div>
          </div>

          {search ? (
            <div className="global-search">
              <input
                type="search"
                placeholder="Search Products..."
                name="search-global"
                id=""
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2 col-6">
              <Link to={"/"}>
                <img
                  style={{ objectFit: "cover" }}
                  src={logo}
                  className="w-100"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <nav className="header-main">
                <ul className="d-flex list-unstyled gap-3">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="custom-dropdown">
                    <span className="custom-dropdown-toggle"><Link to={'/all-products'}> Our Category</Link></span>
                    <ul className="custom-dropdown-menu">
                      {categories.map((category) => (
                        <li
                        style={{cursor:'pointer'}}
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
                  </li>

                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>

                  <li>
                    <Link to="/event">Events</Link>
                  </li>
                  <li>
                    <a
                      href={catPdf}
                      className="link-animation"
                      download="E-Catalogue.pdf"
                    >
                      E-Catalogue
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4 col-6 text-end">
              {/* Toggle Sidebar Button */}
              <button
                className="d-md-none toggleButton"
                onClick={toggleSidebar}
                aria-label="Toggle Navigation"
              >
                <i className="bi bi-list"></i>
              </button>
              <div className="header-card-option d-none d-md-flex">
                <div>
                  <p className="mb-0">Call and make an appointment</p>
                  <h3>
                    <Link
                      style={{
                        color: "var(--themeColor)",
                        textDecoration: "none",
                      }}
                      to="tel:+91 9220442515"
                      aria-label="Call us"
                    >
                      +91 9220442515
                    </Link>
                  </h3>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="btn btn-success"
                  aria-label="View Cart"
                >
                  <i className="bi bi-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="sidebarCloseBtn">
          <button
            className="close-btn"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>
        <ul className="list-unstyled">
          <li onClick={toggleSidebar}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/about-us">About Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/all-products">Products</Link>
          </li>
          <li>
            <a

              href="https://forms.gle/Yot8FHmFj4fvpXh67"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact"
              onClick={toggleSidebar}
            >
              Warranty Registration
            </a>
          </li>

        </ul>
      </aside>
    </>
  );
};

export default Header;
