const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue_priority', {
    issue_priority_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    priority: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'issue_priority',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "issue_priority_pkey",
        unique: true,
        fields: [
          { name: "issue_priority_id" },
        ]
      },
    ]
  });
};
