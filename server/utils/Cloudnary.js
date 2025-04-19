const cloudnary = require("cloudinary").v2
const fs = require("fs");

cloudnary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECKRET
})


const uploadImage = async (file) => {
    try {
        const imageurl = await cloudnary.uploader.upload(file)
        console.log("asasasasas",imageurl);
        return imageurl.secure_url
    } catch (error) {
        console.log(error)
    }
}

const uploadPdfToCloudinary = async (filePath) => {
    return new Promise((resolve, reject) => {
      cloudnary.uploader.upload(
        filePath,
        { folder:"product_pdfs", resource_type: "raw",type: "upload" },
        (error, result) => {
          if (error) reject(error);
          else {
            fs.unlink(filePath, (err) => {
                if (err) {
                  console.error("Failed to delete local PDF:", err);
                } else {
                  console.log("Local PDF deleted:", filePath);
                }
              });
            resolve(result.secure_url);}
        }
      );
    });
  };


const deleteImage = async (imageUrl) => {
    try {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudnary.uploader.destroy(publicId);
        console.log(`Image deleted successfully: ${publicId}`);
    } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
    }
};


module.exports = {
    uploadImage, deleteImage, uploadPdfToCloudinary
}