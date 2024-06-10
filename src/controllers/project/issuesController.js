const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { raw } = require('express');

controller.getIssues = async (req,res) => {
    try {
        const projectId = req.params.id;
        const { status, priority, createdBy, assignedTo } = req.query;

        //get all issues of this project
        const all_issues = await db.sequelize.query(
            'SELECT issue_id, title, description, priority_id, status_id, created_by, assigned_to FROM issues WHERE project_id = ? ORDER BY issue_id',
            { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
        );

        // Extract unique IDs from issues for each type
        const all_priorityIds = [...new Set(all_issues.map(issue => issue.priority_id))];
        const all_statusIds = [...new Set(all_issues.map(issue => issue.status_id))];
        const all_created_bys = [...new Set(all_issues.map(issue => issue.created_by))];
        const all_assigned_tos = [...new Set(all_issues.map(issue => issue.assigned_to))];

        // query all data can be used for filter
        const all_priority = await db.sequelize.query(
            'SELECT DISTINCT issue_priority_id, priority FROM issue_priority WHERE issue_priority_id IN (?)',
            { replacements: [all_priorityIds], type: db.sequelize.QueryTypes.SELECT }
        );
        
        const all_status = await db.sequelize.query(
            'SELECT DISTINCT issue_status_id, status FROM issue_status WHERE issue_status_id IN (?)',
            { replacements: [all_statusIds], type: db.sequelize.QueryTypes.SELECT }
        );

        const all_createdBy = await db.sequelize.query(
            'SELECT DISTINCT user_id, name FROM users WHERE user_id IN (?)',
            { replacements: [all_created_bys], type: db.sequelize.QueryTypes.SELECT }
        );

        const all_assignedTo = await db.sequelize.query(
            'SELECT DISTINCT user_id, name FROM users WHERE user_id IN (?)',
            { replacements: [all_assigned_tos], type: db.sequelize.QueryTypes.SELECT }
        );

        //created map for each type
        const priorityMap = {};
        all_priority.forEach(priority => {
            priorityMap[priority.priority] = priority.issue_priority_id;
        });

        const statusMap = {};
        all_status.forEach(status => {
            statusMap[status.status] = status.issue_status_id;
        });

        const createdByMap = {};
        all_createdBy.forEach(createdBy => {
            createdByMap[createdBy.name] = createdBy.user_id;
        });

        const assignedToMap = {};
        all_assignedTo.forEach(assignedTo => {
            assignedToMap[assignedTo.name] = assignedTo.user_id;
        });


        let query = `
        SELECT 
            issue_id, title, description, priority_id, status_id, created_by, assigned_to 
        FROM 
            issues 
        WHERE 
            project_id = ?
        `;

        const replacements = [projectId];

        if (status && status in statusMap) {
            query += ' AND status_id = ?';
            replacements.push(statusMap[status]);
        }

        if (priority && priority in priorityMap) {
            query += ' AND priority_id = ?';
            replacements.push(priorityMap[priority]);
        }

        if (createdBy && createdBy in createdByMap) {
            query += ' AND created_by = ?';
            replacements.push(createdByMap[createdBy]);
        }

        if (assignedTo && assignedTo in assignedToMap) {
            query += ' AND assigned_to = ?';
            replacements.push(assignedToMap[assignedTo]);
        }

        query += ' ORDER BY issue_id';

        let issues = await db.sequelize.query(query, {
            replacements,
            type: db.sequelize.QueryTypes.SELECT
        });

        //check if there is any issue
        if (issues.length === 0) {
            issues = all_issues;
        }

        // Extract unique IDs from issues for each type
        const priorityIds = [...new Set(issues.map(issue => issue.priority_id))];
        const statusIds = [...new Set(issues.map(issue => issue.status_id))];
        const created_bys = [...new Set(issues.map(issue => issue.created_by))];
        const assigned_tos = [...new Set(issues.map(issue => issue.assigned_to))];

        // Query for additional data
        const [priorityResults, statusResults, createdByResults, assignToResults] = await Promise.all([
            db.sequelize.query(
                'SELECT issue_priority_id, priority FROM issue_priority WHERE issue_priority_id IN (?)',
                { replacements: [priorityIds], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT issue_status_id, status FROM issue_status WHERE issue_status_id IN (?)',
                { replacements: [statusIds], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT user_id, name FROM users WHERE user_id IN (?)',
                { replacements: [created_bys], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT user_id, name FROM users WHERE user_id IN (?)',
                { replacements: [assigned_tos], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        // Map additional data to issues
        const detailedIssues = issues.map(issue => {
            issue.priority = priorityResults.find(p => p.issue_priority_id === issue.priority_id).priority;
            issue.status = statusResults.find(s => s.issue_status_id === issue.status_id).status;
            issue.created_by = createdByResults.find(c => c.user_id === issue.created_by).name;
            issue.assigned_to = assignToResults.find(a => a.user_id === issue.assigned_to).name;
            return issue;
        });

        res.locals.issue_details = detailedIssues;
        res.render('issue-view', {
            title: 'Issues',
            projectId: projectId,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.getSpecifyIssue = async (req,res) => {
    try {
        const issueId = req.query.issueId;
        const issue = await db.sequelize.query(
            'SELECT i.title, i.issue_id, i.description, i.test_case_id, ip.priority, iss.status, it.type, i.created_by, i.assigned_to ' +
            'FROM issues AS i, issue_priority AS ip, issue_status AS iss, issue_type AS it ' +
            'WHERE issue_id = ? ' +
            'AND i.priority_id = ip.issue_priority_id AND i.status_id = iss.issue_status_id AND i.issue_type_id = it.issue_type_id', 
            { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const created_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].created_by], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const assigned_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].assigned_to], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const testcase = await db.sequelize.query(
            'SELECT t.name as testcase, t.testcase_id as testcase_id, m.name as module ' +
            'FROM test_cases as t, modules as m ' +
            'WHERE testcase_id = ? ' +
            'AND t.module_id = m.module_id', { replacements: [issue[0].test_case_id], type: db.sequelize.QueryTypes.SELECT, raw: true}
        );

        console.log('testcase',testcase);
        console.log('issue',issue);

        res.locals.issue = issue[0];
        res.locals.testcase = testcase[0];
        res.locals.created_user = created_user[0];
        res.locals.assigned_user = assigned_user[0];

        res.render('detail-issue-view', {
            title: 'Issues Detail'
        });

    } catch (error) {
        console.error('Error viewing test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.getEditIssue = async (req,res) => {
    try {
        const issueId = req.query.issueId;
        const issue = await db.sequelize.query(
            'SELECT i.title, i.issue_id, i.description, i.test_case_id, ip.priority, iss.status, it.type, i.created_by, i.assigned_to ' +
            'FROM issues AS i, issue_priority AS ip, issue_status AS iss, issue_type AS it ' +
            'WHERE issue_id = ? ' +
            'AND i.priority_id = ip.issue_priority_id AND i.status_id = iss.issue_status_id AND i.issue_type_id = it.issue_type_id', 
            { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const created_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].created_by], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const assigned_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].assigned_to], type: db.sequelize.QueryTypes.SELECT, raw: true},
        );

        const testcase = await db.sequelize.query(
            'SELECT t.name as testcase, t.testcase_id as testcase_id, m.name as module ' +
            'FROM test_cases as t, modules as m ' +
            'WHERE testcase_id = ? ' +
            'AND t.module_id = m.module_id', { replacements: [issue[0].test_case_id], type: db.sequelize.QueryTypes.SELECT, raw: true}
        );

        const status = await db.sequelize.query(
            'SELECT status FROM issue_status', { type: db.sequelize.QueryTypes.SELECT, raw: true }
        );

        const statusColorMap = {
            'New': 'color-green',
            'Open': 'color-green',
            'Assigned': 'color-blue',
            'Resolved': 'color-deep-sea',
            'Retest': 'color-brown',
            'Verified': 'color-sea',
            'Reopened': 'color-orange',
            'Closed': 'color-red',
            'Deferred': 'color-brown',
            'Rejected': 'color-red',
            'Duplicate': 'color-brown'
        };

        // console.log('testcase',testcase);
        // console.log('issue',issue);

        res.locals.issue = issue[0];
        res.locals.testcase = testcase[0];
        res.locals.created_user = created_user[0];
        res.locals.assigned_user = assigned_user[0];
        res.locals.status = status;
        res.locals.statusColorMap = statusColorMap;
        console.log('statusColorMap',statusColorMap);

        res.render('update-issue-view', {
            title: 'Update Issues'
        });    
    }
    catch (error) {
        console.error('Error viewing test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.editIssue = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const issueId  = req.query.issueId;
        const {status} = req.body;

        const status_id = await db.sequelize.query(
            'SELECT issue_status_id FROM issue_status WHERE status = ?',
            { replacements: [status], type: db.sequelize.QueryTypes.SELECT }
        );
        
        await db.issues.update({
            status_id: status_id[0].issue_status_id
        }, {
            where: {
                issue_id: issueId,
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

module.exports = controller;