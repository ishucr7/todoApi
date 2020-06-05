const db = require("../models");
const Team = db.teams;
const Team_User = db.team_user;
const User = db.user;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

async function create(req, res){

    console.log("INSIDE TEAM API create ", req.body);
    const data = req.body;
    data.user_id = req.user_id;

    const user_list = data.user_list;

    const team_data = {
        name: data.name,
        moderator_id: data.user_id          
    };

    const t = await sequelize.transaction();
    
    try{
        team = await Team.create(team_data, { transaction: t });

        const team_id = team.dataValues.id;
        team_users = []
        // const team_user_data = {
        //     team_id: team_id,
        //     user_id: team_data.moderator_id
        // };
        // team_user = await Team_User.create(team_user_data, 
        //     { transaction: t });

        // team_users.push(team_user.dataValues);

        for(var i=0; i < user_list.length; i++){
            console.log(user_list[i]);
            user = await User.findOne({
                where: {
                  email: String(user_list[i])
                }
            });

            user_id = user.dataValues.id;
            const team_user_data = {
                team_id: team_id,
                user_id: user_id
            };

            team_user = await Team_User.create(team_user_data,
                 { transaction: t });
            team_users.push(team_user.dataValues);
        }
        console.log(team_users)
        await t.commit();
        res.send(team);
    }
    catch(err){
        console.log(err.message);
        await t.rollback();
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
};

async function getTeam(req, res) {
    const user_id = req.user_id;
    const team_id = req.params.id;
    try {

        team = await Team.findOne({
            where : {
                id: team_id,
                moderator_id: user_id,
            }
        });
        if(!team){

            res.send(422).send({
                "status": "FAILURE",
                "message": "This is not your team",
            })
        }

        user_ids = await Team_User.findAll({
            where : {
                team_id: team_id
            }
        });
        user_list= [];
        for(var i=0; i < user_ids.length; i++) {
            user = await User.findOne({
                where : {
                    id: user_ids[i].user_id,
                }
            });
            console.log(user_ids[i].team_id, " : ", user_ids[i].user_id);
            user_list.push(user.email);
        }
        console.log("team id is ", team_id);
        console.log("Getting team, " , user_list);
        res.send({
            'Name': team.name,
            'user_list': user_list,
        });
        
    } catch (error) {
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
}


// Get all teams for a user
async function getAll(req, res) {
    const user_id = req.user_id;
    
    try {
        team_ids = await Team_User.findAll({
            where : {
                user_id: user_id
            },
            order: [['updatedAt', 'DESC']]
        });
        
        teams = []
        for(var i=0; i < team_ids.length; i++) {
            team_id = team_ids[i].dataValues.team_id;
            team = await Team.findOne({
                where : {
                    id: team_id
                }
            });
            moderator_user = await User.findByPk(team.moderator_id);
            console.log(team.dataValues);
            teams.push({
                ...team.dataValues,
                moderator_name: moderator_user.name});
        }
        
        res.send(teams);
        
    } catch (error) {
        res.status(500).send({
            status: "FAILURE",
            message:
                err.message || "DB error"
        });
    }
}

module.exports = {
    create,
    getAll,
    getTeam
}