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
      Post.belongsToMany(models.Bubble, {
        through: 'Bubblepost',
        as: 'bubbles',
        foreignKey: 'post_id',
        otherKey: 'bubble_id'
      })
    }
  };
  Post.init({
    user_id: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};