'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsTo(models.Client, {foreignKey: "clientId"});
      Chat.belongsTo(models.Influencer, {foreignKey: "influencerId"});
      Chat.hasMany(models.Message, {foreignKey: "chatId"});
    }
  }
  Chat.init({
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
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
    
  });
  return Chat;
};