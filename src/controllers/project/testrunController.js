const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { create } = require('express-handlebars');

const status_id = {
    1: 'New',
    2: 'In Progress',
    3: 'Done'
}

controller.getTestRun = async (req, res) => {
    const relesae = req.query.release || null;
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        const projectId = req.params.id;
        let promises = [];
        promises.push(
            db.test_runs.findAll({
                where: {
                    project_id: projectId,
                },
                offset: offset,
                limit: limit,
                raw: true
            }),
            db.test_runs.count({
                where: {
                    project_id: projectId
                }
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

        let [testruns, count ,testcases, releases, modules, users] = await Promise.all(promises);


        const userMap = users.reduce((acc, user) => { acc[user.user_id] = user.name; return acc; }, {});
        testruns.forEach(testrun => {
            testrun.created_by_name = userMap[testrun.created_by];
            testrun.assigned_to_name = userMap[testrun.assigned_to];
        });
        console.log(count);
        res.render('test-run-view', {
            title: 'Test Runs',
            cssFile: 'test-run-view.css',
            projectId: projectId,
            testRuns: testruns.filter(testrun => {
                if (relesae) {
                    console.log(testrun.release, relesae);
                    return testrun.release == relesae;
                }
                return true;
            }),
            modules: modules,
            releases: releases,
            testcases: testcases,
            users: users,
            pagination: {
                page: page,
                limit: limit,
                totalRows: count
            }
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
        db.sequelize.query(
            'SELECT tc.name , tct.*' +
            'FROM test_cases AS tc, testcase_testrun AS tct ' +
            'WHERE tc.testcase_id = tct.testcase_id AND tct.testrun_id = ?', {
            replacements: [testRunId],
            type: db.sequelize.QueryTypes.SELECT
        }
        ),
        db.modules.findAll({
            where: {
                project_id: req.params.id
            },
        }),
        db.issue_type.findAll({}),
    );

    let [testRun, testcases, module, issue_type] = await Promise.all(promises);

    res.render('detail-test-run-view', {
        title: 'Test Run Detail',
        cssFile: 'test-run-detail-view.css',
        testRun: testRun,
        testcases: testcases,
        issueTypes: issue_type,
    });
};

controller.addIssue = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { issue_name, testcase_id, description, status, priority, issue_type } = req.body;
        const testRunId = req.params.testrunId;
        const projectId = req.params.id;

        let issue_id = await db.sequelize.query(
            'SELECT MAX(issue_id) as issue_id FROM issues',
            { type: db.sequelize.QueryTypes.SELECT }
        );
        let new_issue_id = issue_id[0].issue_id + 1;

        await db.issues.create({
            issue_id: new_issue_id,
            title: issue_name,
            test_case_id: testcase_id,
            description: description,
            status_id: status,
            priority_id: priority,
            issue_type_id: issue_type,
            test_run_id: testRunId,
            project_id: projectId,
            created_by: 1,
            created_at: new Date()
        }, {
            transaction: t
        });
        await t.commit();
        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error adding issue:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;