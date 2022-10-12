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
      // define association here
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