const controller = {};
const { where } = require('sequelize');
const db = require('../../models/index');
const { raw } = require('express');

controller.getHomePage = async (req, res) => {
  console.log('getHomePage');
  try {
    const projects = await db.projects.findAll();

    //get information for each project
    const projectsInfo = await Promise.all(projects.map(async (project) => {
      const projectId = project.id;
        
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
    const issues = await db.issues.findAll({
      where: {
        assigned_to: userId
      }
    });

    res.locals.projects = projectsInfo;
    res.locals.issues = issues;
    res.render("homepage", { layout: false });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = controller;