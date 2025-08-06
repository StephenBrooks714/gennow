const express = require("express");
const router = express.Router();
const cache = require("./config/cache");

const mainController = require(".././controllers/pages/mainPageController");
router.get("/", cache(2), mainController.homePage);
router.get("/aboutUs", cache(2), mainController.aboutUsPage);
router.get("/ourImpact", cache(2), mainController.ourImpactPage);
router.get("/ourBoard", cache(2), mainController.ourBoardPage);
router.get("/ourTeam", cache(2), mainController.ourTeamPage);
router.get("/gallery", cache(2), mainController.galleryPage);

module.exports = router;