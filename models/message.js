'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Client, {foreignKey: "clientId"});
      Message.belongsTo(models.Influencer, {foreignKey: "influencerId"});
      Message.belongsTo(models.Chat, {foreignKey: "chatId"});
    }
  }
  Message.init({
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Client Id required'
        }
      }
    },
    influencerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Influencer Id required'
        }
      }
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Chat Id required'
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Message required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};