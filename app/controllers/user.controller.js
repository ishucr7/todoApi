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
  console.log("INSIDE GET ALL USERES");
  users = await User.findAll({
    attributes: ['email', 'name', 'id'],
  });
  console.log(users);
  res.status(200).send(users);
}