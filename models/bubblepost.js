'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bubblepost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bubblepost.init({
    post_id: DataTypes.INTEGER,
    bubble_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bubblepost',
  });
  return Bubblepost;
};