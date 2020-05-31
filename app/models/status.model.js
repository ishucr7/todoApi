module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("statuses", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    });
  
    return Status;
};