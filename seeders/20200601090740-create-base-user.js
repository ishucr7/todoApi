'use strict';
var bcrypt = require("bcryptjs");
const db = require('../app/models');

module.exports = {
    up: (queryInterface, Sequelize) => {


        // db.user.sync({force:true});

        queryInterface.bulkDelete('users', null, {});
        return queryInterface.bulkInsert('users', [
            {
                name: 'dummy_user',
                email: 'dummy@todo.com',
                password: bcrypt.hashSync('dummy', 8),
                role_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'admin',
                email: 'admin@todo.com',
                role_id: 2,
                password: bcrypt.hashSync('admin', 8),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
