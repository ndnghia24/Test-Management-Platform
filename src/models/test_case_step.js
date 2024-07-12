const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_case_step', {
    testcase_step_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    testcase_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'test_cases',
        key: 'testcase_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expected_result: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'test_case_step',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "test_case_step_pkey",
        unique: true,
        fields: [
          { name: "testcase_step_id" },
        ]
      },
    ]
  });
};
