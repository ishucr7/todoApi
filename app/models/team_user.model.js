module.exports = (sequelize, Sequelize, User, Team) => {
    const Team_User = sequelize.define("team_user", {
        
        team_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: 'id',
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    });
  
    return Team_User;
};