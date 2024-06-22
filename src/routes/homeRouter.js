const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeController");


router.get("/", controller.getHome);
router.put("/", controller.addProject);
router.delete("/", controller.deleteProject);

module.exports = router;