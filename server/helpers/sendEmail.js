const nodemailer = require("nodemailer");
const sendEmail = async (obj) => {
  // let { title, link } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: "aryawdy16@gmail.com",
    subject: "Asking for approvement",
    text: `user with ${obj.email} asking for approval`,
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEmail;
