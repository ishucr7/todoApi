'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('labels', [
            {
                'name': 'Personal'
            },
            {
                'name': 'Work'
            },
            {
                'name': 'Shopping'
            },
            {
                'name': 'Others'
            },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('labels', null, {});
  }
};
