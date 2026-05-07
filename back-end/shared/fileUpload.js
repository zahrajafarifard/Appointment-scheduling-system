const multer = require("multer");
const uuid = require("uuid");

const fileUpload = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + uuid.v4() + "." + file.mimetype.split("/")[1]
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = fileUpload;
