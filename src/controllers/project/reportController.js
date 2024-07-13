const controller = {};
const db = require('../../models/index');

controller.getReport = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Lấy tất cả release của project
        const releases = await db.releases.findAll({
            where: {
                project_id: projectId
            },
            attributes: ['release_id', 'name']
        });

        let mappedData = [];
        if (releases.length > 0) {
            // Lấy tất cả testcases, ứng với từng test run ở trong từng release
            const data = await db.sequelize.query(
                `
                SELECT 
                    test_runs.testrun_id AS testrun_id,
                    test_runs.release AS release_id,
                    test_runs.testrun_title AS testrun_title,
                    test_runs.testrun_status AS testrun_status,
                    test_cases.testcase_id AS testcase_id,
                    test_cases.name AS testcase_title,
                    releases.name AS release_name,
                    test_run_test_case_status.status_name AS testcase_status_name
                FROM test_runs
                LEFT JOIN testcase_testrun ON test_runs.testrun_id = testcase_testrun.testrun_id
                LEFT JOIN test_cases ON testcase_testrun.testcase_id = test_cases.testcase_id
                LEFT JOIN releases ON test_runs.release = releases.release_id
                LEFT JOIN test_run_test_case_status ON testcase_testrun.status_id = test_run_test_case_status.status_id
                WHERE test_runs.release IN (:releaseIds)
                `,
                {
                    replacements: { releaseIds: releases.map(release => release.release_id) },
                    type: db.sequelize.QueryTypes.SELECT,
                }
            );

            // Map each record in data to the corresponding release name
            mappedData = data.map(record => {
                const release = releases.find(r => r.release_id === record.release_id);
                return {
                    ...record,
                    release_name: release ? release.name : 'Unknown'
                };
            });
        }

        // console.log('Mapped data:', mappedData);
        res.locals.releaseReportRecords = mappedData;
        res.render('report-view', {
            title: 'Report',
            cssFile: 'report-view.css',
            projectId: req.params.id,
            projectName: res.locals.projectName,
            part: 'Report'
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = controller;