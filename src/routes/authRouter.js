const router = require("express").Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);
//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//GET INFO
router.get("/info", authController.getUserInfo);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;