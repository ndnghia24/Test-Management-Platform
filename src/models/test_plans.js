const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_plans', {
    testplan_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "test_plans_unique"
    },
    description: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    tableName: 'test_plans',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "test_plans_pkey",
        unique: true,
        fields: [
          { name: "testplan_id" },
        ]
      },
      {
        name: "test_plans_unique",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
