const { authJwt } = require('../middlewares');
module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    const email = require("../controllers/email.controller.js");
  
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
    app.get("/api/teams/:id/tasks", [authJwt.verifyToken], tasks.findByTeam);

    // Search task by title
    app.get("/api/user/tasks/search", [authJwt.verifyToken], tasks.findByTitle);
    
    // app.post("/api/email", email.send);
    // app.get("/api/task", tasks.sendReminder);

    app.use('/api/user/tasks', [authJwt.verifyToken]);
    // app.use('/api/user/tasks' );
    app.use('/api/user/tasks', router);

    //  Remove users from all routes api/tasks/

  };