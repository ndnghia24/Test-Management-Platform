const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    extension: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    inserted_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'realtime',
    timestamps: true,
    indexes: [
      {
        name: "messages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "messages_topic_index",
        fields: [
          { name: "topic" },
        ]
      },
    ]
  });
};
