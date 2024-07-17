const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { raw } = require('express');

controller.getIssues = async (req, res) => {
    try {
        const projectId = req.params.id;
        let { status, priority, createdBy, assignedTo, page } = req.query;
        page = isNaN(page) ? 1 : Math.max(1, parseInt(page));
        const limit = 5;
        let offset = (page - 1) * limit;

        //get all issues of this project
        const all_issues = await db.sequelize.query(
            'SELECT issue_id, title, description, priority_id, status_id, created_date, created_by, assigned_to FROM issues WHERE project_id = ? ORDER BY issue_id',
            { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
        );

        if (limit * (page - 1) > all_issues.length) {
            page = 1;
            offset = 0;
        }
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

        if (!(status in statusMap)) {
            status = undefined;
        }
        if (!(priority in priorityMap)) {
            priority = undefined;
        }
        if (!(createdBy in createdByMap)) {
            createdBy = undefined;
        }
        if (!(assignedTo in assignedToMap)) {
            assignedTo = undefined;
        }

        let query = `
        SELECT 
            issue_id, title, description, priority_id, status_id, created_date, created_by, assigned_to 
        FROM 
            issues 
        WHERE 
            project_id = ?
        `;

        const replacements = [projectId];
        if (status) {
            query += ' AND status_id = ?';
            replacements.push(statusMap[status]);
        }

        if (priority) {
            query += ' AND priority_id = ?';
            replacements.push(priorityMap[priority]);
        }

        if (createdBy) {
            query += ' AND created_by = ?';
            replacements.push(createdByMap[createdBy]);
        }

        if (assignedTo) {
            query += ' AND assigned_to = ?';
            replacements.push(assignedToMap[assignedTo]);
        }

        let count = await db.sequelize.query(query, {
            replacements,
            type: db.sequelize.QueryTypes.SELECT
        });

        query += ' ORDER BY issue_id';
        query += ' LIMIT ? OFFSET ?';

        replacements.push(limit);
        replacements.push(offset);

        let issues = await db.sequelize.query(query, {
            replacements,
            type: db.sequelize.QueryTypes.SELECT
        });

        let detailedIssues = [];
        //check if there is any issue
        if (issues.length != 0) {
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
            detailedIssues = issues.map(issue => {
                issue.priority = priorityResults.find(p => p.issue_priority_id === issue.priority_id).priority;
                issue.status = statusResults.find(s => s.issue_status_id === issue.status_id).status;
                issue.created_by = createdByResults.find(c => c.user_id === issue.created_by).name;
                issue.assigned_to = assignToResults.find(a => a.user_id === issue.assigned_to)?.name ?? null;
                return issue;
            });
        }
        else {
            detailedIssues = [];
        }
        res.locals.issue_details = detailedIssues;
        res.locals.all_status = all_status;
        res.locals.all_priority = all_priority;
        res.locals.all_createdBy = all_createdBy;
        res.locals.all_assignedTo = all_assignedTo;
        res.locals.status = status;
        res.locals.priority = priority;
        res.locals.createdBy = createdBy;
        res.locals.assignedTo = assignedTo;

        //get all priority
        const existing_priority = await db.sequelize.query(
            'SELECT priority FROM issue_priority', { type: db.sequelize.QueryTypes.SELECT }
        );
        //get all status
        const existing_status = await db.sequelize.query(
            'SELECT status FROM issue_status', { type: db.sequelize.QueryTypes.SELECT }
        );
        //get all user
        const existing_user = await db.sequelize.query(
            'SELECT name FROM users', { type: db.sequelize.QueryTypes.SELECT }
        );

        //get all issue type
        const existing_type = await db.sequelize.query(
            'SELECT type FROM issue_type', { type: db.sequelize.QueryTypes.SELECT }
        );
        //get all test case in project
        const existing_testcase = await db.sequelize.query(
            'SELECT name FROM test_cases WHERE project_id = ?', { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
        );

        res.locals.existing_priority = existing_priority;
        res.locals.existing_status = existing_status;
        res.locals.existing_user = existing_user;
        res.locals.existing_type = existing_type;
        res.locals.existing_testcase = existing_testcase;

        res.render('issue-view', {
            title: 'Issues',
            projectId: projectId,
            permissions: res.locals.permissions,
            pagination: {
                page: page,
                limit: limit,
                totalRows: count.length
            },
            projectName: res.locals.projectName,
            part: 'Issues'
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.getSpecifyIssue = async (req, res) => {
    try {
        const projectId = req.params.id;
        const issueId = req.query.issueId;
        console.log('issueId', issueId);
        console.log('projectId', projectId);
        const issue = await db.sequelize.query(
            'SELECT i.title, i.issue_id, i.description, i.created_date, i.test_case_id, ip.priority, iss.status, it.type, i.created_by, i.assigned_to ' +
            'FROM issues AS i, issue_priority AS ip, issue_status AS iss, issue_type AS it ' +
            'WHERE issue_id = ? ' +
            'AND i.priority_id = ip.issue_priority_id AND i.status_id = iss.issue_status_id AND i.issue_type_id = it.issue_type_id',
            { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true },
        );

        console.log("issue", issue);

        const created_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].created_by], type: db.sequelize.QueryTypes.SELECT, raw: true },
        );

        const assigned_to = issue[0].assigned_to;

        // Kiểm tra nếu assigned_to là null
        let assigned_user = null;
        if (assigned_to === null) {
            // Gán assigned_user là null nếu assigned_to là null
            assigned_user = null;
        } else {
            // Thực hiện truy vấn để lấy thông tin người dùng
            const assigned_user_result = await db.sequelize.query(
                'SELECT name FROM users WHERE user_id = ?',
                { replacements: [assigned_to], type: db.sequelize.QueryTypes.SELECT, raw: true },
            );

            // Nếu không tìm thấy người dùng, gán assigned_user là null
            assigned_user = assigned_user_result.length > 0 ? assigned_user_result[0] : null;
        }

        const testcase = await db.sequelize.query(
            'SELECT t.name as testcase, t.testcase_id as testcase_id, m.name as module ' +
            'FROM test_cases as t, modules as m ' +
            'WHERE testcase_id = ? ' +
            'AND t.module_id = m.module_id', { replacements: [issue[0].test_case_id], type: db.sequelize.QueryTypes.SELECT, raw: true }
        );

        //get comment of this issue
        const comments = await db.sequelize.query(
            'SELECT c.content as comment, c."createdAt", u.name ' +
            'FROM comment as c, users as u ' +
            'WHERE c.issue_id = ? ' +
            'AND c.user_id = u.user_id ' +
            'ORDER BY c."createdAt"', { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true }
        );
        // console.log('comment', comments);

        // console.log('testcase', testcase);
        // console.log('issue', issue);

        res.locals.issue = issue[0];
        res.locals.testcase = testcase[0];
        res.locals.created_user = created_user[0];
        res.locals.assigned_user = assigned_user;
        res.locals.comments = comments;

        console.log('issue', res.locals.issue);
        console.log('assigned_user', res.locals.assigned_user);
        res.render('detail-issue-view', {
            projectId: projectId,
            title: 'Issues Detail'
        });

    } catch (error) {
        console.error('Error viewing test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}

controller.getEditIssue = async (req, res) => {
    try {
        const projectId = req.params.id;
        const issueId = req.query.issueId;
        const issue = await db.sequelize.query(
            'SELECT i.title, i.issue_id, i.description, i.created_date, i.test_case_id, ip.priority, iss.status, it.type, i.created_by, i.assigned_to ' +
            'FROM issues AS i, issue_priority AS ip, issue_status AS iss, issue_type AS it ' +
            'WHERE issue_id = ? ' +
            'AND i.priority_id = ip.issue_priority_id AND i.status_id = iss.issue_status_id AND i.issue_type_id = it.issue_type_id',
            { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true },
        );

        const created_user = await db.sequelize.query(
            'SELECT name FROM users WHERE user_id = ?',
            { replacements: [issue[0].created_by], type: db.sequelize.QueryTypes.SELECT, raw: true },
        );

        const assigned_to = issue[0].assigned_to;

        // Kiểm tra nếu assigned_to là null
        let assigned_user = null;
        if (assigned_to === null) {
            // Gán assigned_user là null nếu assigned_to là null
            assigned_user = null;
        } else {
            // Thực hiện truy vấn để lấy thông tin người dùng
            const assigned_user_result = await db.sequelize.query(
                'SELECT name FROM users WHERE user_id = ?',
                { replacements: [assigned_to], type: db.sequelize.QueryTypes.SELECT, raw: true },
            );

            // Nếu không tìm thấy người dùng, gán assigned_user là null
            assigned_user = assigned_user_result.length > 0 ? assigned_user_result[0] : null;
        }

        const testcase = await db.sequelize.query(
            'SELECT t.name as testcase, t.testcase_id as testcase_id, m.name as module ' +
            'FROM test_cases as t, modules as m ' +
            'WHERE testcase_id = ? ' +
            'AND t.module_id = m.module_id', { replacements: [issue[0].test_case_id], type: db.sequelize.QueryTypes.SELECT, raw: true }
        );

        const status = await db.sequelize.query(
            'SELECT status FROM issue_status', { type: db.sequelize.QueryTypes.SELECT, raw: true }
        );

        let priority = [];
        console.log('permissions', res.locals.permissions);
        if (res.locals.permissions.canEditPriority){
            priority = await db.sequelize.query(
                'SELECT priority FROM issue_priority', { type: db.sequelize.QueryTypes.SELECT, raw: true }
            );
        }
        

        //get comment of this issue
        const comments = await db.sequelize.query(
            'SELECT c.content as comment, c."createdAt", u.name ' +
            'FROM comment as c, users as u ' +
            'WHERE c.issue_id = ? ' +
            'AND c.user_id = u.user_id ' +
            'ORDER BY c."createdAt"', { replacements: [issueId], type: db.sequelize.QueryTypes.SELECT, raw: true }
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

        const priorityColorMap = {
            'Low': 'color-deep-green',
            'Medium': 'color-deep-sea',
            'High': 'color-red',
        };

        // console.log('testcase',testcase);
        // console.log('issue',issue);

        res.locals.issue = issue[0];
        res.locals.testcase = testcase[0];
        res.locals.created_user = created_user[0];
        res.locals.assigned_user = assigned_user;
        res.locals.status = status;
        res.locals.statusColorMap = statusColorMap;
        res.locals.priority = priority;
        res.locals.priorityColorMap = priorityColorMap;
        res.locals.comments = comments;
        // console.log('statusColorMap', statusColorMap);


        res.render('update-issue-view', {
            title: 'Update Issues',
            permissions: res.locals.permissions,
            projectId: projectId,
            projectName: res.locals.projectName,
            part: 'Issues'
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
        const issueId = req.query.issueId;
        const { status, comment , priority, description} = req.body;
        const status_id = await db.sequelize.query(
            'SELECT issue_status_id FROM issue_status WHERE status = ?',
            { replacements: [status], type: db.sequelize.QueryTypes.SELECT }
        );

        if (res.locals.permissions.canEditPriority){
            const priority_id = await db.sequelize.query(
                'SELECT issue_priority_id FROM issue_priority WHERE priority = ?',
                { replacements: [priority], type: db.sequelize.QueryTypes.SELECT }
            );
            await db.issues.update({
                priority_id: priority_id[0].issue_priority_id
            }, {
                where: {
                    issue_id: issueId,
                    // project_id: project_id
                }
            }, { transaction: t });
        }

        if (res.locals.permissions.canEditDescription){
            await db.issues.update({
                description: description
            }, {
                where: {
                    issue_id: issueId,
                    // project_id: project_id
                }
            }, { transaction: t });
        }

        await db.issues.update({
            status_id: status_id[0].issue_status_id
        }, {
            where: {
                issue_id: issueId,
                // project_id: project_id
            }
        }, { transaction: t });
        await t.commit();

        const t1 = await db.sequelize.transaction();
        try {
            if (comment != '') {
                const comment_id = await db.sequelize.query(
                    'SELECT MAX(comment_id) as comment_id FROM comment',
                    { type: db.sequelize.QueryTypes.SELECT }
                );

                const new_comment_id = comment_id[0].comment_id + 1;
                console.log('user id ', res.locals.user_id);
                
                await db.comment.create({
                    comment_id: new_comment_id,
                    issue_id: issueId,
                    user_id: res.locals.user_id,
                    content: comment,
                    created_date: new Date()
                }, { transaction: t1 });
                await t1.commit();
            }
        }
        catch (error) {
            await t1.rollback();
            console.error('Error updating test plan:', error);
            res.status(500).send({ success: false, error: error });
            return;
        }

        res.status(200).send({ success: true });

    } catch (error) {
        await t.rollback();
        console.error('Error updating test plan:', error);
        res.status(500).send({ success: false, error: error });
        return;
    }


}

controller.addIssue = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const projectId = parseInt(req.params.id);
        const { data } = req.body;
        const { title, priority, status, asign, description, testcase, type } = data;

        //select the highest issue_id
        let issue_id = await db.sequelize.query(
            'SELECT MAX(issue_id) as issue_id FROM issues',
            { type: db.sequelize.QueryTypes.SELECT }
        );
        let new_issue_id = issue_id[0].issue_id + 1;

        const priority_id = await db.sequelize.query(
            'SELECT issue_priority_id FROM issue_priority WHERE priority = ?',
            { replacements: [priority], type: db.sequelize.QueryTypes.SELECT }
        );

        const status_id = await db.sequelize.query(
            'SELECT issue_status_id FROM issue_status WHERE status = ?',
            { replacements: [status], type: db.sequelize.QueryTypes.SELECT }
        );

        const issue_type_id = await db.sequelize.query(
            'SELECT issue_type_id FROM issue_type WHERE type = ?',
            { replacements: [type], type: db.sequelize.QueryTypes.SELECT }
        );

        let id_of_issue_type = 1;
        if (issue_type_id.length > 0) {
            id_of_issue_type = issue_type_id[0].issue_type_id;
        }

        let user_assigned_to = null;

        if (asign !== '') {
            const assigned_to = await db.sequelize.query(
                'SELECT user_id FROM users WHERE name = ?',
                { replacements: [asign], type: db.sequelize.QueryTypes.SELECT }
            );
            user_assigned_to = assigned_to[0].user_id;
        }

        
        const test_case_id = await db.sequelize.query(
            'SELECT testcase_id FROM test_cases WHERE name = ?',
            { replacements: [testcase], type: db.sequelize.QueryTypes.SELECT }
        );

        let id_of_testcase = null;
        if (test_case_id.length > 0) {
            id_of_testcase = test_case_id[0].testcase_id;
        }

        console.log('priority_id', priority_id);
        console.log('status_id', status_id);
        console.log('issue_type_id', issue_type_id);
        console.log('assigned_to', user_assigned_to);
        console.log('test_case_id', test_case_id);
        console.log('projectId', projectId);
        console.log('new_issue_id', new_issue_id);
        console.log('title', title);
        console.log('description', description);

        await db.issues.create({
            issue_id: new_issue_id,
            title: title,
            priority_id: priority_id[0].issue_priority_id,
            status_id: status_id[0].issue_status_id,
            created_by: 1,
            assigned_to: user_assigned_to,
            description: description,
            test_case_id: id_of_testcase,
            issue_type_id: id_of_issue_type,
            test_run_id: null,
            project_id: projectId,
            created_date: new Date(),
        }, { transaction: t });

        await t.commit();

        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error creating test case:', error);
        res.status(500).send({ success: false, error: error });
    }
}
module.exports = controller;