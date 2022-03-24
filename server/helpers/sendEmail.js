const nodemailer = require("nodemailer");
const sendEmail = async (obj) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "barter.in.hacktiv@gmail.com", // generated ethereal user
      pass: "123abc987", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: obj.email,
    to: "barter.in.hacktiv@gmail.com",
    subject: "Asking for approvement",
    text: `user with ${obj.email} asking for approval`,
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEmail;
