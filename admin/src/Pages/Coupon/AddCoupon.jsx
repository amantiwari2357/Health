import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

const AddVouchers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vouchersName, setVouchersName] = useState("");
  const [discount, setDiscount] = useState("");
  const [vouchersStatus, setVouchersStatus] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {};
    formData.code = vouchersName;
    formData.discount = discount;
    formData.status = vouchersStatus;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/coupon/create-vouchers",
        formData
      );
      setIsLoading(false);
      toast.success("Vouchers added successfully!");
      navigate("/all-vouchers");
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.errors?.vouchersName ||
          error?.response?.data?.message ||
          "Failed to add vouchers"
      );
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Vouchers</h4>
        </div>
        <div className="links">
          <Link to="/all-vouchers" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3" onSubmit={handleFormSubmit}>
          <div className="col-md-6">
            <label htmlFor="vouchersName" className="form-label">
              Vouchers Code<sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="vouchersName"
              className="form-control"
              id="vouchersName"
              value={vouchersName}
              onChange={(e) => setVouchersName(e.target.value)}
              required
              placeholder="Vouchers Name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="vouchersDiscount" className="form-label">
              Vouchers Discount<sup className="text-danger">*</sup>
            </label>
            <input
              type="number"
              name="vouchersDiscount"
              className="form-control"
              id="vouchersImage"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="vouchersActive"
                id="vouchersActive"
                checked={vouchersStatus}
                onChange={(e) => setVouchersStatus(e.target.checked)} // Update based on event
              />

              <label className="form-check-label" htmlFor="vouchersActive">
                Active
              </label>
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "not-allowed" : "allowed"}`}
            >
              {isLoading ? "Please Wait..." : "Add Vouchers"}
            </button>
          </div>
        </form>
      </div>

      {/* Show loader when the form is submitting */}
      {isLoading && <CustomLoader />}
    </>
  );
};

export default AddVouchers;
