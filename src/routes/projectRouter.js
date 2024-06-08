const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");

//PROJECT SUPPORT ROUTES
router.get("/:id/getAllModule", controller.getModule);
router.get("/:id/getAllRequirement", controller.getRequirement);



//TESTPLAN
router.get("/:id/testplan", controller.test_planController.getTestPlan);
router.post("/:id/testplan/addTestPlan", controller.test_planController.addTestPlan);
router.put("/:id/testplan/editTestPlan", controller.test_planController.editTestPlan);
router.delete("/:id/testplan/deleteTestPlan", controller.test_planController.deleteTestPlan);

//TESTCASE
router.get("/:id/testcase", controller.test_caseController.getTestCase);
router.get("/:id/testcase/getTestCase", controller.test_caseController.getSpecifyTestCase);
router.post("/:id/testcase/addTestCase", controller.test_caseController.addTestCase);
router.delete("/:id/testcase/deleteTestCase", controller.test_caseController.deleteTestCase);

//MODULE
router.get("/:id/module", controller.moduleController.getModule);

//REQUIREMENT
router.get("/:id/requirement", controller.requirementController.getRequirement);

//RELEASE
router.get("/:id/release", controller.releaseController.getRelease);

//OVERVIEW
router.get("/:id/overview", controller.overviewController.getOverview);

//REPORT
router.get("/:id/report", controller.reportController.getReport);


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

router.get("/:id/issue", (req,res) => {
    res.render('issue-view', {
        title: 'Tetto',
        projectId: req.params.id,
    });
});

// router.get("/",(req,res) => {
//     res.redirect("/home");
// });

router.get("/:id", (req,res) => {
    res.redirect("/project/" + req.params.id + "/overview");
});

module.exports = router;

