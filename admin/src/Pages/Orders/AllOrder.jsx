import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://api.swhealthcares.com/api/order-data"
      );
      if (response.status === 200) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://api.swhealthcares.com/api/delete-order-data/${orderId}`
        );
        if (response.status === 200) {
          toast.success("Order deleted successfully!");
          fetchOrders(); // Refetch orders after deletion
        } else {
          toast.error("Failed to delete the order. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting the order:", error);
      toast.error("An error occurred while deleting the order.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Orders</h4>
        </div>
        <div className="links">
          {/* Additional links or actions can be placed here */}
        </div>
      </div>

      <div className="filteration">
        <div className="selects">
          <select>
            <option value="">All Orders</option>
            <option value="today">Today's Orders</option>
            <option value="yesterday">Yesterday's Orders</option>
            <option value="thisWeek">This Week's Orders</option>
            <option value="thisMonth">This Month's Orders</option>
            <option value="thisYear">This Year's Orders</option>
          </select>
        </div>
        <div className="search">
          <label htmlFor="search">Search </label>&nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div>

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Order ID</th>
              {/* <th scope="col">Items</th> */}
              <th scope="col">Final Price</th>
              <th scope="col">Order Status</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={`/edit-order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllOrder;
