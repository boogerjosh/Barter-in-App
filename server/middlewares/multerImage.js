const multer = require("multer");
const upload = multer();

function multerImage() {
  console.log(upload)
  return upload;
}

module.exports = multerImage;
