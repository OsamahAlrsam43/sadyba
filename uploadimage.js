const Multer = require("multer");

//name of the input type (avatar in our case).
const FILENAMELOGO = "logo";
const FILENAMEHEADER = "hreport";

let photoStorage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 *	Function to set storage for single upload, named as FILENAME
 */

const filterimg = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

let uploadlogocompany = () => {
  return Multer({
    storage: photoStorage,
    fileFilter: filterimg,
  }).single(FILENAMELOGO);
};

let uploadheadercompany = () => {
  return Multer({
    storage: photoStorage,
    fileFilter: filterimg,
  }).single(FILENAMEHEADER);
};

module.exports = { uploadlogocompany, uploadheadercompany };
