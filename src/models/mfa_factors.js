const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mfa_factors', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    friendly_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    factor_type: {
      type: DataTypes.ENUM("totp","webauthn"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("unverified","verified"),
      allowNull: false
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mfa_factors',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "factor_id_created_at_idx",
        fields: [
          { name: "user_id" },
          { name: "created_at" },
        ]
      },
      {
        name: "mfa_factors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "mfa_factors_user_friendly_name_unique",
        unique: true,
        fields: [
          { name: "friendly_name" },
          { name: "user_id" },
        ]
      },
      {
        name: "mfa_factors_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
