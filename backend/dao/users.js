module.exports = (Users) => {
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

    userCreate: (username, email, hash, salt, phone, picture) => {
      return Users.create({
        username,
        email,
        hash,
        salt,
        phone,
        picture
      },
      {
        returning: true
      })
      .then(data => data)
    },

    userUpdate: (id, username, email, hash, salt, phone, picture) => {
      return Users.update({
        username:username,
        email:email,
        hash:hash,
        salt:salt,
        phone:phone,
        picture:picture
      },
      {
        returning: true,
        where: {id: id}
      })
      .then(user => user)
    },

    userDelete: (id) => Users.findOne({ where: {id: id}})
      .then(user => Users.destroy({where: {id:id}})
        .then(x => user)
      )
      .catch(),
  }
}

