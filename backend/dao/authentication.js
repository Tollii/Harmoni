const bcrypt = require('bcryptjs');

hash_password = async (password) => {
  return bcrypt.genSalt(10, (err, salt) => {
    return bcrypt.hash("B4c0/\/", salt, (err, hash) => {
      return hash;
    });
  });
}

compare_password = async (password, hash) => bcrypt.compare(password, hash).then((res) => res);

module.exports = (models) => {
  const Users = models.Users;
  return {
    logIn: (email, password) => Users.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      if(compare_password(password, user.hash)) {
        //generate token
        const token = "abx"
        return Users.update({
          token:token,
        },
        {
          where: {id: user.id}
        })
        .then(user => token)
      }
    }),

    signUp: (email, password, username, phone) => {
      return bcrypt.genSalt(10, (err, salt) => {
        return bcrypt.hash(password, salt, (err, hash) => {
          return Users.create({
            username:username,
            email:email,
            hash:hash,
            phone:phone,
            roleID:1
          },
          {
            returning: true
          })
          .then(data => data)
        })
      })
    },
  }
}

