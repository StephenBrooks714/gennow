const express = require("express");
const router = express.Router();
const cache = require("./config/cache");
const auth = require("./middleware/ifAuthorizedUser");

const mainController = require(".././controllers/pages/mainPageController");
router.get("/", cache(2), mainController.homePage);
router.get("/aboutUs", cache(2), mainController.aboutUsPage);
router.get("/ourImpact", cache(2), mainController.ourImpactPage);
router.get("/ourBoard", cache(2), mainController.ourBoardPage);
router.get("/ourTeam", cache(2), mainController.ourTeamPage);

const userActionController = require(".././controllers/users/index");
router.get("/register", cache(2), userActionController.registerUser);
router.post("/store/user", cache(2), userActionController.storeUser);
router.get("/login", cache(2), userActionController.loginPage);
router.post("/login/user", cache(2), userActionController.loginUserAction);
router.get("/logout", cache(2), userActionController.logoutUser);
router.get("/updateUser/:id", cache(2), auth, userActionController.updateUser);
router.post("/updateUser/:id", cache(2), userActionController.postUpdatedUser);
router.get("/deleteUser/:id", cache(2), auth, userActionController.deleteUser);
router.get("/dashboard", cache(2), auth, userActionController.adminPage);

const galleryController = require(".././controllers/forms/mainFormSection");
router.get("/newProject", cache(2), auth, galleryController.newProjectPage);
router.post("/store/project", cache(2), galleryController.storeProject);
router.get("/deleteProject/:id", cache(2), auth, galleryController.deleteProjectInfo);
router.get("/gallery", cache(2), galleryController.galleryPage);

module.exports = router;