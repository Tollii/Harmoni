const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');

hash_password = async (password) => {
  return bcrypt.genSalt(10, (err, salt) => {
    return bcrypt.hash("B4c0/\/", salt, (err, hash) => {
      return hash;
    });
  });
}

compare_password = async (password, hash) => bcrypt.compare(password, hash).then((res) => res);

encode_token = (userId) => {
  //3 variables, exp is when it expires, iat, when it is made, sub is user info, this case just user id
  const payload = {
    exp: moment().add(1, 'hours').format(),
    iat: moment().format(),
    sub: userId
  }
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

decode_token = async (token) => {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  console.log("user id in token" + payload.sub);
  let now = moment().format();
    console.log("time not working right probably current time: " + now + " exp time " + payload.exp + "time of creation " + payload.iat);
    if(now>payload.exp){
    //callback('Token has expired, please log in again');
      console.log("time not working right probably current time: " + now + " exp time " + payload.exp);
    return null;
  }
  else{
    return payload.sub;
  }
}

module.exports = (models) => {

  const Users_dao = require('./users.js')(models);
  const Roles_dao = require('./roles.js')(models);

  const Users = models.Users;
  return {
    logIn: async (email, password) => Users.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      if(compare_password(password, user.hash)) {
        //generate token
        const token = encode_token(user.id);
        return token;
      }
    }),

    signUp: async (email, password, username, phone) => {
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
    encode_token,
    decode_token,

    check_permissions: async (token, permissions) => {
      return decode_token(token)
      .then(id => {
          return Users_dao.userGetOne(id)
          .then(user => {
            return Roles_dao.roleGetOne(user.roleID).
            then(role => {
              return ({auth: permissions.includes(role.dataValues.role_name), user: user, role: role})
            })
          })
        }
      )
      .catch(err => {
        console.log(err);
      })
    },
  }
}

