const fs = require("fs");
const path = require("path");

const deleteLocalFile = (filePath) => {
    try {
        const fileToDelete = path.join(__dirname, "..", filePath);

        fs.unlink(fileToDelete, (err) => {
            if (err) {
                console.error("Failed to delete local file:", err.message);
            }
        })
    } catch (error) {
        console.error("Failed to delete local file:", error.message);
    }
};

module.exports = { deleteLocalFile }