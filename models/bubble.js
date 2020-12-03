'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bubble extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bubble.belongsToMany(models.User, {
        through: 'BubbleUsers',
        as: 'users',
        foreignKey: 'bubble',
        otherKey: 'user'
      }),
      Bubble.belongsToMany(models.Post, {
        through: 'Bubblepost',
        as: 'posts',
        foreignKey: 'bubble_id',
        otherKey: 'post_id'
      })
    }
  };
  Bubble.init({
    title: DataTypes.STRING,
    bubble_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bubble',
  });
  return Bubble;
};