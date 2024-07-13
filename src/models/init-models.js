var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _comment = require("./comment");
var _issue_priority = require("./issue_priority");
var _issue_status = require("./issue_status");
var _issue_type = require("./issue_type");
var _issues = require("./issues");
var _modules = require("./modules");
var _projects = require("./projects");
var _releases = require("./releases");
var _requirement_types = require("./requirement_types");
var _requirements = require("./requirements");
var _role = require("./role");
var _test_case_linking = require("./test_case_linking");
var _test_case_requirement = require("./test_case_requirement");
var _test_case_step = require("./test_case_step");
var _test_cases = require("./test_cases");
var _test_plans = require("./test_plans");
var _test_run_test_case_status = require("./test_run_test_case_status");
var _test_runs = require("./test_runs");
var _testcase_testrun = require("./testcase_testrun");
var _user_in_project = require("./user_in_project");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var issue_priority = _issue_priority(sequelize, DataTypes);
  var issue_status = _issue_status(sequelize, DataTypes);
  var issue_type = _issue_type(sequelize, DataTypes);
  var issues = _issues(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var releases = _releases(sequelize, DataTypes);
  var requirement_types = _requirement_types(sequelize, DataTypes);
  var requirements = _requirements(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var test_case_linking = _test_case_linking(sequelize, DataTypes);
  var test_case_requirement = _test_case_requirement(sequelize, DataTypes);
  var test_case_step = _test_case_step(sequelize, DataTypes);
  var test_cases = _test_cases(sequelize, DataTypes);
  var test_plans = _test_plans(sequelize, DataTypes);
  var test_run_test_case_status = _test_run_test_case_status(sequelize, DataTypes);
  var test_runs = _test_runs(sequelize, DataTypes);
  var testcase_testrun = _testcase_testrun(sequelize, DataTypes);
  var user_in_project = _user_in_project(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  projects.belongsToMany(users, { as: 'user_id_users', through: user_in_project, foreignKey: "project_id", otherKey: "user_id" });
  requirements.belongsToMany(test_cases, { as: 'testcase_id_test_cases_test_case_requirements', through: test_case_requirement, foreignKey: "requirement_id", otherKey: "testcase_id" });
  test_cases.belongsToMany(requirements, { as: 'requirement_id_requirements', through: test_case_requirement, foreignKey: "testcase_id", otherKey: "requirement_id" });
  test_cases.belongsToMany(test_cases, { as: 'testcase_id_test_cases', through: test_case_linking, foreignKey: "linking_testcase_id", otherKey: "testcase_id" });
  test_cases.belongsToMany(test_cases, { as: 'linking_testcase_id_test_cases', through: test_case_linking, foreignKey: "testcase_id", otherKey: "linking_testcase_id" });
  test_cases.belongsToMany(test_runs, { as: 'testrun_id_test_runs', through: testcase_testrun, foreignKey: "testcase_id", otherKey: "testrun_id" });
  test_runs.belongsToMany(test_cases, { as: 'testcase_id_test_cases_testcase_testruns', through: testcase_testrun, foreignKey: "testrun_id", otherKey: "testcase_id" });
  users.belongsToMany(projects, { as: 'project_id_projects', through: user_in_project, foreignKey: "user_id", otherKey: "project_id" });
  issues.belongsTo(issue_priority, { as: "priority", foreignKey: "priority_id"});
  issue_priority.hasMany(issues, { as: "issues", foreignKey: "priority_id"});
  issues.belongsTo(issue_status, { as: "status", foreignKey: "status_id"});
  issue_status.hasMany(issues, { as: "issues", foreignKey: "status_id"});
  issues.belongsTo(issue_type, { as: "issue_type", foreignKey: "issue_type_id"});
  issue_type.hasMany(issues, { as: "issues", foreignKey: "issue_type_id"});
  comment.belongsTo(issues, { as: "issue", foreignKey: "issue_id"});
  issues.hasMany(comment, { as: "comments", foreignKey: "issue_id"});
  test_cases.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasMany(test_cases, { as: "test_cases", foreignKey: "module_id"});
  issues.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(issues, { as: "issues", foreignKey: "project_id"});
  modules.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(modules, { as: "modules", foreignKey: "project_id"});
  releases.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(releases, { as: "releases", foreignKey: "project_id"});
  requirement_types.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(requirement_types, { as: "requirement_types", foreignKey: "project_id"});
  requirements.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(requirements, { as: "requirements", foreignKey: "project_id"});
  test_plans.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(test_plans, { as: "test_plans", foreignKey: "project_id"});
  test_runs.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(test_runs, { as: "test_runs", foreignKey: "project_id"});
  user_in_project.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(user_in_project, { as: "user_in_projects", foreignKey: "project_id"});
  test_plans.belongsTo(releases, { as: "release_release", foreignKey: "release"});
  releases.hasMany(test_plans, { as: "test_plans", foreignKey: "release"});
  test_runs.belongsTo(releases, { as: "release_release", foreignKey: "release"});
  releases.hasMany(test_runs, { as: "test_runs", foreignKey: "release"});
  requirements.belongsTo(requirement_types, { as: "requirement_type", foreignKey: "requirement_type_id"});
  requirement_types.hasMany(requirements, { as: "requirements", foreignKey: "requirement_type_id"});
  test_case_requirement.belongsTo(requirements, { as: "requirement", foreignKey: "requirement_id"});
  requirements.hasMany(test_case_requirement, { as: "test_case_requirements", foreignKey: "requirement_id"});
  user_in_project.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(user_in_project, { as: "user_in_projects", foreignKey: "role_id"});
  test_case_linking.belongsTo(test_cases, { as: "linking_testcase", foreignKey: "linking_testcase_id"});
  test_cases.hasMany(test_case_linking, { as: "test_case_linkings", foreignKey: "linking_testcase_id"});
  test_case_linking.belongsTo(test_cases, { as: "testcase", foreignKey: "testcase_id"});
  test_cases.hasMany(test_case_linking, { as: "testcase_test_case_linkings", foreignKey: "testcase_id"});
  test_case_requirement.belongsTo(test_cases, { as: "testcase", foreignKey: "testcase_id"});
  test_cases.hasMany(test_case_requirement, { as: "test_case_requirements", foreignKey: "testcase_id"});
  test_case_step.belongsTo(test_cases, { as: "testcase", foreignKey: "testcase_id"});
  test_cases.hasMany(test_case_step, { as: "test_case_steps", foreignKey: "testcase_id"});
  testcase_testrun.belongsTo(test_cases, { as: "testcase", foreignKey: "testcase_id"});
  test_cases.hasMany(testcase_testrun, { as: "testcase_testruns", foreignKey: "testcase_id"});
  testcase_testrun.belongsTo(test_run_test_case_status, { as: "status", foreignKey: "status_id"});
  test_run_test_case_status.hasMany(testcase_testrun, { as: "testcase_testruns", foreignKey: "status_id"});
  testcase_testrun.belongsTo(test_runs, { as: "testrun", foreignKey: "testrun_id"});
  test_runs.hasMany(testcase_testrun, { as: "testcase_testruns", foreignKey: "testrun_id"});
  comment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  issues.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(issues, { as: "issues", foreignKey: "created_by"});
  projects.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(projects, { as: "projects", foreignKey: "created_by"});
  releases.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(releases, { as: "releases", foreignKey: "created_by"});
  test_runs.belongsTo(users, { as: "assigned_to_user", foreignKey: "assigned_to"});
  users.hasMany(test_runs, { as: "test_runs", foreignKey: "assigned_to"});
  test_runs.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(test_runs, { as: "created_by_test_runs", foreignKey: "created_by"});
  user_in_project.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_in_project, { as: "user_in_projects", foreignKey: "user_id"});

  return {
    SequelizeMeta,
    comment,
    issue_priority,
    issue_status,
    issue_type,
    issues,
    modules,
    projects,
    releases,
    requirement_types,
    requirements,
    role,
    test_case_linking,
    test_case_requirement,
    test_case_step,
    test_cases,
    test_plans,
    test_run_test_case_status,
    test_runs,
    testcase_testrun,
    user_in_project,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
