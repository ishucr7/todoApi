const { authJwt } = require('../middlewares');
module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/", comments.create);
  
    // Update a comment with id
    router.put("/:id", comments.update);    
    
    // Get all comments for a task
    router.get("/:id", comments.getAll);    

    app.use('/api/user/comments', [authJwt.verifyToken]);
    app.use('/api/user/comments', router);

  };