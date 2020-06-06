const db = require("../models");
const Comment = db.comments;
const User = db.user;

const Op = db.Sequelize.Op;

async function create(req, res){

    console.log("INSIDE API create ", req.body);
    const data = req.body;
    data.user_id = req.user_id;
    const comment_data = {
        body: data.body,
        created_by_id: data.user_id,
        task_id: data.task_id       
    };
    
    try{
        comment = await Comment.create(comment_data);
        res.send(comment);
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

async function update(req, res){

    const data = req.body;
    const id = req.params.id;
    const comment_data = {
        body: data.body
    };
    
    try{
        await Comment.update(comment_data,{
            where: {
                id: id,
            }
        });
        comment = await Comment.findByPk(id);
        res.send(comment);
    }
    catch(err){
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function getAll(req, res){

    const task_id = req.params.id;
    console.log("User id is ", req.user_id);
    try{
        comments = await Comment.findAll({
            where : {
                task_id: task_id,
            },
            order: [['updatedAt', 'DESC']]
        });

        users = await User.findAll();
        user_map = {};
        for(var i=0; i < users.length; i++) {
            id = users[i].dataValues.id;
            name = users[i].dataValues.name;
            user_map[id] = name;
        } 

        comments_res = []
        for (var i=0; i < comments.length; i++) {
            comment = comments[i].dataValues;
            comment["created_by"] = user_map[comment["created_by_id"]];
            comments_res.push(comment);
        }

        res.send(comments_res);
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
        await Comment.destroy({
            where: {
                id: id,
            }
        });

        res.send({
            "message": "Deleted the comment."
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

module.exports = {
    create,
    update,
    getAll,
    destroy
}