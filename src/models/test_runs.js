const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_runs', {
    testrun_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    testrun_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "test_runs_unique"
    },
    testrun_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Not Started"
    },
    testcase_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    release: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'releases',
        key: 'release_id'
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test_runs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_runs_pkey",
        unique: true,
        fields: [
          { name: "testrun_id" },
        ]
      },
      {
        name: "test_runs_unique",
        unique: true,
        fields: [
          { name: "testrun_title" },
        ]
      },
    ]
  });
};
