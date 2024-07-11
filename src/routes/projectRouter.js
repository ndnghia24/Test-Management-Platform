const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");
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
        const projectId = req.params.id;

        // Tìm dự án của người dùng dựa trên projectId
        const project = await db.sequelize.query(
            'SELECT * FROM user_in_project WHERE project_id = :projectId AND user_id = :userId',
            {
                replacements: { projectId: projectId, userId: user.user_id },
                type: QueryTypes.SELECT
            }
        );

        // Kiểm tra xem dự án có tồn tại không
        if (project.length === 0) {
            return res.status(403).send('Forbidden');
        }

        // Lấy role của người dùng trong dự án
        const role = project[0].role_id;
        // Lấy đường dẫn hiện tại
        const currentPage = "/" + req.path.split("/").pop();

        // Thiết lập permissions dựa trên đường dẫn hiện tại
        switch (currentPage) {
            case `/requirement`:
                res.locals.permissions = {
                    canView: true,
                    canAdd: role === 1,
                    canEdit: role === 1,
                    canDelete: role === 1,
                    canImport: role === 1,
                    canExport: role === 1 || role === 2 || role === 3
                };
                break;
            case `/module`:
                res.locals.permissions = {
                    canView: true,
                    canAdd: role === 1,
                    canEdit: role === 1,
                    canDelete: role === 1,
                    canImport: role === 1,
                    canExport: role === 1,
                };
                break;
            // Các trường hợp khác có thể được thêm vào cho các đường dẫn khác
            default:
                res.locals.permissions = {
                    canView: true,
                    canAdd: false,
                    canEdit: false,
                    canDelete: false,
                    canImport: false,
                    canExport: false
                };
                break;
        }
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(403).send('Forbidden');
    }
};



//PROJECT SUPPORT ROUTES
router.get("/:id/getAllRequirement", controller.getRequirement);
router.get("/:id/getAllTestCase", controller.getAllTestCase);

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
router.put("/:id/testcase/editTestCaseStep", controller.test_caseController.editTestCaseStep);
router.put("/:id/testcase/editTestCaseOverview", controller.test_caseController.editTestCaseOverview);
router.put("/:id/testcase/editTestCaseLinking", controller.test_caseController.editTestCaseLinkingTestCase);
router.put("/:id/testcase/editTestCaseRequirementLinking", controller.test_caseController.editTestCaseLinkingRequirement);

//MODULE
router.get("/:id/module", controller.moduleController.getModule);
router.get("/:id/module/getModule", controller.moduleController.getAllModule);
router.post("/:id/module/addModule", controller.moduleController.addModule);

//REQUIREMENT & REQUIREMENT TYPE
router.get("/:id/requirement", authController.refreshingTokens, checkAuthentication, checkPermissions, controller.requirementController.getRequirement);
router.get("/:id/requirement/getRequirement", controller.requirementController.getSpecifyRequirement);
router.get("/:id/requirement/getRequirementByTypeFilter", controller.requirementController.getRequirementByTypeFilter);
router.post("/:id/requirement/addRequirement", controller.requirementController.addRequirement);
router.put("/:id/requirement/editRequirement", controller.requirementController.editRequirement);
router.delete("/:id/requirement/deleteRequirement", controller.requirementController.deleteRequirement);

router.get("/:id/requirement/getRequirementType", controller.requirementController.getRequirementType);
router.post("/:id/requirement/addRequirementType", controller.requirementController.addRequirementType);

//RELEASE
router.get("/:id/release", controller.releaseController.getRelease);
router.post("/:id/release/addRelease", controller.releaseController.addRelease);
router.put("/:id/release/editRelease", controller.releaseController.editRelease);
router.delete("/:id/release/deleteRelease", controller.releaseController.deleteRelease);

//OVERVIEW
router.get("/:id/overview", controller.overviewController.getOverview);

//REPORT (only for manager)
router.get("/:id/report", controller.reportController.getReport);

//TESTRUN
router.get("/:id/testrun", controller.testrunController.getTestRun);
router.post("/:id/testrun/addTestRun", controller.testrunController.addTestRun);
router.put("/:id/testrun/:testrunId/editTestRun", controller.testrunController.editTestRun);
router.delete("/:id/testrun/:testrunId/deleteTestRun", controller.testrunController.deleteTestRun);
router.get("/:id/testrun/:testrunId",controller.testrunController.getDetailTestRun); 
router.post("/:id/testrun/:testrunId/addIssue",controller.testrunController.addIssue);

//issue
router.get("/:id/issues", controller.issuesController.getIssues);
router.get("/:id/issues/getIssue", controller.issuesController.getSpecifyIssue);
router.get("/:id/issues/editIssue", controller.issuesController.getEditIssue);
router.put("/:id/issues/editIssue", controller.issuesController.editIssue);
router.put("/:id/issues/createIssue", controller.issuesController.addIssue);

// router.post("/:id/issues/addTestCase", controller.issuesController.addTestCase);
// router.delete("/:id/issues/deleteTestCase", controller.issuesController.deleteTestCase);


// router.get("/",(req,res) => {
//     res.redirect("/home");
// });

router.get("/:id", (req,res) => {
    res.redirect("/project/" + req.params.id + "/overview");
});

module.exports = router;