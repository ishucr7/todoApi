require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "dialect": "mysql"
    },
    "production": {
        "user": "b2ba0df7e00ea9",
        "password": "cd0ae547",
        "database": "heroku_fa6b01fbc3fd92f",
        "host": "us-cdbr-east-05.cleardb.net",
        "dialect": "mysql"
    }
  }