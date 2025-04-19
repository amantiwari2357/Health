const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts } = require("../Controller/ProductController")
const upload = require("../Middlewares/Multer")

const ProductRouter = require("express").Router()

ProductRouter.post("/add-product",   upload.fields([
    { name: "productImage", maxCount: 5 },
    { name: "productPdf", maxCount: 1 },
  ]), createProduct)
ProductRouter.get("/get-product", getAllProducts)
ProductRouter.get("/single-product/:id", getProductById)
ProductRouter.put("/update-product/:id",  upload.fields([
    { name: "productImage", maxCount: 5 },
    { name: "productPdf", maxCount: 1 },
  ]), updateProduct)
ProductRouter.delete("/delete-product/:id", deleteProduct)

ProductRouter.get("/search", searchProducts);


module.exports = ProductRouter