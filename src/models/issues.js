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
      allowNull: true
    },
    test_run_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'project_id'
      }
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'issues',
    schema: 'public',
    timestamps: true,
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
