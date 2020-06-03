'use strict';
var bcrypt = require("bcryptjs");
module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('tasks', null, {});
        return queryInterface.bulkInsert('tasks', [
            {
                title: 'dummy task',
                description: 'Get your ass back here',
                user_id: 1,
                label_id: 1,
                status_id: 2,
                priority_id: 3,
                due_date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tasks', null, {});
    }
};
