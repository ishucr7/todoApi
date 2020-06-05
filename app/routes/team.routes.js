const { authJwt } = require('../middlewares');
module.exports = app => {
    const teams = require("../controllers/team.controller.js");
  
    var router = require("express").Router();
  
    // Create a new team
    router.post("/", teams.create);
  
    // Get all teams for a user
    router.get("/", teams.getAll);    
    router.get("/:id", teams.getTeam);   


    app.use('/api/user/teams', [authJwt.verifyToken]);
    app.use('/api/user/teams', router);

  };