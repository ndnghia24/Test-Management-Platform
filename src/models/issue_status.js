const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue_status', {
    issue_status_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'issue_status',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "issue_status_pkey",
        unique: true,
        fields: [
          { name: "issue_status_id" },
        ]
      },
    ]
  });
};
