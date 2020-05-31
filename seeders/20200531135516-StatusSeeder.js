'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('statuses', [
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
      return queryInterface.bulkDelete('statuses', null, {});
  }
};
