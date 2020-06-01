'use strict';
const db = require('../app/models');

module.exports = {
    up: (queryInterface, Sequelize) => {
        // db.statuses.sync({force:true});
        // db.statuses.truncate();
        queryInterface.bulkDelete('statuses', null, {});
        return queryInterface.bulkInsert('statuses', [
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
      return queryInterface.bulkDelete('statuses', null, {});
  }
};
