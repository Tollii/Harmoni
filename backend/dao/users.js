module.exports = (app, Users) => {
  return {
    userAll: () => Users.findAll()
    .then( users => {
      console.log("Fetched all users");
      return users;
    }),

    userOne: (id) => Users.findOne({
      where: {
        id: id
      }
    })
    .then(users => users)
  }
}

