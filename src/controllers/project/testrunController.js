const controller = {};
const db = require('../../models/index');

controller.getTestRun = async (req, res) => {
    try {
        const projectId = req.params.id;
        const testruns = await db.test_runs.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        });

        const userId = [...new Set(testruns.flatMap(testrun => [testrun.created_by, testrun.assigned_to]))]
        
        const users = await db.users.findAll({
            where: {
                user_id: userId
            },
            raw: true
        });
        const userMap = users.reduce((acc, user) => { acc[user.user_id] = user.name; return acc; }, {});
        testruns.forEach(testrun => {
            testrun.created_by = userMap[testrun.created_by];
            testrun.assigned_to = userMap[testrun.assigned_to];
        });

        console.log(testruns);
        res.render('test-run-view', {
            title: 'Tetto',
            cssFile: 'test-run-view.css',
            projectId: projectId,
            testRuns: testruns
        });
    } catch (error) {
        console.error('Error getting test runs:', error);
        res.status(500).send({ success: false, error });
    }
};

module.exports = controller;