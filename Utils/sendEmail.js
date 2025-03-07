const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Service for sending email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Define email options
  const mailOptions = {
    from: `<${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
