'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'BubbleUsers',
      'owner',
     Sequelize.BOOLEAN
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'BubbleUsers',
      'owner'
    )
  }
};
