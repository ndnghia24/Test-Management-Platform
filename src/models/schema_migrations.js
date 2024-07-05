const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schema_migrations', {
    version: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'schema_migrations',
    schema: 'auth',
    timestamps: false,
    indexes: [
      {
        name: "schema_migrations_pkey",
        unique: true,
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
};
