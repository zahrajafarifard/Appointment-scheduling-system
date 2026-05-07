const express = require("express");
const router = express.Router();

const checkAuth = require("../shared/auth");
const queueController = require("../controller/queueController");

router.get("/timeSlotId/:customerId/:dateField", checkAuth, queueController.getTimeSlot);
router.post("/customerId/:id", checkAuth, queueController.getCustomer);
router.delete("/:customerId/:reservedId", checkAuth, queueController.deleteQueue);
router.get("/:queueId/:timeSlotId", checkAuth, queueController.getQueue);


module.exports = router;
