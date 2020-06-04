const db = require("../models");
const Label = db.labels;
const Priority = db.priorities;
const Status = db.statuses;
const Op = db.Sequelize.Op;

async function findAllLabels(req, res){

    try{
        labels = await Label.findAll({});
        console.log("INSIDE FINDALL  Labels    :::  " , labels);
        res.send(labels);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findOneLabel(req, res) {
    const id = req.params.id;

    try{
        label = await Label.findByPk(id);
        res.send(label);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};


async function findAllStatuses(req, res){

    console.log("ASDDSADS");
    try{
        statuses = await Status.findAll({});
        console.log("INSIDE FINDALL  statuses    :::  " , statuses);

        res.send(statuses);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findOneStatus(req, res) {
    const id = req.params.id;

    try{
        status = await Status.findByPk(id);
        res.send(status);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};


async function findAllPriorities(req, res){

    try{
        priorities = await Priority.findAll({});
        console.log("INSIDE FINDALL  PRIORITIES    :::  " , priorities);
        res.send(priorities);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function findOnePriority(req, res) {
    const id = req.params.id;
    try{
        priority = await Priority.findByPk(id);
        res.send(priority);
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
    findAllLabels,
    findOneLabel,
    findAllStatuses,
    findOneStatus,
    findAllPriorities,
    findOnePriority,
}