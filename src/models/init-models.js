var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _audit_log_entries = require("./audit_log_entries");
var _buckets = require("./buckets");
var _comment = require("./comment");
var _flow_state = require("./flow_state");
var _identities = require("./identities");
var _instances = require("./instances");
var _issue_priority = require("./issue_priority");
var _issue_status = require("./issue_status");
var _issue_type = require("./issue_type");
var _issues = require("./issues");
var _key = require("./key");
var _messages = require("./messages");
var _mfa_amr_claims = require("./mfa_amr_claims");
var _mfa_challenges = require("./mfa_challenges");
var _mfa_factors = require("./mfa_factors");
var _migrations = require("./migrations");
var _modules = require("./modules");
var _objects = require("./objects");
var _one_time_tokens = require("./one_time_tokens");
var _projects = require("./projects");
var _refresh_tokens = require("./refresh_tokens");
var _releases = require("./releases");
var _requirement_types = require("./requirement_types");
var _requirements = require("./requirements");
var _role = require("./role");
var _s3_multipart_uploads = require("./s3_multipart_uploads");
var _s3_multipart_uploads_parts = require("./s3_multipart_uploads_parts");
var _saml_providers = require("./saml_providers");
var _saml_relay_states = require("./saml_relay_states");
var _schema_migrations = require("./schema_migrations");
var _schema_migrations = require("./schema_migrations");
var _secrets = require("./secrets");
var _sessions = require("./sessions");
var _sso_domains = require("./sso_domains");
var _sso_providers = require("./sso_providers");
var _subscription = require("./subscription");
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
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var audit_log_entries = _audit_log_entries(sequelize, DataTypes);
  var buckets = _buckets(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var flow_state = _flow_state(sequelize, DataTypes);
  var identities = _identities(sequelize, DataTypes);
  var instances = _instances(sequelize, DataTypes);
  var issue_priority = _issue_priority(sequelize, DataTypes);
  var issue_status = _issue_status(sequelize, DataTypes);
  var issue_type = _issue_type(sequelize, DataTypes);
  var issues = _issues(sequelize, DataTypes);
  var key = _key(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var mfa_amr_claims = _mfa_amr_claims(sequelize, DataTypes);
  var mfa_challenges = _mfa_challenges(sequelize, DataTypes);
  var mfa_factors = _mfa_factors(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var objects = _objects(sequelize, DataTypes);
  var one_time_tokens = _one_time_tokens(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var refresh_tokens = _refresh_tokens(sequelize, DataTypes);
  var releases = _releases(sequelize, DataTypes);
  var requirement_types = _requirement_types(sequelize, DataTypes);
  var requirements = _requirements(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var s3_multipart_uploads = _s3_multipart_uploads(sequelize, DataTypes);
  var s3_multipart_uploads_parts = _s3_multipart_uploads_parts(sequelize, DataTypes);
  var saml_providers = _saml_providers(sequelize, DataTypes);
  var saml_relay_states = _saml_relay_states(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var secrets = _secrets(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var sso_domains = _sso_domains(sequelize, DataTypes);
  var sso_providers = _sso_providers(sequelize, DataTypes);
  var subscription = _subscription(sequelize, DataTypes);
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
  var users = _users(sequelize, DataTypes);

  projects.belongsToMany(users, { as: 'user_id_users', through: user_in_project, foreignKey: "project_id", otherKey: "user_id" });
  requirements.belongsToMany(test_cases, { as: 'testcase_id_test_cases_test_case_requirements', through: test_case_requirement, foreignKey: "requirement_id", otherKey: "testcase_id" });
  test_cases.belongsToMany(requirements, { as: 'requirement_id_requirements', through: test_case_requirement, foreignKey: "testcase_id", otherKey: "requirement_id" });
  test_cases.belongsToMany(test_cases, { as: 'testcase_id_test_cases', through: test_case_linking, foreignKey: "linking_testcase_id", otherKey: "testcase_id" });
  test_cases.belongsToMany(test_cases, { as: 'linking_testcase_id_test_cases', through: test_case_linking, foreignKey: "testcase_id", otherKey: "linking_testcase_id" });
  test_cases.belongsToMany(test_runs, { as: 'testrun_id_test_runs', through: testcase_testrun, foreignKey: "testcase_id", otherKey: "testrun_id" });
  test_runs.belongsToMany(test_cases, { as: 'testcase_id_test_cases_testcase_testruns', through: testcase_testrun, foreignKey: "testrun_id", otherKey: "testcase_id" });
  users.belongsToMany(projects, { as: 'project_id_projects', through: user_in_project, foreignKey: "user_id", otherKey: "project_id" });
  saml_relay_states.belongsTo(flow_state, { as: "flow_state", foreignKey: "flow_state_id"});
  flow_state.hasMany(saml_relay_states, { as: "saml_relay_states", foreignKey: "flow_state_id"});
  mfa_challenges.belongsTo(mfa_factors, { as: "factor", foreignKey: "factor_id"});
  mfa_factors.hasMany(mfa_challenges, { as: "mfa_challenges", foreignKey: "factor_id"});
  mfa_amr_claims.belongsTo(sessions, { as: "session", foreignKey: "session_id"});
  sessions.hasMany(mfa_amr_claims, { as: "mfa_amr_claims", foreignKey: "session_id"});
  refresh_tokens.belongsTo(sessions, { as: "session", foreignKey: "session_id"});
  sessions.hasMany(refresh_tokens, { as: "refresh_tokens", foreignKey: "session_id"});
  saml_providers.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(saml_providers, { as: "saml_providers", foreignKey: "sso_provider_id"});
  saml_relay_states.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(saml_relay_states, { as: "saml_relay_states", foreignKey: "sso_provider_id"});
  sso_domains.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(sso_domains, { as: "sso_domains", foreignKey: "sso_provider_id"});
  identities.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(identities, { as: "identities", foreignKey: "user_id"});
  mfa_factors.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(mfa_factors, { as: "mfa_factors", foreignKey: "user_id"});
  one_time_tokens.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(one_time_tokens, { as: "one_time_tokens", foreignKey: "user_id"});
  sessions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sessions, { as: "sessions", foreignKey: "user_id"});
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
  issues.belongsTo(testcase_testrun, { as: "test_case", foreignKey: "test_case_id"});
  testcase_testrun.hasMany(issues, { as: "issues", foreignKey: "test_case_id"});
  issues.belongsTo(testcase_testrun, { as: "test_run", foreignKey: "test_run_id"});
  testcase_testrun.hasMany(issues, { as: "test_run_issues", foreignKey: "test_run_id"});
  test_cases.belongsTo(user_in_project, { as: "created_by_user_in_project", foreignKey: "created_by"});
  user_in_project.hasMany(test_cases, { as: "test_cases", foreignKey: "created_by"});
  test_cases.belongsTo(user_in_project, { as: "project", foreignKey: "project_id"});
  user_in_project.hasMany(test_cases, { as: "project_test_cases", foreignKey: "project_id"});
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
  objects.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(objects, { as: "objects", foreignKey: "bucket_id"});
  s3_multipart_uploads.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(s3_multipart_uploads, { as: "s3_multipart_uploads", foreignKey: "bucket_id"});
  s3_multipart_uploads_parts.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(s3_multipart_uploads_parts, { as: "s3_multipart_uploads_parts", foreignKey: "bucket_id"});
  s3_multipart_uploads_parts.belongsTo(s3_multipart_uploads, { as: "upload", foreignKey: "upload_id"});
  s3_multipart_uploads.hasMany(s3_multipart_uploads_parts, { as: "s3_multipart_uploads_parts", foreignKey: "upload_id"});

  return {
    SequelizeMeta,
    audit_log_entries,
    buckets,
    comment,
    flow_state,
    identities,
    instances,
    issue_priority,
    issue_status,
    issue_type,
    issues,
    key,
    messages,
    mfa_amr_claims,
    mfa_challenges,
    mfa_factors,
    migrations,
    modules,
    objects,
    one_time_tokens,
    projects,
    refresh_tokens,
    releases,
    requirement_types,
    requirements,
    role,
    s3_multipart_uploads,
    s3_multipart_uploads_parts,
    saml_providers,
    saml_relay_states,
    schema_migrations,
    schema_migrations,
    secrets,
    sessions,
    sso_domains,
    sso_providers,
    subscription,
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
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
