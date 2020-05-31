module.exports = (sequelize, Sequelize, Label, Priority, Status) => {
    const Task = sequelize.define("task", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        due_date: {
            type: Sequelize.DATE
        },
        deletedAt: {
            type: Sequelize.DATE
        },
    });
  
    return Task;
};