const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.labels = require("./label.model.js")(sequelize, Sequelize);
db.statuses = require("./status.model.js")(sequelize, Sequelize);
db.priorities = require("./priority.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize, db.role);
db.tasks = require("./task.model.js")(sequelize, Sequelize, db.labels,
    db.priorities, db.statuses, db.user);

db.ROLES = ["user", "admin"];

module.exports = db;