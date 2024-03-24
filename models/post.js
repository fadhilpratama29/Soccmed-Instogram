'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.UserProfile)
      Post.hasMany(models.Comment)
    }
  }
  Post.init({
    caption: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'caption tidak boleh kosong'
        },
        notNull: {
          msg: 'caption tidak boleh kosong'
        },
        notContains: {
          args: 'kasar',
          msg: 'caption tidak bisa bahasa kasar'
        }
      }
    },
    totalLike: {
      type:DataTypes.INTEGER,
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageUrl tidak boleh kosong'
        },
        isURL: {
          args: false,
          msg: 'imageUrl harus berupa link'
        }
      }
    },
    UserProfileId: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Post',
    hooks:{
      beforeCreate(post,options){
        post.totalLike = 0
      }
    }
  });
  return Post;
};