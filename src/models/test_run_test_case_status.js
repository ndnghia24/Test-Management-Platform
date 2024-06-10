const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_run_test_case_status', {
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test_run_test_case_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "test_run_status_pk",
        unique: true,
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
};
