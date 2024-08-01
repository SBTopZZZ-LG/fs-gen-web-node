const express = require("express");
const PrivacyControllers = require("../controllers/privacy");

const router = express.Router();

router.get("/", PrivacyControllers.privacyGet);

module.exports = router;
