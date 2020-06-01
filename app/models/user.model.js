module.exports = (sequelize, Sequelize, Role) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: Role,
            key: 'id',
        }
      }
    },
    {
        timestamps: true
    });
  
    return User;
  };