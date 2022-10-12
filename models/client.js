'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name required'
        },
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Contact Number already used!'
      },
      validate: {
        notNull: {
          msg: 'Contact Number required'
        },
        isNumeric: {
          msg: 'Contact Number must be numeric'
        },
        len: [10,13]
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address required'
        }
      }
    },
    bio: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'email already used!'
      },
      validate: {
        notNull: {
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Email invalid!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password required',
        },
        len: [8,16]
      }
    },
    bankCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Bank Code required'
        },
        isNumeric: {
          msg: 'Bank Code must be numeric'
        },
        len: [3]
      }
    },
    bankNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Bank Number already used!'
      },
      validate: {
        notNull: {
          msg: 'Bank Number required'
        },
        isNumeric: {
          msg: 'Bank Number must be numeric'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};