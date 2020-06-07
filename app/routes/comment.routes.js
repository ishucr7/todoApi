const { authJwt } = require('../middlewares');
module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/", comments.create);
  
    // Update a comment with id
    router.put("/:id", comments.update);    
    
    // Get all comments for a task
    app.get("/api/task/:id/comments", comments.getAll);    

    // Delete a comment with id
    router.delete("/:id", comments.destroy);    

    app.use('/api/comments', [authJwt.verifyToken]);
    app.use('/api/comments', router);

  };