const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { create } = require('express-handlebars');
const { query } = require('express');

const status_id = {
    1: 'New',
    2: 'Blocked',
    3: 'Pass',
    4: 'Fail',
}

controller.getTestRun = async (req, res) => {
    const relesae = req.query.release || null;
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        let testRunQuery = 
        'SELECT tr.* ' +
        'FROM test_runs AS tr ' +
        'WHERE tr.project_id = ? ';

        let countQuery =
        'SELECT COUNT(*) ' +
        'FROM test_runs AS tr ' +
        'WHERE tr.project_id = ? ';
        
        if (relesae) {
            testRunQuery += 'AND tr.release = ? ';
            countQuery += 'AND tr.release = ? ';
        }

        testRunQuery += 'LIMIT ? OFFSET ?';

        const projectId = req.params.id;
        let promises = [];
        promises.push(
            db.sequelize.query(
                testRunQuery, {
                replacements: relesae ? [projectId, relesae, limit, offset] : [projectId, limit, offset],
                type: db.sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(
                countQuery, {
                replacements: relesae ? [projectId, relesae] : [projectId],
                type: db.sequelize.QueryTypes.SELECT
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
        console.log(userMap);
        console.log(testruns);
        testruns.forEach(testrun => {
            testrun.created_by_name = testrun.created_by == null ? 'Unnamed' : userMap[testrun.created_by];
            testrun.assigned_to_name = testrun.assigned_to == null ? 'Unnamed' : userMap[testrun.assigned_to];
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
                totalRows: count[0].count,
                queryParams: relesae ? { release: relesae } : {}
            },
            permissions: res.locals.permissions,
            projectName: res.locals.projectName,
            part: 'Test Run & Result'
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
        const { test_run_name, release, assigned_to, description, testcases, user_id } = req.body;

        const testRun = await db.test_runs.create({
            project_id: projectId,
            testrun_title: test_run_name,
            release: release,
            assigned_to: assigned_to,
            description: description,
            testcase_quantity: testcases.length,
            created_by: user_id,
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
    const limit = isNaN(req.query.limit) ? 10 : Math.max(10, parseInt(req.query.limit));
    const order = req.query.order || 'ASC';
    const by = req.query.by || 'tc.testcase_id';
    const search = req.query.search;
    const offset = limit * ((isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))) - 1);

    let queryParams = {};
    let promises = [];

    let testCaseQuery = 
    'SELECT tc.name , tct.* ' +
    'FROM test_cases AS tc, testcase_testrun AS tct ' +
    'WHERE tc.testcase_id = tct.testcase_id AND tct.testrun_id = ? ';

    let countQuery =
    'SELECT COUNT(*) ' +
    'FROM test_cases AS tc, testcase_testrun AS tct ' +
    'WHERE tc.testcase_id = tct.testcase_id AND tct.testrun_id = ? ';

    if (search) {
        testCaseQuery += 'AND tc.name LIKE ? ';
        queryParams.search = search;
        countQuery += 'AND tc.name LIKE ? ';
    }

    console.log(by, order);
    console.log(limit, offset);

    testCaseQuery += `ORDER BY ${by} ${order} `;

    queryParams.order = order;
    queryParams.by = by;
    queryParams.limit = limit;

    testCaseQuery += 'LIMIT ' + limit;
    testCaseQuery += ' OFFSET ' + offset;

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
        db.sequelize.query(
            testCaseQuery, {
            replacements: [testRunId, search ? `%${search}%` : null],
            type: db.sequelize.QueryTypes.SELECT
        }),
        db.sequelize.query(
            countQuery, {
            replacements: [testRunId, search ? `%${search}%` : null],
            type: db.sequelize.QueryTypes.SELECT
        }),
        db.modules.findAll({
            where: {
                project_id: req.params.id
            },
        }),
        db.issue_type.findAll({}),
        db.sequelize.query(
            'SELECT u.* ' +
            'FROM users AS u, user_in_project AS up ' +
            'WHERE u.user_id = up.user_id AND up.project_id = ?', {
            replacements: [req.params.id],
            type: db.sequelize.QueryTypes.SELECT
        })
    );

    let [testRun, allTestcase ,testcases, count, module, issue_type, users] = await Promise.all(promises);

    const allProjectTestcase = await db.test_cases.findAll({
        where: {
            project_id: req.params.id
        },
        raw: true
    });

    const unAddedTestcase = allProjectTestcase.filter(testcase => {
        return !allTestcase.find(t => t.testcase_id == testcase.testcase_id);
    });

    console.log(unAddedTestcase);

    const newTestCase = allTestcase.filter(testcase => testcase.status_id == 1);
    const Blocked = allTestcase.filter(testcase => testcase.status_id == 2);
    const Pass = allTestcase.filter(testcase => testcase.status_id == 3);
    const Fail = allTestcase.filter(testcase => testcase.status_id == 4);

    testcases.forEach(testcase => {
        testcase.status = status_id[testcase.status_id];
    });

    const testRunStatus = Math.round((1 - newTestCase.length / allTestcase.length) * 100);
    const issues = Math.round((Blocked.length +  Fail.length) / allTestcase.length * 100);

    res.render('detail-test-run-view', {
        title: 'Test Run Detail',
        cssFile: 'test-run-detail-view.css',
        testRun: testRun,
        testcases: testcases,
        issueTypes: issue_type,
        projectId: req.params.id,
        modules: module,
        testRunStatus: testRunStatus,
        issueStatus: issues,
        unAddedTestcases: unAddedTestcase,
        users: users,
        pagination: {
            page: isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page)),
            limit: limit,
            totalRows: count[0].count,
            queryParams: queryParams
        },
        projectName: res.locals.projectName,
        part: testRun.testrun_title
    });
};

controller.addIssue = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { issue_name, testcase_id, description, status, priority, issue_type, assigned_to } = req.body;
        const testRunId = req.params.testrunId;
        const projectId = req.params.id;

        let issue_id = await db.sequelize.query(
            'SELECT MAX(issue_id) as issue_id FROM issues',
            { type: db.sequelize.QueryTypes.SELECT }
        );
        let new_issue_id = issue_id[0].issue_id + 1;

        console.log(testRunId);

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
            assigned_to: assigned_to,
            created_at: new Date(),
            created_date: new Date()
        }, {
            transaction: t
        });

        await db.testcase_testrun.update({
            status_id: 4
        }, {
            where: {
                testrun_id: testRunId,
                testcase_id: testcase_id
            },
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

controller.addResult = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { testcase_id, status } = req.body;
        const testRunId = req.params.testrunId;

        console.log(testcase_id, status);

        await db.testcase_testrun.update({
            status_id: status
        }, {
            where: {
                testrun_id: testRunId,
                testcase_id: testcase_id
            },
            transaction: t
        });
        await t.commit();
        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error adding result:', error);
        res.status(500).send({ success: false, error });
    }
};

controller.addTestcaseToTestRun = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        console.log(req.body);
        const testcase_id  = req.body;
        const testRunId = req.params.testrunId;

        for (testcase of testcase_id) {
            await db.testcase_testrun.create({
                testrun_id: testRunId,
                testcase_id: testcase
            }, { transaction: t });
        }

        await t.commit();
        res.send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error adding testcase to test run:', error);
        res.status(500).send({ success: false, error });
    }
};

controller.deleteTestcaseFromTestRun = async (req, res) => {
    try {
        const testRunId = req.params.testrunId;
        const testcaseId = req.body.testcase_id;

        await db.testcase_testrun.destroy({
            where: {
                testrun_id: testRunId,
                testcase_id: testcaseId
            }
        });

        res.send({ success: true });
    } catch (error) {
        console.error('Error deleting testcase from test run:', error);
        res.status(500).send({ success: false, error });
    }
};

module.exports = controller;