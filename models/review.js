'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Client, {foreignKey: "clientId"});
      Review.belongsTo(models.Content, {foreignKey: "contentId"});
    }
  }
  Review.init({
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Client Id required'
        }
      }
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Content Id required'
        }
      }
    },
    satisfaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Satisfaction required'
        },
        isNumeric: {
          msg: 'Satisfaction must be numeric'
        },
        min: {
          args:[1],
          msg: 'Minimun value is 1'
        },
        max: {
          args: [5],
          msg: 'Maximum value is 5'
        }
      }
    },
    comentar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Comentar required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};