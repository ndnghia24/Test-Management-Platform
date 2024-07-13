const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testcase_testrun', {
    testcase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'test_cases',
        key: 'testcase_id'
      }
    },
    testrun_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'test_runs',
        key: 'testrun_id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'test_run_test_case_status',
        key: 'status_id'
      }
    }
  }, {
    sequelize,
    tableName: 'testcase_testrun',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "testcase_testrun_pkey",
        unique: true,
        fields: [
          { name: "testcase_id" },
          { name: "testrun_id" },
        ]
      },
    ]
  });
};
