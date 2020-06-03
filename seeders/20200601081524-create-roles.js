'use strict';
const db = require('../app/models');
module.exports = {
    up: (queryInterface, Sequelize) => {

        // db.role.sync({force:true});
        // db.priorities.truncate();
        queryInterface.bulkDelete('roles', null, {});
        return queryInterface.bulkInsert('roles', [
            {
                name: 'admin',
                id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'user',
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});

        // db.role.sync({force:true});

        // // queryInterface.bulkDelete('roles', null, {});

        // return queryInterface.bulkInsert('roles', [
        //     {
        //         name: 'user',
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     },
        //     {
        //         name: 'admin',
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     },
        // ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
