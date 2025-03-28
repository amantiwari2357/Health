import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State to store categories
  const [formData, setFormData] = useState({
    categoryName: "",
    productName: "",
    productDetails: "",
    productDescription: "",
    productPrice: "",
    productDiscountPercentage: 0,
    productFinalPrice: 0,
    tax: "",
    stock: "Available",
    productImage: [],
    productStatus: false,
    bestseller: false,
  });

  // Fetch categories from API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/all-category"
        );
        setCategories(response.data); // Set categories to state
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormData((prevState) => ({
      ...prevState,
      productFinalPrice: prevState.productPrice - (prevState.productPrice * prevState.productDiscountPercentage / 100)
    }))
   
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      productImage: Array.from(e.target.files),
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked, // Toggle the product status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare FormData to submit
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("categoryName", formData.categoryName);
      formDataToSubmit.append("productName", formData.productName);
      formDataToSubmit.append("productDetails", formData.productDetails);
      formDataToSubmit.append(
        "productDescription",
        formData.productDescription
      );
      formDataToSubmit.append("productStatus", formData.productStatus);
      formDataToSubmit.append("bestseller", formData.bestseller);
      formDataToSubmit.append("productPrice", formData.productPrice);
      formDataToSubmit.append(
        "productDiscountPercentage",
        formData.productDiscountPercentage
      );
      formDataToSubmit.append("productFinalPrice", formData.productFinalPrice);
      formDataToSubmit.append("stock", formData.stock);
      formDataToSubmit.append("tax", parseInt(formData.tax));
      // Append productImage
      formData.productImage.forEach((image) => {
        formDataToSubmit.append("productImage", image);
      });

      // Send the data to backend API
      const response = await axios.post(
        "http://localhost:8000/api/add-product",
        formDataToSubmit,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(response.data.message);
      navigate("/all-products");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Product</h4>
        </div>
        <div className="links">
          <Link to="/all-products" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="categoryName" className="form-label">
              Category<sup className="text-danger">*</sup>
            </label>
            <select
              name="categoryName"
              className="form-select"
              id="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {/* Map through categories and display them dynamically */}
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-8">
            <label htmlFor="productName" className="form-label">
              Product Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="productName"
              className="form-control"
              id="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
              placeholder="Product Name"
            />
          </div>

          <div className="col-12">
            <label htmlFor="productDetails" className="form-label">
              Product Details<sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              value={formData.productDetails}
              onChange={(value) =>
                setFormData({ ...formData, productDetails: value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="productDescription" className="form-label">
              Product Description<sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              value={formData.productDescription}
              onChange={(value) =>
                setFormData({ ...formData, productDescription: value })
              }
            />
          </div>
          <div className="col-md-2 me-2">
            <label className="form-label">
              Price<sup className="text-danger">*</sup>
            </label>
            <input
              type="number"
              className="form-control"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
              placeholder="Price"
              required
            />
          </div>
          <div className="col-md-2 me-2">
            <label className="form-label">
              Discount %<sup className="text-danger">*</sup>
            </label>
            <input
              type="number"
              className="form-control"
              name="productDiscountPercentage"
              value={formData.productDiscountPercentage}
              onChange={handleInputChange}
              placeholder="Discount Percentage"
              required
              min={0}
              max={100}
            />
          </div>
          <div className="col-md-2 me-2">
            <label className="form-label">
              Final Price<sup className="text-danger">*</sup>
            </label>
            <input
              type="number"
              className="form-control"
              name="productFinalPrice"
              value={formData.productFinalPrice}
              onChange={handleInputChange}
              placeholder="Final Price"
              required
            />
          </div>
          <div className="col-md-2 me-2">
            <label className="form-label">
              Tax %<sup className="text-danger">*</sup>
            </label>
            <select
              name="tax"
              id=""
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Tax</option>
              <option value="0%">0%</option>
              <option value="3%">3%</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
              <option value="28%">28%</option>
            </select>
          </div>
          <div className="col-md-2 me-2">
            <label className="form-label">
              Stock<sup className="text-danger">*</sup>
            </label>
            <select
              className="form-select"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            >
              <option value="Available">Available</option>
              <option value="UnAvailable">UnAvailable</option>
            </select>
          </div>
          {/* Image upload section */}
          <div className="">
            {formData.productImage.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                className="img-thumbnail mb-2"
                style={{ width: "100px", height: "100px" }}
                alt="Product Preview"
              />
            ))}
          </div>

          <div className="col-md-12">
            <input
              type="file"
              name="productImage"
              multiple
              className="form-control-file border p-2 mt-1 rounded shadow-sm"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="checkbox"
              name="productStatus"
              checked={formData.productStatus}
              onChange={handleCheckboxChange}
            />
            &nbsp;{" "}
            <label className="form-label">
              Product Status (Available/Unavailable)
              <sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="col-md-6">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleCheckboxChange}
            />
            &nbsp;{" "}
            <label className="form-label">
              Product Best Seller (Available/Unavailable)
              <sup className="text-danger">*</sup>
            </label>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className={`btn ${isLoading ? "not-allowed" : "allowed"}`}
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
