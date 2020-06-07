const { authJwt } = require('../middlewares');
module.exports = app => {
    const teams = require("../controllers/team.controller.js");
  
    var router = require("express").Router();
  
    // Create a new team
    router.post("/", teams.create);
  
    // Get all teams for a user
    router.get("/", teams.getAll);    
    
    // Get the details of a team
    router.get("/:id", teams.getTeam);   

    // Delete a team with id
    router.delete("/:id", teams.destroy);

    app.use('/api/teams', [authJwt.verifyToken]);
    app.use('/api/teams', router);

  };