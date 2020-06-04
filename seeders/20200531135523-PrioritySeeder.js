'use strict';
const db = require('../app/models');

module.exports = {
    up: (queryInterface, Sequelize) => {
        // db.priorities.sync({force:true});
        // db.priorities.truncate();
        queryInterface.bulkDelete('priorities', null, {});
        return queryInterface.bulkInsert('priorities', [
            {
                name: 'Low',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Medium',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'High',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('priorities', null, {});
  }
};
