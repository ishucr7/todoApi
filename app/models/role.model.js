module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
        timestamps: true,
    });
  
    return Role;
  };