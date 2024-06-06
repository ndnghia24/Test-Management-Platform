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
                'SELECT DISTINCT name FROM modules WHERE project_id = ?',
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

module.exports = controller;