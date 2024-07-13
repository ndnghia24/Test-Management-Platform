const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_case_linking', {
    testcase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'test_cases',
        key: 'testcase_id'
      }
    },
    linking_testcase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'test_cases',
        key: 'testcase_id'
      }
    }
  }, {
    sequelize,
    tableName: 'test_case_linking',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_case_linking_pkey",
        unique: true,
        fields: [
          { name: "testcase_id" },
          { name: "linking_testcase_id" },
        ]
      },
    ]
  });
};
