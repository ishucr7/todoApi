module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Radhaswami1",
    DB: "todoApi",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };