const multer = require('multer')
const fs = require("fs")

const dir = './Public'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") || 
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDFs are allowed!"), false);
    }
  };

const upload = multer({ storage: storage , fileFilter: fileFilter });


module.exports = upload;