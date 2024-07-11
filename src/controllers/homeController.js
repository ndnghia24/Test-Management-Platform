const db = require('../models/index');

controller = {}

const { Op, QueryTypes } = require('sequelize');

controller.getHome = async (req, res) => {
    try {
        // Lấy danh sách các projects và thông tin liên quan
        const projectsInfo = await db.sequelize.query(`
            SELECT 
                projects.project_id AS id, 
                projects.name AS name, 
                users.name AS created_by, 
                projects.created_date AS created_on, 
                COUNT(test_cases.*) AS num_testcases, 
                COUNT(test_runs.*) AS num_testruns, 
                COUNT(issues.*) AS num_issues
            FROM projects
            LEFT JOIN users ON projects.created_by = users.user_id
            LEFT JOIN test_cases ON projects.project_id = test_cases.project_id
            LEFT JOIN test_runs ON projects.project_id = test_runs.project_id
            LEFT JOIN issues ON projects.project_id = issues.project_id
            GROUP BY projects.project_id, users.name;
        `, {
            type: QueryTypes.SELECT
        });

        // Lấy tất cả các issues được giao cho user hiện tại
        const userId = 1; // Thay userId bằng user hiện tại
        const issues = await db.sequelize.query(`
            SELECT 
                issues.description, 
                issues.issue_id, 
                users.name AS user_name, 
                issue_status.status, 
                issues.created_date, 
                projects.name AS project_name, 
                projects.project_id AS project_id
            FROM issues
            LEFT JOIN users ON issues.assigned_to = users.user_id
            LEFT JOIN issue_status ON issues.status_id = issue_status.issue_status_id
            LEFT JOIN projects ON issues.project_id = projects.project_id
            WHERE issues.assigned_to = :userId
            ORDER BY issues.issue_id;
        `, {
            replacements: { userId: userId },
            type: QueryTypes.SELECT
        });

        res.locals.projects = projectsInfo;
        res.locals.issues = issues;
        res.render("homepage", { layout: false });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}


controller.addProject = async (req, res) => {
    try {
        const { projectName } = req.body;
        const userId = 1;

        const description = req.body.description || '';
        //get the highest project_id
        // let project_id = await db.projects.max('project_id');

        const project = await db.projects.create({
            name: projectName,
            description: description,
            created_by: userId,
            created_date: new Date()
        });

        res.status(201).send(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

controller.deleteProject = async (req, res) => {
    console.log('deleteProject');
    try {
        const { projectId } = req.body;
        console.log(projectId);
        await db.projects.destroy({
            where: {
                project_id: projectId
            }
        });

        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

controller.addUser = async (req, res) => {
    try {
        const { email, role, projectId } = req.body;
        const user = await db.users.findOne({
            where: {
                email: email
            }
        });
        const role_id = await db.role.findOne({
            where: {
                role: role
            }
        });
        if (user && role_id){
            //if not record in user_in_project have same user_id and project_id
            const userInProject = await db.user_in_project.findOne({
                where: {
                    user_id: user.user_id,
                    project_id: projectId
                }
            });
            if (userInProject){
                res.status(400).send('User already in project');
                return;
            }
            await db.user_in_project.create({
                user_id: user.user_id,
                project_id: projectId,
                role_id: role_id.role_id,
                is_delete: false
            });
        }
        else{
            res.status(400).send('User not found');
            return;
        }
        res.status(200).send(user);
        console.log(200);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = controller;