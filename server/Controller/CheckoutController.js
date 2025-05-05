const Checkout = require("../Models/CheckoutModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios");
const CouponCode = require("../Models/VocherModel");

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   rzp_test : process.env.RAZORPAY_KEY_TEST,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

exports.checkout = async (req, res) => {
  console.log("Checkout route hit");
  console.log(req.body);
  const { userId, products, shippingAddress, paymentMethod, voucher } = req.body;
 
  const pincode = shippingAddress.postalCode;
  const subtotal = products.reduce((total, item) => total + item.price * item.quantity, 0);
  let shippingCost = 0;
  let discountCoupon = 0;
  if (pincode) {
    try {
      const response = await axios.get(
        "https://api.swhealthcares.com/api/all-pincode"
      );
      const pinCodeData = response.data.find(
        (item) => item.pincode === parseInt(pincode)
      );
      if (pinCodeData) {
        shippingCost = pinCodeData.shippingCharge;
      }
    } catch (error) {
      console.error("Error fetching shipping charge:", error);
    }
  }
  if (voucher) {
  
    try {
      var coupon = await CouponCode.findOne({ code: voucher });
      if (coupon && coupon.vouchersStatus) {
        if (coupon.discount > 0) {
          if (coupon.discount < 100) {
            discountCoupon = (subtotal * coupon.discount) / 100;
          } else {
            discountCoupon = coupon.discount;
          }
          discountCoupon = Math.min(discountCoupon, subtotal);
        } else {
          return res.status(400).json({ error: "Coupon code has no valid discount" });
        }
      } else {
        return res.status(400).json({ error: "Invalid or expired coupon code" });
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      return res.status(500).json({ error: "Error validating coupon" });
    }
  }

  const totalAmount = subtotal + shippingCost - discountCoupon;
  try {
    const checkout = new Checkout({
      userId,
      voucher: coupon?.discount || 0,

      products: products.map((item) => ({
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      shippingCost,
    });
    // if (paymentMethod === "Online") {
    //   const razorpayOrder = await razorpayInstance.orders.create({
    //     amount: totalAmount * 100,
    //     currency: "INR",
    //     receipt: checkout._id.toString(),
    //     payment_capture: 1,
    //   });
    //   console.log("", razorpayOrder);
    //   checkout.paymentInfo = {
    //     transactionId: razorpayOrder.id,
    //     orderId: razorpayOrder.receipt,
    //   };
    //   await checkout.save();
    //   return res.status(201).json({
    //     message: "Checkout successful. Payment initiated via Razorpay.",
    //     checkout,
    //     razorpayOrder,
    //   });
    // }

    await checkout.save();
    res.status(201).json({ message: "Checkout successful", checkout });
  } catch (error) {
    console.log("Error processing checkout:", error);
    res.status(500).json({ error: "Server error duringfljdfj checkout process" });
  }
};

// exports.verifyPayment = async (req, res) => {
//   const {
//     razorpay_payment_id,
//     razorpay_order_id,
//     razorpay_signature,
//     order_id,
//   } = req.body;
//   console.log(req.body);
//   const checkout = await Checkout.findById(order_id);
//   console.log(checkout);
//   if (!checkout) {
//     return res.status(400).json({ error: "Order not found" });
//   }
//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", razorpayInstance.key_secret)
//     .update(body.toString())
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     checkout.paymentStatus = "Successfull";
//     checkout.paymentInfo.paymentId = razorpay_payment_id;
//     checkout.paymentInfo.razorpaySignature = razorpay_signature;
//     await checkout.save();

//     return res
//       .status(200)
//       .json({ message: "Payment verified successfully", checkout });
//   } else {
//     return res.status(400).json({ error: "Payment verification failed" });
//   }
// };

exports.getData = async (req, res) => {
  try {
    const data = await Checkout.find();
    if (!data && data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: data.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDataSingle = async (req, res) => {
  try {
    const data = await Checkout.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const existingOrder = await Checkout.findById(req.params.id);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    // Prepare the update object
    const updatedData = {};
    if (orderStatus) updatedData.orderStatus = orderStatus;
    if (paymentStatus) updatedData.paymentStatus = paymentStatus;

    // Update the order
    const updatedOrder = await Checkout.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the order",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const data = await Checkout.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    await data.deleteOne();
    res.status(200).json({
      success: true,
      message: "Order Delete Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getorderByUserID = async (req, res) => {
  try {
    const data = await Checkout.find({ userId: req.params.id });
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order Found Successfully",
      data: data.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};
