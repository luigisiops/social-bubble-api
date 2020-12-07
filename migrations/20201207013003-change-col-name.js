'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Posts', 'user_id', 'UserId')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Posts', 'UserId', 'user_id')
  }
};
