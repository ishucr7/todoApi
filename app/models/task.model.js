module.exports = (sequelize, Sequelize) => {
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
        },
        label_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        priority_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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