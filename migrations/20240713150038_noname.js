const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "SequelizeMeta", deps: []
 * createTable() => "issue_priority", deps: []
 * createTable() => "issue_status", deps: []
 * createTable() => "issue_type", deps: []
 * createTable() => "role", deps: []
 * createTable() => "test_run_test_case_status", deps: []
 * createTable() => "users", deps: []
 * createTable() => "projects", deps: [users]
 * createTable() => "issues", deps: [issue_priority, issue_status, issue_type, users, projects]
 * createTable() => "comment", deps: [issues, users]
 * createTable() => "modules", deps: [projects]
 * createTable() => "releases", deps: [projects, users]
 * createTable() => "requirement_types", deps: [projects]
 * createTable() => "requirements", deps: [requirement_types, projects]
 * createTable() => "test_cases", deps: [modules]
 * createTable() => "test_case_linking", deps: ["public"."test_cases", "public"."test_cases"]
 * createTable() => "test_case_requirement", deps: ["public"."test_cases", "public"."requirements"]
 * createTable() => "test_case_step", deps: [test_cases]
 * createTable() => "test_plans", deps: [releases, projects]
 * createTable() => "test_runs", deps: [users, users, releases, projects]
 * createTable() => "testcase_testrun", deps: ["public"."test_cases", "public"."test_runs", test_run_test_case_status]
 * createTable() => "user_in_project", deps: ["public"."users", "public"."projects", role]
 * addIndex(SequelizeMeta_pkey) => "SequelizeMeta"
 * addIndex(comment_pkey) => "comment"
 * addIndex(issue_priority_pkey) => "issue_priority"
 * addIndex(issue_status_pkey) => "issue_status"
 * addIndex(issue_type_pkey) => "issue_type"
 * addIndex(issues_pkey) => "issues"
 * addIndex(modules_pkey) => "modules"
 * addIndex(projects_pkey) => "projects"
 * addIndex(releases_pkey) => "releases"
 * addIndex(requirement_types_pkey) => "requirement_types"
 * addIndex(requirements_pkey) => "requirements"
 * addIndex(role_pkey) => "role"
 * addIndex(test_case_linking_pkey) => "test_case_linking"
 * addIndex(test_case_requirement_pkey) => "test_case_requirement"
 * addIndex(test_case_step_pkey) => "test_case_step"
 * addIndex(test_cases_pkey) => "test_cases"
 * addIndex(test_cases_unique) => "test_cases"
 * addIndex(test_plans_pkey) => "test_plans"
 * addIndex(test_plans_unique) => "test_plans"
 * addIndex(test_run_test_case_status_pkey) => "test_run_test_case_status"
 * addIndex(test_runs_pkey) => "test_runs"
 * addIndex(test_runs_unique) => "test_runs"
 * addIndex(testcase_testrun_pkey) => "testcase_testrun"
 * addIndex(user_in_project_pkey) => "user_in_project"
 * addIndex(users_pkey) => "users"
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2024-07-13T15:00:38.580Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "SequelizeMeta",
      {
        name: {
          type: Sequelize.STRING(255),
          field: "name",
          primaryKey: true,
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "issue_priority",
      {
        issue_priority_id: {
          type: Sequelize.INTEGER,
          field: "issue_priority_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        priority: {
          type: Sequelize.STRING(255),
          field: "priority",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "issue_status",
      {
        issue_status_id: {
          type: Sequelize.INTEGER,
          field: "issue_status_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        status: {
          type: Sequelize.STRING(255),
          field: "status",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "issue_type",
      {
        issue_type_id: {
          type: Sequelize.INTEGER,
          field: "issue_type_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        type: { type: Sequelize.STRING(255), field: "type", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "role",
      {
        role_id: {
          type: Sequelize.INTEGER,
          field: "role_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        role: { type: Sequelize.STRING(255), field: "role", allowNull: false },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_run_test_case_status",
      {
        status_id: {
          type: Sequelize.INTEGER,
          field: "status_id",
          primaryKey: true,
          allowNull: false,
        },
        status_name: {
          type: Sequelize.STRING(255),
          field: "status_name",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING(255),
          field: "email",
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          field: "password",
          allowNull: false,
        },
        avt_link: {
          type: Sequelize.STRING(255),
          field: "avt_link",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "projects",
      {
        project_id: {
          type: Sequelize.INTEGER,
          field: "project_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "created_by",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "issues",
      {
        issue_id: {
          type: Sequelize.INTEGER,
          field: "issue_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING(255),
          field: "title",
          allowNull: false,
        },
        priority_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "priority_id",
          references: { model: "issue_priority", key: "issue_priority_id" },
          allowNull: true,
        },
        status_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "status_id",
          references: { model: "issue_status", key: "issue_status_id" },
          allowNull: true,
        },
        issue_type_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "issue_type_id",
          references: { model: "issue_type", key: "issue_type_id" },
          allowNull: true,
        },
        test_case_id: {
          type: Sequelize.INTEGER,
          field: "test_case_id",
          allowNull: true,
        },
        test_run_id: {
          type: Sequelize.INTEGER,
          field: "test_run_id",
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "created_by",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        assigned_to: {
          type: Sequelize.INTEGER,
          field: "assigned_to",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "comment",
      {
        comment_id: {
          type: Sequelize.INTEGER,
          field: "comment_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        issue_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "issue_id",
          references: { model: "issues", key: "issue_id" },
          allowNull: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "user_id",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        content: { type: Sequelize.TEXT, field: "content", allowNull: false },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "modules",
      {
        module_id: {
          type: Sequelize.INTEGER,
          field: "module_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        root_module_id: {
          type: Sequelize.INTEGER,
          field: "root_module_id",
          allowNull: true,
        },
        level: { type: Sequelize.INTEGER, field: "level", allowNull: true },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "releases",
      {
        release_id: {
          type: Sequelize.INTEGER,
          field: "release_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        release_key: {
          type: Sequelize.STRING(255),
          field: "release_key",
          allowNull: false,
        },
        release_progress: {
          type: Sequelize.DOUBLE,
          field: "release_progress",
          allowNull: true,
        },
        release_status: {
          type: Sequelize.STRING(255),
          field: "release_status",
          allowNull: true,
        },
        start_date: {
          type: Sequelize.DATE,
          field: "start_date",
          allowNull: false,
        },
        due_date: { type: Sequelize.DATE, field: "due_date", allowNull: false },
        created_by: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "created_by",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "requirement_types",
      {
        requirement_type_id: {
          type: Sequelize.INTEGER,
          field: "requirement_type_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        release_id: {
          type: Sequelize.INTEGER,
          field: "release_id",
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "requirements",
      {
        requirement_id: {
          type: Sequelize.INTEGER,
          field: "requirement_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(255), field: "name", allowNull: false },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        attachments: {
          type: Sequelize.TEXT,
          field: "attachments",
          allowNull: true,
        },
        requirement_type_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "requirement_type_id",
          references: {
            model: "requirement_types",
            key: "requirement_type_id",
          },
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_cases",
      {
        testcase_id: {
          type: Sequelize.INTEGER,
          field: "testcase_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(255),
          field: "name",
          unique: "test_cases_unique",
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: false,
        },
        module_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "module_id",
          references: { model: "modules", key: "module_id" },
          allowNull: true,
        },
        created_by: {
          type: Sequelize.INTEGER,
          field: "created_by",
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          field: "project_id",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_case_linking",
      {
        testcase_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "test_case_linking_testcase_id_linking_testcase_id_unique",
          field: "testcase_id",
          references: {
            model: {
              tableName: "test_cases",
              table: "test_cases",
              name: "test_cases",
              schema: "public",
              delimiter: ".",
            },
            key: "testcase_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        linking_testcase_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "test_case_linking_testcase_id_linking_testcase_id_unique",
          field: "linking_testcase_id",
          references: {
            model: {
              tableName: "test_cases",
              table: "test_cases",
              name: "test_cases",
              schema: "public",
              delimiter: ".",
            },
            key: "testcase_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_case_requirement",
      {
        testcase_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "test_case_requirement_testcase_id_requirement_id_unique",
          field: "testcase_id",
          references: {
            model: {
              tableName: "test_cases",
              table: "test_cases",
              name: "test_cases",
              schema: "public",
              delimiter: ".",
            },
            key: "testcase_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        requirement_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "test_case_requirement_testcase_id_requirement_id_unique",
          field: "requirement_id",
          references: {
            model: {
              tableName: "requirements",
              table: "requirements",
              name: "requirements",
              schema: "public",
              delimiter: ".",
            },
            key: "requirement_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_case_step",
      {
        testcase_step_id: {
          type: Sequelize.INTEGER,
          field: "testcase_step_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        testcase_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "testcase_id",
          references: { model: "test_cases", key: "testcase_id" },
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: false,
        },
        expected_result: {
          type: Sequelize.TEXT,
          field: "expected_result",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_plans",
      {
        testplan_id: {
          type: Sequelize.INTEGER,
          field: "testplan_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(255),
          field: "name",
          unique: "test_plans_unique",
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: false,
        },
        release: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "release",
          references: { model: "releases", key: "release_id" },
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "test_runs",
      {
        testrun_id: {
          type: Sequelize.INTEGER,
          field: "testrun_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        created_by: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "created_by",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        assigned_to: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "assigned_to",
          references: { model: "users", key: "user_id" },
          allowNull: true,
        },
        testrun_title: {
          type: Sequelize.STRING(255),
          field: "testrun_title",
          unique: "test_runs_unique",
          allowNull: false,
        },
        testrun_status: {
          type: Sequelize.STRING(255),
          field: "testrun_status",
          defaultValue: "Not Started",
          allowNull: true,
        },
        testcase_quantity: {
          type: Sequelize.INTEGER,
          field: "testcase_quantity",
          allowNull: false,
        },
        release: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "release",
          references: { model: "releases", key: "release_id" },
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "project_id",
          references: { model: "projects", key: "project_id" },
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "testcase_testrun",
      {
        testcase_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "testcase_testrun_testrun_id_testcase_id_unique",
          field: "testcase_id",
          references: {
            model: {
              tableName: "test_cases",
              table: "test_cases",
              name: "test_cases",
              schema: "public",
              delimiter: ".",
            },
            key: "testcase_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        testrun_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "testcase_testrun_testrun_id_testcase_id_unique",
          field: "testrun_id",
          references: {
            model: {
              tableName: "test_runs",
              table: "test_runs",
              name: "test_runs",
              schema: "public",
              delimiter: ".",
            },
            key: "testrun_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        status_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "status_id",
          references: { model: "test_run_test_case_status", key: "status_id" },
          defaultValue: 1,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_in_project",
      {
        user_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "user_in_project_user_id_project_id_unique",
          field: "user_id",
          references: {
            model: {
              tableName: "users",
              table: "users",
              name: "users",
              schema: "public",
              delimiter: ".",
            },
            key: "user_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        project_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "user_in_project_user_id_project_id_unique",
          field: "project_id",
          references: {
            model: {
              tableName: "projects",
              table: "projects",
              name: "projects",
              schema: "public",
              delimiter: ".",
            },
            key: "project_id",
          },
          primaryKey: true,
          allowNull: false,
        },
        role_id: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          field: "role_id",
          references: { model: "role", key: "role_id" },
          allowNull: false,
        },
        is_delete: {
          type: Sequelize.BOOLEAN,
          field: "is_delete",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["SequelizeMeta", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["comment", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["issue_priority", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["issue_status", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["issue_type", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["issues", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["modules", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["projects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["releases", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["requirement_types", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["requirements", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["role", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_case_linking", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_case_requirement", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_case_step", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_cases", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_plans", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_run_test_case_status", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["test_runs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["testcase_testrun", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_in_project", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
