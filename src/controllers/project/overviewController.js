const controller = {};
const db = require('../../models/index');

controller.getOverview = async (req,res) => {
    try {
        const projectId = req.params.id;
        // all testcase
        const [issues, issue_status, releases, testrun, testcases] = await Promise.all([
            db.sequelize.query(
                'SELECT issue_id, title, status_id FROM issues WHERE project_id = ? ORDER BY issue_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
            ),
            db.sequelize.query(
                'SELECT issue_status_id, status FROM issue_status ORDER BY issue_status_id',
                { type: db.sequelize.QueryTypes.SELECT}
            ),
            db.sequelize.query(
                'SELECT release_id, name FROM releases WHERE project_id = ? ORDER BY release_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
            ),
            db.sequelize.query(
                'SELECT testrun_id, testrun_title FROM test_runs WHERE project_id = ? ORDER BY testrun_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
            ),
            db.sequelize.query(
                'SELECT testcase_id, name FROM test_cases WHERE project_id = ? ORDER BY testcase_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
            ),
        ]);

        // count release
        const releaseCount = releases.length;
        const testrunCount = testrun.length;
        const testcaseCount = testcases.length;

        function stringToColor(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            let color = '#';
            for (let i = 0; i < 3; i++) {
                let value = (hash >> (i * 8)) & 0xFF;
                color += ('00' + value.toString(16)).substr(-2);
            }
            return color;
        }

        // gom nhóm các issues theo issue_status_id, sau đó tạo mảng số lượng của từng issues_status_id, mảng đó có chứa thông tin về issues_status_id, status và số lượng các issues của từng status
        const issueStatusSingleCount = issue_status.map(status => {
            const count = issues.filter(issue => issue.status_id === status.issue_status_id).length;
            const color = stringToColor(status.status);
            return {
                ...status, count, color,
            };
        }
        );

        res.locals.releaseCount = releaseCount;
        res.locals.testrunCount = testrunCount;
        res.locals.testcaseCount = testcaseCount;
        res.locals.issueStatusSingleCount = issueStatusSingleCount;
        res.locals.releaseList = releases.slice(0, 3);
        res.locals.testrunList = testrun.slice(0, 3);
        res.locals.testcasesList = testcases.slice(0, 3);

        res.render('overview-view', {
            title: 'Overview',
            cssFile: 'overview-view.css',
            projectId: req.params.id,
            projectName: res.locals.projectName,
            part: 'Overview'
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = controller;