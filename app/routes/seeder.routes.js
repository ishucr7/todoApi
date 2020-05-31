module.exports = app => {
    const seeders = require("../controllers/seeder.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all
    router.get("/statuses", seeders.findAllStatuses);

    // Retrieve all
    router.get("/priorities", seeders.findAllStatuses);

    // Retrieve all
    router.get("/labels", seeders.findAllStatuses);

    app.use("/api", router)
};