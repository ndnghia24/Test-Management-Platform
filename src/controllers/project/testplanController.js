const controller = {};
const db = require('../../models/index');

controller.getTestPlan = async (req, res) => {
    try {
        const project_id = req.params.id;

        const [testPlans, releases] = await Promise.all([
            db.sequelize.query(
                'SELECT t.testplan_id AS code, t.name AS name, t.description, r.name AS release, r.release_id AS release_id ' +
                'FROM test_plans AS t, releases AS r ' +
                'WHERE t.release = r.release_id ' +
                'AND t.project_id = ? ' +
                'ORDER BY t.testplan_id',
                {
                    replacements: [project_id],
                    type: db.sequelize.QueryTypes.SELECT
                }
            ),
            db.sequelize.query(
                'SELECT release_id, name ' +
                'FROM releases ' +
                'WHERE project_id = ? ' +
                'ORDER BY release_id',
                {
                    replacements: [project_id],
                    type: db.sequelize.QueryTypes.SELECT
                }
            )
        ]);

        res.locals.testPlans = testPlans;
        res.locals.releases = releases;
        res.render('test-plan-view', {
            title: 'Tetto',
            cssFile: 'test-plan-view.css',
            projectId: project_id,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.addTestPlan = async (req, res) => {
    console.log('Adding test plan');   
    try {
        const project_id = req.params.id;
        const { name, release, description } = req.body;

        console.log(req.body);

        const testPlan = await db.test_plans.create({
            name: name,
            release: release,
            description: description,
            project_id: project_id
        });

        res.status(200).send({ success: true});
    } catch (error) {
        console.error('Error creating test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editTestPlan = async (req, res) => {
    try {
        // const project_id = req.params.id;
        const planCode  = req.query.planCode;
        const { name, release, description } = req.body;

        await db.test_plans.update({
            name: name,
            release: release,
            description: description
        }, {
            where: {
                testplan_id: planCode,
                // project_id: project_id
            }
        });

        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error updating test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.deleteTestPlan = async (req, res) => {
    try {
        // const project_id = req.params.id;
        const planCode = req.query.planCode;

        await db.test_plans.destroy({
            where: {
                testplan_id: planCode,
                // project_id: project_id
            }
        });

        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error deleting test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

module.exports = controller;