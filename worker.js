require('dotenv').config();

const taskController = require("./app/controllers/task.controller.js");
taskController.sendReminder();
