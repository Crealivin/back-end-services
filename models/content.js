'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.hasMany(models.Review, {foreignKey: "contentId"});
      Content.belongsTo(models.Influencer, {foreignKey: "influencerId"});
    }
  }
  Content.init({
    influencerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Influencer Id required'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title required'
        }
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Caption required'
        }
      }
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Photo required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};