module.exports = (sequelize, Sequelize) => {
    const Label = sequelize.define("label", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
  
    return Label;
};