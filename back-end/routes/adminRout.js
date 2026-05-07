const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../shared/authAdmin");
const adminController = require("../controller/adminController");

router.post("/signUp", adminController.signUp);
router.post("/signIn", adminController.signIn);
router.post(
  "/advanced-config-days-Of-year",
  checkAuthAdmin,
  adminController.advancedConfigDaysOfYear
);
router.post(
  "/config-days-Of-year",
  checkAuthAdmin,
  adminController.configDaysOfYear
);
router.get("/getAllQueus", checkAuthAdmin, adminController.getAllQueus);
router.post("/archiveQueue", checkAuthAdmin, adminController.archiveQueue);
router.post("/unarchiveQueue", checkAuthAdmin, adminController.unarchiveQueue);
router.get("/getArchiveQueue", checkAuthAdmin, adminController.getArchiveQueue);
router.post("/getNationalCard", checkAuthAdmin, adminController.getNationalCard);
router.get("/getDaysOfyear", checkAuthAdmin, adminController.getDaysOfyear);

module.exports = router;
