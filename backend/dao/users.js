module.exports = async() => {

  const Users = require('../models/users');

  const errHandler = (err) => {
    console.log('Error: ', err);
  }

  Users.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
}