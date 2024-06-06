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
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "New"
    }
  }, {
    sequelize,
    tableName: 'testcase_testrun',
    schema: 'public',
    timestamps: false,
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
