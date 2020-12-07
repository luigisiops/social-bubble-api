'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post, {forgeinKey: "UserId"})
      models.Bubble.hasMany(models.BubbleUser, {onDelete: 'cascade', hooks:true})
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_status: DataTypes.STRING,
    status_start_time: DataTypes.DATE,
    img_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};