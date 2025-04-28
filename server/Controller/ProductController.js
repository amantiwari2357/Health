const Product = require("../Models/ProductModel");
const { uploadImage, deleteImage, uploadPdfToCloudinary } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { categoryName, productName, productDetails, productDescription, productPrice, productDiscountPercentage, productFinalPrice, stock, tax, productStatus, bestseller } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one product image is required" });
        }
        console.log("req.body",req.body);
        
        const pdfFile = req.files["productPdf"]?.[0];
        // Upload images and get the URLs
        const imageUrls = [];
        for (let file of req.files["productImage"]) {
            const imageUrl = await uploadImage(file.path);
            imageUrls.push(imageUrl);
            deleteLocalFile(file.path); // Clean up local file
        }

        let pdfUrl;
        if (pdfFile) {
          pdfUrl = await uploadPdfToCloudinary(pdfFile?.path);
        }
        const newProduct = new Product({
            categoryName,
            productName,
            productDetails,
            productDescription,
            productPrice:Number(productPrice), productDiscountPercentage:Number(productDiscountPercentage), productFinalPrice:Number(productFinalPrice), stock, tax:Number(tax),
            productImage: imageUrls,// Store all image URLs in an array
            productStatus: productStatus || false,
            bestseller: bestseller || false,
            productPdf: pdfUrl || "",
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        console.log(error)
        if (req.files) {

            req.files?.forEach(file => deleteImage(file.path));
        }
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // default to page 1
      const limit = parseInt(req.query.limit) 
      const skip = (page - 1) * limit;
  
      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .populate("categoryName", "categoryName categoryStatus");
  
      const totalCount = await Product.countDocuments();
  
      res.status(200).json({
        products,
        total: totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  };
  

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
 
        const product = await Product.findById(id).populate("categoryName", "categoryName categoryStatus");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, productName, productDetails, productDescription, productPrice, productDiscountPercentage, productFinalPrice, stock, tax, productStatus, bestseller } = req.body;
        const pdfFile = req.files["productPdf"]?.[0];

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (categoryName) product.categoryName = categoryName;
        if (productName) product.productName = productName;
        if (productDetails) product.productDetails = productDetails;
        if (productDescription) product.productDescription = productDescription;
        if (productPrice) product.productPrice = productPrice;
        if (productDiscountPercentage) product.productDiscountPercentage = productDiscountPercentage;
        if (productFinalPrice) product.productFinalPrice = productFinalPrice;
        if (stock) product.stock = stock;
        if (tax) product.tax = tax;
        if (productStatus !== undefined) product.productStatus = productStatus;
        if (bestseller !== undefined) product.bestseller = bestseller;

        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary before updating
            for (let oldImage of product.productImage) {
                await deleteImage(oldImage);
            }

            const imageUrls = [];
            for (let file of req.files["productImage"]) {
                const imageUrl = await uploadImage(file.path);
                imageUrls.push(imageUrl);
                deleteLocalFile(file.path); // Clean up local file
            }

            product.productImage = imageUrls; // Update product images
        }

        if(pdfFile) {
            const pdfUrl = await uploadPdfToCloudinary(pdfFile?.path);
            product.productPdf = pdfUrl
        }else {
            product.productPdf = product.productPdf
        }
        const updatedProduct = await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.log(error)
        if (req.files) {
            // Ensure image deletion on failure for all uploaded images
            req.files.forEach(file => deleteImage(file.path));
        }
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete images from Cloudinary before deleting the product
        for (let oldImage of product.productImage) {
            await deleteImage(oldImage);
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};

// Search products by categoryName and productName
const searchProducts = async (req, res) => {
    try {
        const { categoryName, productName } = req.query;
     
        const query = {};
        if (categoryName) {
            query.categoryName = { $regex: new RegExp(categoryName, "i") }; // Case-insensitive search
        }

        if (productName) {
            query.productName = { $regex: new RegExp(productName, "i") }; // Case-insensitive search
        }
        const products = await Product.find(query).populate("categoryName", "categoryName categoryStatus");
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to search products", error: error.message });
    }
};

const categoryProduct= async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        const products = await Product.find({ categoryName:id }).populate("categoryName", "categoryName categoryStatus");
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    categoryProduct
    // Export the new search controller
};
