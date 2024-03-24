'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username tidak boleh kosong'
        },
        notNull: {
          msg: 'username tidak boleh kosong'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email tidak boleh kosong'
        },
        notNull: {
          msg: 'email tidak boleh kosong'
        },
        isEmail: {
          args: true,
          msg: 'harus memasukan email'
        },
      }
    },
    password: {
      type:DataTypes.STRING,
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password tidak boleh kosong'
        },
        notNull: {
          msg: 'password tidak boleh kosong'
        },
        min: {
          args: 8,
          msg: 'password minimal 8 huruf'
        },
        isAlphanumeric: {
          args: true,
          msg: 'password minimal 1 angka dan 1 huruf'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash
  })
  return User;
};