module.exports = (sequelize, Sequelize) => {
    const Priority = sequelize.define("priorities", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    });
  
    return Priority;
};