const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');

controller.getTestRun = async (req, res) => {
    try {
        const projectId = req.params.id;
        let promises = [];
        promises.push(
            db.test_runs.findAll({
                where: {
                    project_id: projectId
                },
                raw: true
            }),
            db.test_cases.findAll({
                where: {
                    project_id: projectId
                },
                raw: true
            }),
            db.releases.findAll({
                where: {
                    project_id: projectId
                },
                raw: true
            }),
            db.modules.findAll({
                where: {
                    project_id: projectId
                },
                raw: true
            }),
            db.sequelize.query(
                'SELECT u.* ' +
                'FROM users AS u, user_in_project AS up ' +
                'WHERE u.user_id = up.user_id AND up.project_id = ?', {
                    replacements: [projectId],
                    type: db.sequelize.QueryTypes.SELECT
                }
            ) 
        );

        let [testruns, testcases, releases, modules, users] = await Promise.all(promises);

        console.log(users);

        const userMap = users.reduce((acc, user) => { acc[user.user_id] = user.name; return acc; }, {});
        testruns.forEach(testrun => {
            testrun.created_by_name = userMap[testrun.created_by];
            testrun.assigned_to_name = userMap[testrun.assigned_to];
        });

        console.log(testruns);
        res.render('test-run-view', {
            title: 'Test Runs',
            cssFile: 'test-run-view.css',
            projectId: projectId,
            testRuns: testruns,
            modules: modules,
            releases: releases,
            testcases: testcases,
            users: users
        });
    } catch (error) {
        console.error('Error getting test runs:', error);
        res.status(500).send({ success: false, error });
    }
};

controller.addTestRun = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const { test_run_name, release, assigned_to, description, testcases } = req.body;

        const testRun = await db.test_runs.create({
            project_id: projectId,
            testrun_title: test_run_name,
            release: release,
            assigned_to: assigned_to,
            description: description,
            testcase_quantity: testcases.length,
            created_by: 3
        }, { transaction: t });

        const testRunId = testRun.testrun_id;
        const promises = testcases.map(testcase => {
            return db.testcase_testrun.create({
                testrun_id: testRunId,
                testcase_id: testcase.testcase_id
            }, { transaction: t });
        });

        await Promise.all(promises);
        await t.commit();

        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error adding test run:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.editTestRun = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        // const projectId = req.params.id;
        const testRunId = req.params.testrunId;
        const { testrun_title, release, description } = req.body;

        await db.test_runs.update({
            testrun_title: testrun_title,
            release: release,
            description: description
        }, {
            where: {
                testrun_id: testRunId
            },
            transaction: t
        });
        await t.commit();
        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test run:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.deleteTestRun = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const testRunId = req.params.testrunId;
        await db.test_runs.destroy({
            where: {
                testrun_id: testRunId
            },
            transaction: t
        });
        await t.commit();
        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error deleting test run:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.getDetailTestRun = async (req, res) => {
    const testRunId = req.params.testrunId;

    let promises = [];

    promises.push(
        db.test_runs.findOne({
            where: {
                testrun_id: testRunId
            },
            raw: true
        }),
        db.testcase_testrun.findAll({
            where: {
                testrun_id: testRunId
            },
            raw: true
        }),
    );

    res.render('detail-test-run-view', {
        title: 'Test Run Detail',
        cssFile: 'test-run-view.css',
        testRunId: testRunId
    });
};
module.exports = controller;