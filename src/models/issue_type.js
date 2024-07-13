const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue_type', {
    issue_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'issue_type',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "issue_type_pkey",
        unique: true,
        fields: [
          { name: "issue_type_id" },
        ]
      },
    ]
  });
};
