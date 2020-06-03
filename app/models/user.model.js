module.exports = (sequelize, Sequelize, Role) => {
    const User = sequelize.define("users", {
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
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