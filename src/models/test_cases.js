const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_cases', {
    testcase_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "test_cases_unique"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'modules',
        key: 'module_id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test_cases',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_cases_pkey",
        unique: true,
        fields: [
          { name: "testcase_id" },
        ]
      },
      {
        name: "test_cases_unique",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
