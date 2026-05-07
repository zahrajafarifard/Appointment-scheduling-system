const express = require("express");
const router = express.Router();

const checkAuth = require("../shared/authAdmin");
const requestController = require("../controller/requestController");

// router.get("/", checkAuth, requestController.get);
router.get("/", requestController.get);


module.exports = router;
