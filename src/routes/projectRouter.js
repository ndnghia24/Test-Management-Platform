const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");

router.get("/:id/testplan", controller.test_planController.getTestPlan);
router.post("/:id/testplan/addTestPlan", controller.test_planController.addTestPlan);
router.put("/:id/testplan/editTestPlan", controller.test_planController.editTestPlan);
router.delete("/:id/testplan/deleteTestPlan", controller.test_planController.deleteTestPlan);

router.get("/:id/testcase", controller.test_caseController.getTestCase);
router.get("/:id/testcase/getTestCase", controller.test_caseController.getSpecifyTestCase);
router.post("/:id/testcase/addTestCase", controller.test_caseController.addTestCase);
router.delete("/:id/testcase/deleteTestCase", controller.test_caseController.deleteTestCase);

router.get("/:id/getAllModule", controller.getModule);
router.get("/:id/getAllRequirement", controller.getRequirement);

// router.put("/:id/testcase/editTestCaseLinking", controller.test_caseController.editTestCase);
// router.put("/:id/testcase/editTestCaseRequirement", controller.test_caseController.editTestCase);
// router.put("/:id/testcase/editTestCaseStep", controller.test_caseController.editTestCase);
// router.put("/:id/testcase/editTestCaseOverview", controller.test_caseController.editTestCase);

router.get("/:id/testrun", (req,res) => {
    res.render('test-run-view', {
        title: 'Tetto',
        cssFile: 'test-run-view.css',
        projectId: req.params.id,
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

router.get("/:id/issues", controller.issuesController.getIssues);
router.get("/:id/issues/getIssue", controller.issuesController.getSpecifyIssue);
router.get("/:id/issues/editIssue", controller.issuesController.getEditIssue);
router.put("/:id/issues/editIssue", controller.issuesController.editIssue);
// router.post("/:id/issues/addTestCase", controller.issuesController.addTestCase);
// router.delete("/:id/issues/deleteTestCase", controller.issuesController.deleteTestCase);


// router.get("/",(req,res) => {
//     res.redirect("/home");
// });

router.get("/:id", (req,res) => {
    res.redirect("/project/" + req.params.id + "/overview");
});

module.exports = router;

