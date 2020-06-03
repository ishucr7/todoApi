'use strict';
const db = require('../app/models');
module.exports = {
    up: (queryInterface, Sequelize) => {
        // db.labels.sync({force:true});
        // db.labels.truncate();
        queryInterface.bulkDelete('labels', null, {});

        return queryInterface.bulkInsert('labels', [
            {
                name: 'Personal',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Work',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Shopping',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Others',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('labels', null, {});
  }
};
