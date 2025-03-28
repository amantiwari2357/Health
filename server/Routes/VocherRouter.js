const { createCouponCode, getSingleVouchers, getVouchers, updateVouchers, deleteVouchers, validateVouchers } = require("../Controller/VoucherController.js")

const VouchersRouter = require("express").Router()


VouchersRouter.post("/create-vouchers", createCouponCode)
VouchersRouter.get("/all-vouchers", getVouchers)
VouchersRouter.get("/single-vouchers/:id", getSingleVouchers)
VouchersRouter.put("/update-vouchers/:id", updateVouchers)
VouchersRouter.delete("/delete-vouchers/:id", deleteVouchers)
VouchersRouter.post("/validate-voucher",validateVouchers)

module.exports = VouchersRouter
