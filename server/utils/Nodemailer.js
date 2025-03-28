const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  process.env.USER, // Replace with your email
        pass:    process.env.PASS,    // Replace with App Password
    }, // Output detailed logs
});

module.exports = { transporter };
