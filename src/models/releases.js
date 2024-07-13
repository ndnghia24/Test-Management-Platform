const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('releases', {
    release_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'project_id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    release_key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    release_progress: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    release_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'releases',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "releases_pkey",
        unique: true,
        fields: [
          { name: "release_id" },
        ]
      },
    ]
  });
};
