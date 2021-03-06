const db = require("../models");
const CommentController = require("./comment.controller");
const emailController = require("./email.controller");
const Task = db.tasks;
const Label = db.labels;
const Status = db.statuses;
const Priority = db.priorities;
const Team = db.teams;
const Team_User = db.team_user;
const User = db.user;
const Comment = db.comments;
const sequelize = db.sequelize;

const Op = db.Sequelize.Op;

async function create(req, res){
    const data = req.body;
    data.user_id = req.user_id;
    const data_task = {
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        status_id: data.status_id,
        label_id: data.label_id,
        priority_id: data.priority_id,
        due_date: data.due_date,
        deletedAt: null,  
        team_id: data.team_id,
        assignee_id: data.assignee_id          
    };
    
    try{
        task = await Task.create(data_task);

        if(data.assignee_id) {
            user = await User.findByPk(data.assignee_id);
            emailController.sendEmail(user, task);
        }

        res.send(task);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findAll(req, res){

    const data = req.body;
    try{
        tasks = await Task.findAll({
            where : {
                user_id: req.user_id,
            }
        });

        labels = await Label.findAll();
        label_map = {};
        for(var i=0; i < labels.length; i++) {
            id = labels[i].dataValues.id;
            name = labels[i].dataValues.name;
            label_map[id] = name;
        } 

        statuses = await Status.findAll();
        status_map = {};
        for(var i=0; i < statuses.length; i++) {
            id = statuses[i].dataValues.id;
            name = statuses[i].dataValues.name;
            status_map[id] = name;
        }

        priorities = await Priority.findAll();
        priority_map = {};
        for(var i=0; i < priorities.length; i++) {
            id = priorities[i].dataValues.id;
            name = priorities[i].dataValues.name;
            priority_map[id] = name;
        } 

        tasks_res = []
        for (var i=0; i < tasks.length; i++) {
            task = tasks[i].dataValues;
            task["priority"] = priority_map[task["priority_id"]];
            task["status"] = status_map[task["status_id"]];
            task["label"] = label_map[task["label_id"]];
            tasks_res.push(task);
        }

        res.send(tasks_res);

    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findOne(req, res) {
    const id = req.params.id;

    try{
        task = await Task.findOne({
            where: {
                id: id,
            }
        });

        // Check if the task belongs to the user.
        if(!task){
            res.status(401).send({
                message: "There's no such task."
            });
        }
        isPartOfTeam = await Team_User.findOne({
            where:{
                team_id: task.team_id,
                user_id: req.user_id
            }
        });
        if(task.user_id == req.user_id || isPartOfTeam){
            label = await Label.findOne({
                where: {
                    id: task.label_id,
                }
            });
            status = await Status.findOne({
                where: {
                    id: task.status_id,
                }
            });           
            priority = await Priority.findOne({
                where: {
                    id: task.priority_id,
                }
            });

            task_res = task.dataValues;
            task_res["priority"] = priority.name;
            task_res["status"] = status.name;
            task_res["label"] = label.name;

            // send the comments from here.
            oldComments = await Comment.findAll({
                where:{
                    task_id: id,
                }
            });
            
            task_res["oldComments"] = [];
            oldComments.forEach(async element => {
                user_c = await User.findByPk(element.created_by_id);
                task_res["oldComments"].push({
                    'body': element.body,
                    'user_name': user_c.name,
                });

            });

            res.send(task_res);    
            }
        else{
            res.status(401).send({
                message: "You're not allowed to access this task."
            });
        }
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function update(req, res){

    const data = req.body;
    const id = req.params.id;
    const data_task = {
        title: data.title,
        description: data.description,
        status_id: data.status_id,
        label_id: data.label_id,
        priority_id: data.priority_id,
        due_date: data.due_date,
        assignee_id: data.assignee_id
    };

    const t = await sequelize.transaction();

    try{

        task = await Task.findByPk(id);
        prev_assignee_id = task.assignee_id;

        // Send email to the new assignee
        if(data.assignee_id != prev_assignee_id) {
            user = await User.findByPk(data.assignee_id);
            emailController.sendEmail(user, task);
        }
        
        await Task.update(data_task,{
            where: {
                id: id,
            }
        });
        task = await Task.findByPk(id);
        t.commit();
        res.send(task);
    }
    catch(err){
        t.rollback();
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function destroy(req, res){
    id = req.params.id;
    const t = await sequelize.transaction();
    try{
        await Comment.destroy({
            where: {
                task_id: id,
            }
        }, { transaction: t });

        await Task.destroy({
            where: {
                id: id,
            }
        }, { transaction: t });

        await t.commit();
        res.send({
            "message": "Deleted the task"
        });
    }
    catch(err){
        await t.rollback();
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};


async function findByTeam(req, res) {
    const data = req.body;
    user_id = req.user_id;

    try{
        team = await Team.findOne({
            where: {
                id: req.params.id,
            }
        });
        team_id = team.dataValues.id;

        // Check if the user belong to the team
        user_check = await Team_User.findOne({
            where: {
                team_id: team_id,
                user_id: user_id
            }
        });
        if(!user_check){
            res.status(401).send({
                message: "You are not a member of this team."
            });            
        }

        tasks = await Task.findAll({
            where: {
                team_id: team_id
            }
        });
        
        labels = await Label.findAll();
        label_map = {};
        for(var i=0; i < labels.length; i++) {
            id = labels[i].dataValues.id;
            name = labels[i].dataValues.name;
            label_map[id] = name;
        } 

        statuses = await Status.findAll();
        status_map = {};
        for(var i=0; i < statuses.length; i++) {
            id = statuses[i].dataValues.id;
            name = statuses[i].dataValues.name;
            status_map[id] = name;
        }

        priorities = await Priority.findAll();
        priority_map = {};
        for(var i=0; i < priorities.length; i++) {
            id = priorities[i].dataValues.id;
            name = priorities[i].dataValues.name;
            priority_map[id] = name;
        } 

        tasks_res = []
        for (var i=0; i < tasks.length; i++) {
            task = tasks[i].dataValues;
            task["priority"] = priority_map[task["priority_id"]];
            task["status"] = status_map[task["status_id"]];
            task["label"] = label_map[task["label_id"]];
            tasks_res.push(task);
        }
        res.send(tasks_res);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findByTitle(req, res) {
    // const data = req.body;
    const data = {
        'title': req.query.title,
    };
    try{
        tasks = await Task.findAll({
            where : {
                user_id: req.user_id,
                title: {
                    [Op.like]: '%' + data.title + '%'
                }
            }
        });

        labels = await Label.findAll();
        label_map = {};
        for(var i=0; i < labels.length; i++) {
            id = labels[i].dataValues.id;
            name = labels[i].dataValues.name;
            label_map[id] = name;
        } 

        statuses = await Status.findAll();
        status_map = {};
        for(var i=0; i < statuses.length; i++) {
            id = statuses[i].dataValues.id;
            name = statuses[i].dataValues.name;
            status_map[id] = name;
        }

        priorities = await Priority.findAll();
        priority_map = {};
        for(var i=0; i < priorities.length; i++) {
            id = priorities[i].dataValues.id;
            name = priorities[i].dataValues.name;
            priority_map[id] = name;
        } 

        tasks_res = []
        for (var i=0; i < tasks.length; i++) {
            task = tasks[i].dataValues;
            task["priority"] = priority_map[task["priority_id"]];
            task["status"] = status_map[task["status_id"]];
            task["label"] = label_map[task["label_id"]];
            tasks_res.push(task);
        }

        res.send(tasks_res);

        // res.send(tasks);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function sendReminder(req, res) {
    try {
        var startDate = new Date();
        var endDate = new Date();
        startDate.setDate(new Date().getDate());
        endDate.setDate(new Date().getDate()+1);
        console.log(startDate);
        console.log(endDate);

        tasks = await Task.findAll({
            where: {
                due_date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        for(var i=0; i<tasks.length; i++){
            if(tasks[i].assignee_id){
                user = await User.findByPk(tasks[i].assignee_id);
                email = user.email;
                emailController.sendReminderEmail(user, tasks[i]);
                console.log(tasks[i]);                
            }
        }

        console.log("Reminder sent.")
    } catch (error) {
        console.log("Error in sendReminder function: ", error);
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy,
    findByTeam,
    findByTitle,
    sendReminder
}