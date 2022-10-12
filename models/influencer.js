'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Influencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Influencer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name required'
        }
      }
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender required'
        },
        len: [1]
      }
    },
    dateofBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Date of Birth required'
        },
        isDate: {
          msg: 'Date of Birth invalid!'
        }
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Contact Number required'
        },
        isNumeric: {
          msg: 'Contact Number must be numeric'
        },
        len: [10,13]
      }
    },
    socialMediaLink: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Social Media Link required'
        },
        isUrl: {
          msg: 'Social Media Link invalid!'
        }
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
    idCard: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Id Card required'
        },
        isNumeric: {
          msg: 'Id Card must be numeric'
        },
        len: [15,17]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already used!'
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
          msg: 'Password required'
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
    modelName: 'Influencer',
  });
  return Influencer;
};