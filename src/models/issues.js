const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issues', {
    issue_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    priority_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'issue_priority',
        key: 'issue_priority_id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'issue_status',
        key: 'issue_status_id'
      }
    },
    issue_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'issue_type',
        key: 'issue_type_id'
      }
    },
    test_case_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'testcase_testrun',
        key: 'testrun_id'
      }
    },
    test_run_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'testcase_testrun',
        key: 'testrun_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'issues',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "issues_pkey",
        unique: true,
        fields: [
          { name: "issue_id" },
        ]
      },
    ]
  });
};
