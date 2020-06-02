module.exports = (sequelize, Sequelize, User, Task) => {
    const Comment = sequelize.define("comment", {
        
        body: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_by_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
        task_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Task,
                key: 'id',
            }
        },
    },
    {
        timestamps: true,
    });
  
    return Comment;
};