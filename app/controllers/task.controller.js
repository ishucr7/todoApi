const db = require("../models");
const Task = db.tasks;
const Label = db.labels;
const Status = db.statuses;
const Priority = db.priorities;
const Team = db.teams;
const Team_User = db.team_user;

const Op = db.Sequelize.Op;

async function create(req, res){

    console.log("INSIDE API craete ", req.body);
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
        team_id: data.team_id          
    };
    
    try{
        task = await Task.create(data_task);
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
    console.log("User id is ", req.user_id);
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
        else if(task.user_id == req.user_id){
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
    };
    
    try{
        await Task.update(data_task,{
            where: {
                id: id,
            }
        });
        task = await Task.findByPk(id);
        res.send(task);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function destroy(req, res){
    id = req.params.id;
    try{
        await Task.destroy({
            where: {
                id: id,
            }
        });
        res.send({
            "message": "Deleted the task"
        });
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};


async function findByTeam(req, res) {
    console.log("Yo");
    const data = req.body;
    user_id = req.user_id;

    try{
        team = await Team.findOne({
            where: {
                name: data.name,
            }
        });
        team_id = team.dataValues.id;
        console.log("team id: ", team_id);

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
        
        res.send(tasks);
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
    const data = req.body;
    console.log("User id is ", req.user_id);
    try{
        tasks = await Task.findAll({
            where : {
                user_id: req.user_id,
                title: {
                    [Op.like]: '%' + data.title + '%'
                }
            }
        });

        res.send(tasks);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};


module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy,
    findByTeam,
    findByTitle
}