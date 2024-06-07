const controller = {};
const db = require('../../models/index');

controller.getTestCase = async (req,res) => {
    try {
        const projectId = req.params.id;
        
        const [testCases, modules, requirements, requirementTypes] = await Promise.all([
            db.sequelize.query(
                'SELECT testcase_id, name FROM test_cases WHERE project_id = ? ORDER BY testcase_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT name, module_id FROM modules WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT requirement_id AS requirement_code, name AS requirement_name FROM requirements WHERE project_id = ? ORDER BY requirement_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT name FROM requirement_types WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        res.locals.requirements_type = requirementTypes;
        res.locals.requirements = requirements;
        res.locals.testcases = testCases;
        res.locals.modules = modules;
        res.render('test-case-view', {
            title: 'Tetto',
            cssFile: 'test-case-view.css',
            projectId: projectId,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.addTestCase = async (req,res) => {
    try {
        const projectId = req.params.id;
        const { testcaseName, module_id, description, testcaseStep, linkingTestcase ,linkingRequirement } = req.body;

        testcaseStep.reduceRight(function(acc,step,index,object) {
            if (step.description === '' && step.expectedResult === '') {
                object.splice(index,1);
            }
        },[]);

        const testcase = await db.test_cases.create({
            name: testcaseName,
            module_id: module_id,
            description: description,
            created_by: 1,   
            project_id: projectId
        });

        const testcaseId = testcase.testcase_id;
        
        for (let step of testcaseStep) {
            await db.test_case_step.create({
                description: step.description,
                expected_result: step.expectedResult,
                testcase_id: testcaseId
            });
        }

        for (let linking of linkingTestcase) { 
            console.log('linking',linking);
            await db.test_case_linking.create({
                testcase_id: testcaseId,
                linking_testcase_id: linking
            });
        }

        for (let linking of linkingRequirement) {
            console.log('linking requirement',linking);
            await db.test_case_requirement.create({
                testcase_id: testcaseId,
                requirement_id: linking
            });
        }

        res.status(200).send({ success: true});
    } catch (error) {
        console.error('Error creating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

module.exports = controller;