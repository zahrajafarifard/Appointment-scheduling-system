const express = require("express");
const router = express.Router();

const checkAuth = require("../shared/authAdmin"); ///////////////////////
// const check = require("../shared/auth");
const requestTypeController = require("../controller/requestTypeController");

router.get("/", requestTypeController.get); ///check for exist??

router.post("/insert", checkAuth, requestTypeController.insert);
router.post("/", requestTypeController.fetchedRequest);

router.get("/:id", checkAuth, requestTypeController.getForUpdate);
router.patch("/:id", checkAuth, requestTypeController.update);
router.delete("/:id", checkAuth, requestTypeController.delete);

module.exports = router;
