const express = require("express");
const router = express.Router();

const checkAuth = require("../shared/auth");
const timeSlotController = require("../controller/timeSlotController");

router.post("/reserve/:id", checkAuth, timeSlotController.reserve);
router.post("/customerId/:id", checkAuth, timeSlotController.getAllTurnsForCustomer);

router.get("/:date", timeSlotController.getAll);

module.exports = router;
