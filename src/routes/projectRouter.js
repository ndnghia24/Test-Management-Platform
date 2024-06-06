const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");

router.get("/:id/testplan", controller.test_planController.getTestPlan);
router.post("/:id/testplan/addTestPlan", controller.test_planController.addTestPlan);

router.get("/:id/testcase", controller.test_caseController.getTestCase);

router.get("/:id/testrun", (req,res) => {
    res.render('test-run-view', {
        title: 'Tetto',
        cssFile: 'test-run-view.css',
    });
})

router.get("/:id/module", (req,res) => {
    res.render('module-view', {
        title: 'Tetto',
        cssFile: 'module-view.css',
        projectId: req.params.id,
    });
})

router.get("/:id/release", (req,res) => {
    res.render('release-view', {
        title: 'Tetto',
        cssFile: 'release-view.css',
        projectId: req.params.id,
    });
})

router.get("/:id/requirement", controller.requirementController.getRequirement);

router.get("/:id/overview", (req,res) => {
    res.render('overview-view', {
        title: 'Tetto',
        cssFile: 'overview-view.css',
        projectId: req.params.id,
    });
});

router.get("/:id/issue", (req,res) => {
    res.render('issue-view', {
        title: 'Tetto',
        projectId: req.params.id,
    });
});

router.get("/",(req,res) => {
    res.redirect("/home");
});

router.get("/:id", (req,res) => {
    res.redirect("/project/" + req.params.id + "/overview");
});

module.exports = router;

