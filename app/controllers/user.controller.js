const db = require("../models");
const User  = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
  
exports.getAllUsers = async (req, res) => {
  users = await User.findAll({
    attributes: ['email', 'name', 'id',],
  });
  res.status(200).send(users);
}