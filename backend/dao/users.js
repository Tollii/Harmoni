module.exports = (models) => {
  const Users = models.Users;
  const Roles = models.Roles;
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
    .then(user => user),

    userCreate: (username, email, hash, salt, phone, picture) => Users.create({
      username:username,
      email:email,
      hash:hash,
      salt:salt,
      phone:phone,
      picture:picture,
      roleID:1
    },
    {
      returning: true
    })
    .then(data => data),

    userUpdate: (id, username, email, phone, picture) => Users.findOne({ where: {id: id}})
      .then(user => Users.update({
        username:username,
        email:email,
        phone:phone,
        picture:picture,
      },
      {
        returning: true,
        where: {id: id}
      })
      .then(user => user)),

    userDelete: (id) => Users.findOne({ where: {id: id}})
      .then(user => Users.destroy({where: {id:id}})
        .then(x => user)
      ),
  }
}

