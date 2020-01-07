module.exports = (app, Users) => {
  return {
    userAll: () => Users.findAll()
    .then( users => users),

    userOne: (id) => Users.findOne({
      where: {
        id: id
      }
    })
    .then(users => users)
  }
}