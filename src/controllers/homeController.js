const db = require('../models/index');

controller = {}

controller.getHome = async (req, res) => {
    try {
        const projects = await db.projects.findAll();

        //get information for each project
        const projectsInfo = await Promise.all(projects.map(async (project) => {
            const projectId = project.project_id;

            const created_by = await db.users.findOne({
                where: {
                    user_id: project.created_by
                }
            });

            const num_testcases = await db.test_cases.count({
                where: {
                    project_id: projectId
                }
            });

            const num_testruns = await db.test_runs.count({
                where: {
                    project_id: projectId
                }
            });

            const num_issues = await db.issues.count({
                where: {
                    project_id: projectId
                }
            });

            return {
                id: projectId,
                name: project.name,
                created_by: created_by.name,
                created_on: project.created_date,
                num_testcases: num_testcases,
                num_testruns: num_testruns,
                num_issues: num_issues
            };
        }));

        //get all issues assign to me
        const userId = 1;
        const issues = await db.sequelize.query(
            'SELECT issues.description, issues.issue_id, users.name as user_name, issue_status.status, issues.created_date, projects.name as project_name, projects.project_id as project_id ' +
            'FROM issues , users, issue_status, projects ' +
            'WHERE issues.assigned_to = ? AND projects.project_id = issues.project_id AND issues.status_id = issue_status.issue_status_id AND issues.created_by = users.user_id ' + 
            'ORDER BY issues.issue_id',
            { replacements: [userId], type: db.sequelize.QueryTypes.SELECT }
        );

        res.locals.projects = projectsInfo;
        console.log(projectsInfo);
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