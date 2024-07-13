const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_case_requirement', {
    testcase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'test_cases',
        key: 'testcase_id'
      }
    },
    requirement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'requirements',
        key: 'requirement_id'
      }
    }
  }, {
    sequelize,
    tableName: 'test_case_requirement',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_case_requirement_pkey",
        unique: true,
        fields: [
          { name: "testcase_id" },
          { name: "requirement_id" },
        ]
      },
    ]
  });
};
