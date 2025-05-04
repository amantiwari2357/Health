import React, { useEffect, useState } from "react";
import "./checkout.css";
import check from "../../images/check.gif";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const userId = sessionStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [originalSubtotal, setOriginalSubtotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const getApiData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/get-user/" + userId
      );

      if (res.status === 200) {
        setUserData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyVoucher = async () => {
    try {
      setError("");
      setSuccess("");
      const response = await axios.post(
        "http://localhost:8000/api/coupon/validate-voucher",
        { code: voucherCode }
      );

      if (response.data.success) {
        setDiscount(response.data.discount);
        let discount = response.data.discount;
        if (discount > 100) {
          setSubtotal(originalSubtotal - discount);
        } else {
          setSubtotal(originalSubtotal - (discount / 100) * originalSubtotal);
        }
        setSuccess(
          `Voucher applied! Discount: ${
            discount < 100 ? `${discount}%` : `₹${discount}`
          } `
        );
      } else {
        setError("Invalid or expired voucher!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        calculateCartSummary(cartItems);
        setError(error.response.data.message || "Invalid or expired voucher!");
      } else {
        console.error("Error applying voucher:", error);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const [shippingAddress, setShippingAddress] = useState({
    name: userData.name,
    email: userData.email,
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });


  const calculateCartSummary = async (cartItems) => {
    let tempSubtotal = 0;
    cartItems.forEach((item) => {
      tempSubtotal += item.price * item.quantity;
    });

    setSubtotal(tempSubtotal);
setOriginalSubtotal(tempSubtotal);
    const pincode = shippingAddress.postalCode;
    if (pincode) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/all-pincode"
        );
        const pinCodeData = response.data.find(
          (item) => item.pincode === parseInt(pincode)
        );
        if (pinCodeData) {
          console.log(
            "Shipping charge for pincode:",
            pinCodeData.shippingCharge
          ); // Check if the data is correct
          setShipping(pinCodeData.shippingCharge);
        } else {
          setShipping(0); // Default shipping if pincode is not found
        }
      } catch (error) {
        console.error("Error fetching shipping charge:", error);
        setShipping(0); 
      }
    } else {
      setShipping(0); 
    }

    // Calculate total with shipping charge
    setTotal(tempSubtotal + shipping);
  };

  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "postalCode") {
      if (value === "") {
        setShipping(0);
      }
    }
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    if (shippingAddress.phone.length !== 10) {
      alert("Please enter a valid phone number");
    }
    Swal.fire({
      title: "Confirm Your Order",
      text: `For your pincode, the shipping charge is ₹${shipping}. Do you want to proceed with the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F37254",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const checkoutData = {
          userId: userId,
          products: cartItems,
          shippingAddress,
          paymentMethod,
          voucher: voucherCode,
          couponDiscount: discount,
        };

        try {
          const res = await axios.post(
            "http://localhost:8000/api/checkout",
            checkoutData
          );
          console.log(res);
          if (res.status === 201) {
            if (paymentMethod === "Online") {
              const { razorpayOrder } = res.data;
              const options = {
                key: "rzp_live_kUQ2ViSJCcE7OR",
                amount: razorpayOrder.amount,
                currency: "INR",
                name: "Sw Health Cares",
                description: "Checkout Payment",
                order_id: razorpayOrder.id,
                handler: async (response) => {
                  const verifyResponse = await axios.post(
                    "http://localhost:8000/api/payment/verify",
                    {
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature,
                      order_id: res.data.checkout._id,
                    }
                  );

                  if (verifyResponse.status === 200) {
                    sessionStorage.removeItem("Sw Hwalth Cares");
                    setIsPopupVisible(true);
                  } else {
                    alert("Payment verification failed");
                  }
                },
                prefill: {
                  name: shippingAddress.name,
                  email: shippingAddress.email,
                  contact: shippingAddress.phone,
                },
                theme: {
                  color: "#F37254", // Customize theme color
                },
              };
              const rzp1 = new window.Razorpay(options);
              rzp1.open();
            } else {
              sessionStorage.removeItem("Sw Hwalth Cares");
              setIsPopupVisible(true);
            }
          }
        } catch (error) {
          console.log("Error in order confirmation:", error);
        }
      } else {
        // Do nothing if the user cancels
        console.log("Order cancelled");
      }
    });
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    navigate("/"); // Redirect to home page or a confirmation page
  };
  useEffect(() => {
    if (shippingAddress.postalCode) {
      calculateCartSummary(cartItems);
    }
  }, [shippingAddress.postalCode, cartItems]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const savedCartItems =
      JSON.parse(sessionStorage.getItem("Sw Hwalth Cares")) || [];
    setCartItems(savedCartItems);
    calculateCartSummary(savedCartItems);
  }, []);

  useEffect(() => {
    if (userData.name && userData.email) {
      setShippingAddress((prevState) => ({
        ...prevState,
        name: userData.name,
        email: userData.email,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (subtotal && shipping !== null) {
      setTotal(subtotal + shipping);
    }
  }, [subtotal, shipping]);

  return (
    <>
      <Helmet>
        <title>Checkout - Secure Your Order Now</title>
        <meta
          name="description"
          content="Complete your checkout process securely and efficiently. Enter shipping details, review your order summary, and confirm your order."
        />
        <meta
          name="keywords"
          content="checkout, order summary, shipping details, secure payment, online store"
        />
      </Helmet>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/all-products"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </Link>
            </div>
            <div className="col-md-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <Link className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </Link>
                /
                <Link className="text-black" to="/cart">
                  Shoping Cart
                </Link>
                /
                <a className="text-black" to="#">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="checkout">
        <div className="checkout-section container">
          <h1 className="mb-3">
            <b>Checkout</b>
          </h1>
          <div className="row">
            <div className="col-md-7">
              <div className="shipping-address">
                <h5>Shipping Address</h5>
                <hr />
                {/* <form> */}
                <div className="row">
                  {/* <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input type="text" id="name" name="name" value={shippingAddress.name} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Email *</label>
                      <input type="email" id="email" name="email" value={shippingAddress.email} onChange={handleInputChange} required />
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        min={0}
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        required
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="country">Country *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="postalCode">Pin Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        placeholder="Pin Code"
                      />
                    </div>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
            <div className="col-md-5">
              <div className="order-summary">
                <h5>Order Summary</h5>
                <hr />
                {/* <form onSubmit={handleConfirmOrder}> */}
                <div className="order-product">
                  <h4>Products in Your Cart</h4>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={item.productImage} alt="" height={50} />
                          </td>
                          <td>{item.productName}</td>
                          <td>&#8377;{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>&#8377;{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="order-totals">
                  <table
                    className="table table-bordered"
                    style={{ borderColor: "var(--themeColor)" }}
                  >
                    <tbody>
                      <tr>
                        <td>Sub-Total</td>
                        <td>&#8377;{originalSubtotal}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td> {shipping === 0 ? "Free" : `₹${shipping}`}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>&#8377;{total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setError("");
                        setSuccess("");
                      }
                      setVoucherCode(e.target.value);
                    }}
                  />
                  {error ? (
                    <p
                      style={{
                        color: "red",
                        display: error ? "block" : "none",
                      }}
                    >
                      {error ? error : ""}
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "green",
                        display: success ? "block" : "none",
                      }}
                    >
                      {success ? success : ""}
                    </p>
                  )}

                  <button onClick={applyVoucher}>Apply</button>
                </div>
                <div className="form-group">
                  <label htmlFor="payment-method">Payment Method</label>
                  <select
                    id="payment-method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {/* <option value="">-- Please Select --</option> */}
                    <option value="Online">Online</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="add-to-cart"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={check} alt="" />
            <h2>Your order has been placed!</h2>
            <p>Your order has been successfully processed!</p>
            <p>
              Please direct any questions you have to the{" "}
              <a style={{ color: "var(--themeColor)" }} to="/contact-us">
                {" "}
                store owner.
              </a>
            </p>
            <button onClick={handleClosePopup} className="add-to-cart">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
