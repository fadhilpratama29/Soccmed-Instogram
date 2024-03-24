'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
      UserProfile.hasMany(models.Post)
    }

    get fullName(){
      return this.firstName+" "+this.lastName
    }
  }
  UserProfile.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'first name tidak boleh kosong'
        },
        notNull: {
          msg: 'first name harus berupa link'
        },
        isAlpha: {
          args: true,
          msg: 'first name harus berupa huruf'
        }
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'last name tidak boleh kosong'
        },
        notNull: {
          msg: 'last name harus berupa link'
        },
        isAlpha: {
          args: true,
          msg: 'last name harus berupa huruf'
        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'first name tidak boleh kosong'
        },
        notNull: {
          msg: 'first name harus berupa link'
        },
        isIn: {
          args: [['Male', 'Female']],
          msg: 'gender tidak diterima'
        }
      }
    },
    phoneNumber: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'first name tidak boleh kosong'
        },
        notNull: {
          msg: 'first name harus berupa link'
        },
        isNumeric: {
          args: true,
          msg: 'phoneNumber harus berupa huruf'
        },
        len: {
          args: [8,12],  
          msg: 'phoneNumber berjumlah 8-12 angka'
        }   
      }
    },
    UserId: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
    hooks: {
      beforeCreate: function(userprofile) {
        userprofile.firstName = userprofile.firstName.charAt(0).toUpperCase() + userprofile.firstName.slice(1);
        userprofile.lastName = userprofile.lastName.charAt(0).toUpperCase() + userprofile.lastName.slice(1);
      }
    }
  });
  return UserProfile;
};