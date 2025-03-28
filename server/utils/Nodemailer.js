const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'swhealthcare17@gmail.com', // Replace with your email
        pass: 'nkho mnqg iaur hjaf',    // Replace with App Password
    }, // Output detailed logs
});

module.exports = { transporter };
