const express = require("express");
const router = express.Router();

const checkAuth = require("../shared/auth");
const fileUpload = require("../shared/fileUpload");
const customerController = require("../controller/customerController");

router.post(
  "/new-customer",
  checkAuth,
  fileUpload.single("nationalCard"),
  customerController.add
);
// router.post("/new-customer-mobile/:capchaToken", customerController.insertMobile);
router.post("/new-customer-mobile", customerController.insertMobile);
router.post("/logIn", customerController.logIn);

module.exports = router;
