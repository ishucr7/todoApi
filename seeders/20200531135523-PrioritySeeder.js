'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('priorities', [
            {
                'name': 'New'
            },
            {
                'name': 'In Progress'
            },
            {
                'name': 'Completed'
            },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('priorities', null, {});
  }
};
