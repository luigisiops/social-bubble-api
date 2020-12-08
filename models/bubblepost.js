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
      models.Bubblepost.belongsTo(models.Post)
      models.Bubblepost.belongsTo(models.Bubble)
    }
  };
  Bubblepost.init({
    PostId: DataTypes.INTEGER,
    BubbleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bubblepost',
  });
  return Bubblepost;
};