'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Endorse, {foreignKey: "endorseId"});
    }
  }
  Payment.init({
    endorseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Endorse Id required'
        }
      }
    },
    paymentAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Payment Amount required'
        },
        isNumeric: {
          msg: 'Payment Amount must be numeric'
        },
        min: {
          args: [0],
          msg: "Minimum price is 0"
        },
        max: {
          args:[50000000],
          msg: "Maximum price is 50000000"
        }
      }
    },
    expiredDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Expired Date required'
        },
        isDate: {
          msg: 'Expired Date Invalid!'
        }
      }
    },
    paymentDate: {
      type: DataTypes.DATE,
      validate:{
        isNull: {
          msg: 'Payment Date must be null'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};