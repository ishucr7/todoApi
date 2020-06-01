'use strict';
const db = require('../app/models');

module.exports = {
    up: (queryInterface, Sequelize) => {
        // db.priorities.sync({force:true});
        // db.priorities.truncate();
        queryInterface.bulkDelete('priorities', null, {});
        return queryInterface.bulkInsert('priorities', [
            {
                name: 'New',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'In Progress',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Completed',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('priorities', null, {});
  }
};
