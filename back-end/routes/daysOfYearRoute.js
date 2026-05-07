const express = require("express");
const router = express.Router();

const daysOfYearController = require("../controller/daysOfYearController");

router.get("/", daysOfYearController.getAll);

module.exports = router;
