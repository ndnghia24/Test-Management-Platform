const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => {
    res.render("login", { layout: false });
});

router.get("/register", (req, res) => {
    //res.render("register");
    res.send("Hello World");
});

module.exports = router;