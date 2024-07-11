const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requirements', {
    requirement_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requirement_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'requirement_types',
        key: 'requirement_type_id'
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
    tableName: 'requirements',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "requirements_pkey",
        unique: true,
        fields: [
          { name: "requirement_id" },
        ]
      },
    ]
  });
};
