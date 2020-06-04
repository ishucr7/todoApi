module.exports = (sequelize, Sequelize, User) => {
    const Team = sequelize.define("team", {
        
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        moderator_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
    },
    {
        timestamps: true,
    });
  
    return Team;
};