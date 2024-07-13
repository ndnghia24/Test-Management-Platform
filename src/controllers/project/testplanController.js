const controller = {};
const db = require('../../models/index');

controller.getTestPlan = async (req, res) => {
    // Set up pagination
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const limit = 12;
    const offset = (page - 1) * limit;
    let release = req.query.release || null;

    try {
        // Fetch data
        const project_id = req.params.id;

        const releaseCondition = release ? 'AND r.release_id = ?' : '';

        const testPlansQuery =  
        'SELECT t.testplan_id AS code, t.name AS name, t.description, r.name AS release, r.release_id AS release_id ' +
        'FROM test_plans AS t, releases AS r ' +
        'WHERE t.release = r.release_id ' +
        'AND t.project_id = ? ' +
        releaseCondition + ' ' +
        'ORDER BY t.testplan_id ' +
        'LIMIT ? OFFSET ?';

        const countQuery =
        'SELECT COUNT(*) AS count ' +
        'FROM test_plans AS t, releases AS r ' +
        'WHERE t.project_id = ? ' +
        'AND t.release = r.release_id ' +
        releaseCondition;

        const replacements = [project_id];

        if (release) {
            replacements.push(release);
        }

        replacements.push(limit, offset);
    
        const [testPlans, count, releases] = await Promise.all([
            db.sequelize.query(
                testPlansQuery,
                {
                    replacements: replacements,
                    type: db.sequelize.QueryTypes.SELECT
                }
            ),
            db.sequelize.query(
                countQuery,
                {
                    replacements: replacements.slice(0, -2),
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
        
        if (release)
            release = release.trim();

        // res.locals.testPlans = testPlans.filter(testPlan => {
        //     if (release) {
        //         return testPlan.release.trim() == release;
        //     }
        //     return true;
        // });
        res.locals.releases = releases;

        res.render('test-plan-view', {
            title: 'Test Plans',
            testPlans: testPlans,
            cssFile: 'test-plan-view.css',
            projectId: project_id,
            pagination: {
                page: page,
                limit: limit,
                totalRows: count[0].count,
                queryParams: release ? { release: release } : {},
            },
            permissions: res.locals.permissions,
            projectName: res.locals.projectName,
            part: 'Test Plan'
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.addTestPlan = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const project_id = req.params.id;
        const { name, release, description } = req.body;

        console.log(req.body);

        const testPlan = await db.test_plans.create({
            name: name,
            release: release,
            description: description,
            project_id: project_id
        }, { transaction: t });

        await t.commit();

        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error creating test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editTestPlan = async (req, res) => {
    try {
        const t = await db.sequelize.transaction();
        const planCode = req.query.planCode;
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
        }, { transaction: t });
        await t.commit();

        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error updating test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.deleteTestPlan = async (req, res) => {
    try {
        const t = await db.sequelize.transaction();
        const planCode = req.query.planCode;

        await db.test_plans.destroy({
            where: {
                testplan_id: planCode,
                // project_id: project_id
            }
        }, { transaction: t });
        await t.commit();

        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error deleting test plan:', error);
        res.status(500).send({ success: false, error: error });
    }
}

module.exports = controller;