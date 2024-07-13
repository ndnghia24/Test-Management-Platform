const db = require('../models/index');

controller = {}


controller.test_planController = require('../controllers/project/testplanController');
controller.test_caseController = require('../controllers/project/testcaseController');
controller.requirementController = require('../controllers/project/requirementController');
controller.overviewController = require('../controllers/project/overviewController');
controller.releaseController = require('../controllers/project/releaseController');
controller.moduleController = require('../controllers/project/moduleController');
controller.reportController = require('../controllers/project/reportController');
controller.testrunController = require('../controllers/project/testrunController');

//issue
controller.issuesController = require('../controllers/project/issuesController');

//home
controller.homeController = require('../controllers/project/homeController');

controller.getModule = async (req, res) => {
    try {
        const projectId = req.params.id;
        const modules = await db.modules.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        },);
        res.status(200).send({ modules });
    } catch (error) {
        console.error('Error getting modules:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.getRequirement = async (req, res) => {
    try {
        const projectId = req.params.id;
        const requirements = await db.requirements.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        });
        res.status(200).send({ requirements });
    } catch (error) {
        console.error('Error getting requirements:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.getAllTestCase = async (req, res) => {
    try {
        const projectId = req.params.id;
        const testcases = await db.test_cases.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        });

        for (testcase of testcases) {
            const step = await db.test_case_step.findAll({
                where: {
                    testcase_id: testcase.testcase_id
                },
                raw: true
            });
            testcase.steps = step;
        }

        res.status(200).send({ testcases });
    } catch (error) {
        console.error('Error getting test cases:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;