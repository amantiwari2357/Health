import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// // Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
  },
  section: {
    marginBottom: 10,
  },
  shipping: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
});

// // PDF Component
const InvoicePDF = ({ order }) => {
  const [taxDetails, setTaxDetails] = useState([]);
  useEffect(() => {
    const fetchTaxDetails = async () => {
      const details = [];
      for (const product of order.products) {
        console.log("order1", product.price);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/single-product/${product.productId}`
          );
          const productDetails = response.data.product;

          if (response.status === 200) {
            console.log("order22222222", productDetails);

            if (
              productDetails.productInfo &&
              productDetails.productInfo.length > 0
            ) {
              const productInfo = productDetails.productInfo.find(
                (info) => info.productFinalPrice === product.price
              );
              const tax = productInfo ? productInfo.tax : 0;
              details.push({ ...product, tax });
            } else {
              const tax = productDetails.tax || 0;
              details.push({ ...product, tax });
            }
          }
        } catch (error) {
          console.log(`Error fetching product details for ID:`, error);
          toast.error(`Failed to fetch tax details for ${product.productName}`);
        }
      }
      setTaxDetails(details);
    };

    fetchTaxDetails();
  }, [order]);
  console.log("taxDetails", taxDetails);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>SW Health Care</Text>
        <Text style={styles.shipping}>Shipping Details</Text>
        <Text style={styles.section}>Order ID: {order._id}</Text>
        <Text style={styles.section}>
          Customer Name: {order.shippingAddress.name}
        </Text>
        <Text style={styles.section}>
          Address: {order.shippingAddress.address}, {order.shippingAddress.city}
          , {order.shippingAddress.state}, {order.shippingAddress.country} -{" "}
          {order.shippingAddress.postalCode}
        </Text>
        <Text style={styles.section}>
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, { backgroundColor: "#ddd" }]}>
            <Text style={[styles.tableCol, styles.bold]}>Product Name</Text>
            {/* <Text style={[styles.tableCol, styles.bold]}>Weight</Text> */}
            <Text style={[styles.tableCol, styles.bold]}>Quantity</Text>
            <Text style={[styles.tableCol, styles.bold]}>Tax (%)</Text>
            <Text style={[styles.tableCol, styles.bold]}>
              Price (Excl. Tax)
            </Text>
            <Text style={[styles.tableCol, styles.bold]}>Final Price</Text>
          </View>
          {taxDetails.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{product.productName.trim()}</Text>
              {/* <Text style={styles.tableCol}>{product.weight.toString().trim()}</Text> */}
              <Text style={styles.tableCol}>{product.quantity}</Text>

              <Text style={styles.tableCol}>
                {Number(product.tax).toFixed(2)}%
              </Text>
              <Text style={styles.tableCol}>
                ₹
                {Number(product.price / (1 + product.tax / 100))
                  .toFixed(2)
                  .replace(/[^\d.-]/g, "")}
              </Text>
              <Text style={styles.tableCol}>
                ₹
                {Number(product.price)
                  .toFixed(2)
                  .replace(/[^\d.-]/g, "")}
              </Text>
            </View>
          ))}
        </View>

        {/* <Text style={styles.section}>Price : ₹{order.shippingCost}</Text> */}
        <Text style={styles.section}>Shipping Cost: ₹{order.shippingCost}</Text>
        {order?.voucher === 0 ? (
          ""
        ) : (
          <Text style={styles.section}>Total Amount: ₹{order.totalAmount}</Text>
        )}
        <Text style={styles.section}>Total Amount: ₹{order.totalAmount}</Text>
        <Text style={styles.footer}>Thank you for your order!</Text>
      </Page>
    </Document>
  );
};

const EditOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/single-order-data/${orderId}`
        );
        if (response.data.success) {
          setOrder(response.data.data);
          setOrderStatus(response.data.data.orderStatus);
          setPaymentStatus(response.data.data.paymentStatus);
        } else {
          toast.error("Failed to fetch order details!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching order details!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update-order/${orderId}`,
        {
          orderStatus,
          paymentStatus,
        }
      );
      if (response.data.success) {
        toast.success("Order updated successfully!");
        navigate("/all-orders");
        setOrder(response.data.data);
      } else {
        toast.error("Failed to update order!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order data available.</div>;
  }
  console.log("DDDD", order);
  return (
    <>
      <ToastContainer />

      <div className="bread">
        <div className="head">
          <h4>Update Order</h4>
        </div>
        <div className="links">
          <Link to="/all-orders" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5 className="card-title">Order Details</h5>
                <PDFDownloadLink
                  document={<InvoicePDF order={order} />}
                  fileName={`Invoice_${order._id}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <button className="btn btn-secondary">Loading...</button>
                    ) : (
                      <button className="btn btn-success">
                        Download Invoice
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Order ID</th>
                      <td>{order._id}</td>
                    </tr>
                    <tr>
                      <th scope="row">User Name</th>
                      <td>{order.shippingAddress.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{order.shippingAddress.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone Number</th>
                      <td>{order.shippingAddress.phone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state},{" "}
                        {order.shippingAddress.country} -{" "}
                        {order.shippingAddress.postalCode}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Order Date</th>
                      <td>{new Date(order.orderDate).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th scope="row">Shipping</th>
                      <td>₹{order.shippingCost}</td>
                    </tr>
                    <tr>
                      <th scope="row">Coupon Discount</th>
                      <td>{order?.voucher}%</td>
                    </tr>
                    <tr>
                      <th scope="row">Final Price</th>
                      <td>₹{order.totalAmount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Order Status</th>
                      <td>
                        <select
                          value={orderStatus}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          className="form-control"
                          disabled={
                            order.orderStatus === "Delivered" ||
                            order.orderStatus === "Cancelled"
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Payment Mode</th>
                      <td>{order.paymentMethod}</td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Id</th>
                      <td>{order?.paymentInfo?.transactionId}</td>
                    </tr>

                    <tr>
                      <th scope="row">Payment Status</th>
                      <td>
                        <select
                          value={paymentStatus}
                          onChange={(e) => setPaymentStatus(e.target.value)}
                          disabled={order.paymentStatus === "Successfull"}
                          className="form-control"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                          <option value="Successfull">Successfull</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Items</h5>
              </div>
              <div className="card-body">
                {order.products.map((product, index) => (
                  <div className="mb-3" key={index}>
                    <strong>{product.productName}</strong>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{
                        maxWidth: "100px",
                        display: "block",
                        margin: "10px 0",
                      }}
                    />
                    <p className="mb-1">Quantity: {product.quantity}</p>
                    <p className="mb-0">Price: ₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="btn btn-primary" onClick={"handleLogin"}>
            Ready To Ship
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
