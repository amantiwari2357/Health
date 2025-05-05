import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllVouchers = () => {
  const [vouchers, setVouchers] = useState([]); // State to store the banner data
  const [isLoading, setIsLoading] = useState(false);

  // Fetch vouchers data from the backend when component mounts
  useEffect(() => {
    const fetchVouchers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://health-4-xkdr.onrender.com/api/coupon/all-vouchers"
        );
        setVouchers(response.data.data);
      } catch (error) {
        toast.error("Failed to load vouchers!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  // Delete banner function
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://health-4-xkdr.onrender.com/api/coupon/delete-vouchers/${id}`
        );
        setVouchers(vouchers.filter((event) => event._id !== id));
        Swal.fire("Deleted!", "Your voucher has been deleted.", "success");
      }
    } catch (error) {
      toast.error("Failed to delete voucher!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Vouchers</h4>
        </div>
        <div className="links">
          <Link to="/add-voucher" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      {/* <div className="filteration">
        <div className="selects">
          <select>
            <option>Ascending Order </option>
            <option>Descending Order </option>
          </select>
        </div>
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div> */}

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Code</th>
              <th scope="col">Discount</th>
              <th scope="col">vouchersStatus</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              vouchers?.map((voucher, index) => (
                <tr key={voucher._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{voucher.code}</td>
                  <td>{voucher.discount}</td>
                  <td>{voucher.vouchersStatus ? "Active" : "Inactive"}</td>
                  <td>
                    <Link
                      to={`/edit-voucher/${voucher._id}`}
                      className="bt edit"
                    >
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="bt delete"
                      onClick={() => handleDelete(voucher._id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllVouchers;
