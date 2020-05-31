const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

async function create(req, res){

    const data = req.body;

    const data_task = {
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        status_id: data.status_id,
        label_id: data.label_id,
        priority_id: data.priority_id,
        due_date: data.due_date,
        deletedAt: null,            
    };
    
    try{
        task = await Task.create(data_task);
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

async function findAll(req, res){

    const data = req.body;

    try{
        tasks = await Task.findAll({
            where : {
                user_id: data.user_id,
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

async function findOne(req, res) {
    const id = req.params.id;

    try{
        task = await Tutorial.findByPk(id);
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

async function update(req, res) {
  
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
}