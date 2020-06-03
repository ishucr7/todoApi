module.exports = (sequelize, Sequelize, Label, Priority, Status, User) => {
    const Task = sequelize.define("task", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING
        },
        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Status,
                key: 'id',
            }
        },
        label_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Label,
                key: 'id',
            }
        },
        priority_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Priority,
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
        due_date: {
            type: Sequelize.DATE
        },
        deletedAt: {
            type: Sequelize.DATE
        },
    },
    {
        timestamps: true,
    });
  
    return Task;
};