const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_in_project', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: "user_in_project_user_id_project_id_role_id_key"
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'project_id'
      },
      unique: "user_in_project_user_id_project_id_role_id_key"
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'role_id'
      },
      unique: "user_in_project_user_id_project_id_role_id_key"
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_in_project',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_in_project_pk",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "project_id" },
        ]
      },
      {
        name: "user_in_project_user_id_project_id_role_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "project_id" },
          { name: "role_id" },
        ]
      },
    ]
  });
};
