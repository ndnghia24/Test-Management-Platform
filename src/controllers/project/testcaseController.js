const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { raw, query } = require('express');

controller.getTestCase = async (req, res) => {
    // Set up pagination
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const limit = 12;
    const offset = (page - 1) * limit;

    // Get query parameters
    const showOption = isNaN(req.query.showOption) ? 1 : parseInt(req.query.showOption);
    const sortOption = isNaN(req.query.sortOption) ? 1 : parseInt(req.query.sortOption);
    const search = req.query.search;
    const moduleId = req.query.moduleId;
    queryParameters = {};

    try {
        const projectId = req.params.id;
        const promises = [];
        const replacements = [];
        let whereCondition = 'project_id = ?';

        replacements.push(projectId);

        console.log(search);
        console.log(moduleId);

        queryParameters.showOption = showOption;
        queryParameters.sortOption = sortOption;

        if (moduleId) {
            whereCondition += ' AND module_id = ?';
            replacements.push(moduleId);
            queryParameters.moduleId = moduleId;
        }

        if (search) {
            whereCondition += ' AND name LIKE ?';
            replacements.push('%' + search + '%');
            queryParameters.search = search;
        }

        let order_by = 'testcase_id';
        switch (showOption) {
            case 2:
                order_by = 'name';
                break;
            default:
        }

        let order = 'ASC';
        switch (sortOption) {
            case 2:
                order = 'DESC';
                break;
            default:
                order = 'ASC';
                break;
        }

        replacements.push(limit, offset);

        const testcaseQuery = 'SELECT testcase_id, name FROM test_cases WHERE ' + whereCondition + ' ORDER BY ' + order_by + ' ' + order + ' LIMIT ? OFFSET ?';
        const countTestcaseQuery = 'SELECT COUNT(*) AS count FROM test_cases WHERE ' + whereCondition;

        promises.push(
            db.sequelize.query(
                testcaseQuery,
                { replacements: replacements, type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                countTestcaseQuery,
                { replacements: replacements.slice(0, -2), type: db.sequelize.QueryTypes.SELECT }
            ),
        );

        promises.push(
            db.sequelize.query(
                'SELECT * FROM modules WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT requirement_id AS requirement_code, name AS requirement_name FROM requirements WHERE project_id = ? ORDER BY requirement_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT name FROM requirement_types WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT * FROM test_cases WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            )
        );

        const [testCases, testcaseNum, modules, requirements, requirementTypes, allTestCase] = await Promise.all(promises);

        console.log('testCases', testCases);

        res.locals.requirements_type = requirementTypes;
        res.locals.requirements = requirements;
        res.locals.testcases = testCases;
        res.locals.modules = modules;
        res.render('test-case-view', {
            title: 'Test Cases',
            cssFile: 'test-case-view.css',
            projectId: projectId,
            pagination: {
                page: page,
                limit: limit,
                totalRows: testcaseNum[0].count,
                queryParams: queryParameters,
            },
            allTestcases: allTestCase,
            permissions: res.locals.permissions,
            projectName: res.locals.projectName,
            part: 'Testcase'
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.addTestCase = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const { testcaseName, module_id, description, testcaseStep, linkingTestcase, linkingRequirement, user_id } = req.body;

        testcaseStep.reduceRight(function (acc, step, index, object) {
            if (step.description === '' && step.expectedResult === '') {
                object.splice(index, 1);
            }
        }, []);

        const testcase = await db.test_cases.create({
            name: testcaseName,
            module_id: module_id,
            description: description,
            created_by: user_id,
            project_id: projectId,
            createAt: new Date(),
        }, {
            transaction: t
        });

        const testcaseId = testcase.testcase_id;

        for (let step of testcaseStep) {
            await db.test_case_step.create({
                description: step.description,
                expected_result: step.expectedResult,
                testcase_id: testcaseId,
            }, { transaction: t });
        }

        for (let linking of linkingTestcase) {
            console.log('linking', linking);
            await db.test_case_linking.create({
                testcase_id: testcaseId,
                linking_testcase_id: linking
            }, { transaction: t });
        }

        for (let linking of linkingRequirement) {
            console.log('linking requirement', linking);
            await db.test_case_requirement.create({
                testcase_id: testcaseId,
                requirement_id: linking
            }, { transaction: t });
        }

        await t.commit();

        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error creating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.deleteTestCase = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const testcaseId = req.query.testcaseId;
        console.log('testcaseId', testcaseId);

        await Promise.all([
            db.test_case_requirement.destroy({ where: { testcase_id: testcaseId } }, { transaction: t }),
            db.test_case_linking.destroy({ where: { testcase_id: testcaseId } }, { transaction: t }),
            db.test_case_step.destroy({ where: { testcase_id: testcaseId } }, { transaction: t }),
        ]);

        await db.test_cases.destroy({ where: { testcase_id: testcaseId } }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error deleting test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.getSpecifyTestCase = async (req, res) => {
    const testcaseId = req.query.testcaseId;

    try {
        const [testcase, steps, linkingTestcases, linkingRequirements] = await Promise.all([
            db.sequelize.query(
                'SELECT t.name AS testcase_name, m.name AS module_name, t.description AS testcase_description, m.module_id AS module_id, t."createdAt" AS created_at, t."updatedAt" AS updated_at, t.created_by AS created_by ' +
                'FROM test_cases AS t, modules AS m ' +
                'WHERE testcase_id = ?' +
                'AND t.module_id = m.module_id', { replacements: [testcaseId], type: db.sequelize.QueryTypes.SELECT, raw: true },
            ),

            db.sequelize.query(
                'SELECT description AS step_description, expected_result AS step_result ' +
                'FROM test_case_step ' +
                'WHERE testcase_id = ? ' +
                'ORDER BY testcase_step_id', { replacements: [testcaseId], type: db.sequelize.QueryTypes.SELECT, raw: true }
            ),

            db.sequelize.query(
                'SELECT tl.linking_testcase_id AS testcase_code, t.name AS testcase_name ' +
                'FROM test_case_linking AS tl, test_cases AS t ' +
                'WHERE tl.testcase_id = ? ' +
                'AND tl.linking_testcase_id = t.testcase_id', { replacements: [testcaseId], type: db.sequelize.QueryTypes.SELECT, raw: true }
            ),

            db.sequelize.query(
                'SELECT tr.requirement_id AS requirement_code, r.name AS requirement_name ' +
                'FROM test_case_requirement AS tr, requirements AS r ' +
                'WHERE tr.testcase_id = ? ' +
                'AND tr.requirement_id = r.requirement_id', { replacements: [testcaseId], type: db.sequelize.QueryTypes.SELECT, raw: true }
            )
        ])

        testcase[0].created_by = await db.users.findOne({ where: { user_id: testcase[0].created_by } }).then(user => user.name);

        console.log('testcase', testcase);
        console.log('steps', steps);
        console.log('linkingTestcases', linkingTestcases);
        console.log('linkingRequirements', linkingRequirements);

        res.status(200).send({ success: true, testcase: testcase[0], steps: steps, linkingTestcases: linkingTestcases, linkingRequirements: linkingRequirements });

    } catch (error) {
        console.error('Error viewing test case:', error);
        res.status(500).send({ success: false, error: error });
    }

}

controller.editTestCaseOverview = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { testcaseName, testcaseModule, testcaseDescription } = req.body;
        const testcaseId = req.query.testcaseId;

        console.log(req.body);

        await db.test_cases.update({
            name: testcaseName,
            module_id: testcaseModule,
            description: testcaseDescription,
        }, { where: { testcase_id: testcaseId }, transaction: t });

        await db.test_cases.update({
            updatedAt: new Date()
        }, { where: { testcase_id: testcaseId } }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editTestCaseStep = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { steps } = req.body;
        const testcaseId = req.query.testcaseId;

        console.log(req.body);

        await db.test_case_step.destroy({ where: { testcase_id: testcaseId } }, { transaction: t });

        for (let step of steps) {
            await db.test_case_step.create({
                description: step.description,
                expected_result: step.result,
                testcase_id: testcaseId,
            }, { transaction: t });
        }

        await db.test_cases.update({
            updatedAt: new Date()
        }, { where: { testcase_id: testcaseId } }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editTestCaseLinkingTestCase = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { linkingTestcases } = req.body;
        const testcaseId = req.query.testcaseId;

        console.log(req.body);
        console.log('linkingTestcase', linkingTestcases);

        await db.test_case_linking.destroy({ where: { testcase_id: testcaseId } }, { transaction: t });

        for (let linking of linkingTestcases) {
            await db.test_case_linking.create({
                testcase_id: testcaseId,
                linking_testcase_id: linking
            }, { transaction: t });
        }

        await db.test_cases.update({
            updatedAt: new Date()
        }, { where: { testcase_id: testcaseId } }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editTestCaseLinkingRequirement = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { linkingRequirements } = req.body;
        const testcaseId = req.query.testcaseId;

        console.log(req.body);
        console.log('linkingRequirement', linkingRequirements);

        await db.test_case_requirement.destroy({ where: { testcase_id: testcaseId } }, { transaction: t });

        for (let linking of linkingRequirements) {
            await db.test_case_requirement.create({
                testcase_id: testcaseId,
                requirement_id: linking,
            }, { transaction: t });
        }

        await db.test_cases.update({
            updatedAt: new Date()
        }, { where: { testcase_id: testcaseId } }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

module.exports = controller;