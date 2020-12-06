'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BubbleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {   
      models.BubbleUser.belongsTo(models.Bubble)
    }
  };
  BubbleUser.init({
    UserId: DataTypes.INTEGER,
    BubbleId: DataTypes.INTEGER,
    isAccepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BubbleUser',
  });
  return BubbleUser;
};