const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeController");
const authController = require("../controllers/authController");
const jwt = require('jsonwebtoken');
const db = require("../models");
const { QueryTypes } = require('sequelize');

// Authentification middlewares
const { 
    verifyTokenAndManager,
    verifyTokenAndDeveloper,
    verifyTokenAndTester
 } = require("../controllers/verifyToken");

// MIDDLWARES
const checkAuthentication = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect("/login");
    }
    next();
};

const checkPermissions = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send('Forbidden');
    }

    try {
        const accessToken = token.split(" ")[1];
        const user = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        res.locals.user_id = user.user_id;
        // console.log("user_id", user.user_id);
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(403).send('Forbidden');
    }
};


router.get("/", authController.refreshingTokens, checkAuthentication, checkPermissions, controller.getHome);
router.put("/", authController.refreshingTokens, checkAuthentication, checkPermissions, controller.addProject);
router.delete("/", authController.refreshingTokens, checkAuthentication, checkPermissions, controller.deleteProject);
router.post("/", authController.refreshingTokens, checkAuthentication, checkPermissions, controller.addUser);

module.exports = router;