const express = require("express");
const router = express.Router();
const cache = require("./config/cache");

const mainController = require(".././controllers/pages/mainPageController");
router.get("/", cache(2), mainController.homePage);
router.get("/aboutUs", cache(2), mainController.aboutUsPage);

module.exports = router;