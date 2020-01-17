 module.exports = (models) => {
  const Users = models.Users;
  const Roles = models.Roles;
  return {

    userGetAll: async () => Users.findAll()
    .then( users => {
      console.log("Fetched all users");
      return users;
    }),

    userGetOne: (id) => Users.findOne({
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

    changePassword: (id, hash) => Users.findOne({ where: {id: id}})
      .then(user => Users.update({
        hash: hash,
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

    artistGetAll: () => Roles.findOne({where: {role_name: "Artist"} })
    .then( (artist) => Users.findAll({where: {roleID: artist.id}})
    .then( (artists) => artists)),

  }
}
