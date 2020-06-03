const { authJwt } = require('../middlewares');
module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new task
    router.post("/", tasks.create);
  
    // Retrieve all tasks
    router.get("/", tasks.findAll);
    
    // Retrieve a single task with id
    router.get("/:id", tasks.findOne);
  
    // Update a task with id
    router.put("/:id", tasks.update);
  
    // Delete a task with id
    router.delete("/:id", tasks.destroy);

    // Retrieve all tasks belonging to a team
    app.get("/api/user/tasks/team", tasks.findByTeam);
    
    app.use('/api/user/tasks', [authJwt.verifyToken]);
    app.use('/api/user/tasks', router);

  };