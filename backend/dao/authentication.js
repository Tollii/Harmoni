const bcrypt = require("bcryptjs");

const jwt = require("jwt-simple");
const moment = require("moment");

hash_password = async password => {
  return bcrypt.genSalt(10, (err, salt) => {
    return bcrypt.hash(password, salt, (err, hash) => {
      return hash;
    });
  });
};

compare_password = async (password, hash) =>
  bcrypt.compare(password, hash).then(res => res);

encode_token = userId => {
  //3 variables, exp is when it expires, iat, when it is made, sub is user info, this case just user id
  const payload = {
    exp: moment()
      .add(1, "hours")
      .format(),
    iat: moment().format(),
    sub: userId
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

decode_token = async token => {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  let now = moment().format();
  if (now > payload.exp) {
    //callback('Token has expired, please log in again');
    return null;
  } else {
    return payload.sub;
  }
};

module.exports = models => {
  const Users_dao = require("./users.js")(models);
  const Roles_dao = require("./roles.js")(models);
  const Contract_dao = require("./contracts.js")(models);

  const Users = models.Users;
  return {
    logIn: async (email, password) =>
      Users.findOne({
        where: {
          email: email
        }
      })
        .then(user => {
          return compare_password(password, user.hash).then(res => {
            if (res) {
              return encode_token(user.id);
            } else {
              return null;
            }
          });
        })
        .catch(err => {
          console.log(err);
          return null;
        }),

    signUp: async (email, password, username, phone) => {
      return bcrypt.hash(password, 10)
      .then((hash) => {
        return Users.create({
          username: username,
          email: email,
          hash: hash,
          phone: phone,
          roleID: 1
        })
        .then(data => {
          return true
        })
        .catch(err => {
          return false
        });
      })
    },
    encode_token,
    decode_token,
    compare_password,
    hash_password,

    check_permissions: async (token, permissions, event_id, user_id) => {
      return decode_token(token)
        .then(id => {
          return Users_dao.userGetOne(id).then(user => {
            return Roles_dao.roleGetOne(user.roleID).then(role => {
              if (permissions.includes("Admin")) {
                if ("Admin" == role.dataValues.role_name) {
                  return {
                    auth: true,
                    user: user,
                    role: role
                  };
                }
              }
              if (permissions.includes("Organizer")) {
                if ("Organizer" == role.dataValues.role_name) {
                  if (event_id != 0) {
                    return Contract_dao.contractGetOne(id, event_id).then(
                      contract => {
                        if (contract != null) {
                          return {
                            auth: true,
                            user: user,
                            role: role
                          };
                        }
                      }
                    );
                  } else {
                    if (user_id == 0) {
                      return {
                        auth: true,
                        user: user,
                        role: role
                      };
                    } else {
                      if (user_id == id) {
                        return {
                          auth: true,
                          user: user,
                          role: role
                        };
                      }
                    }
                  }
                }
              }
              if (permissions.includes("Artist")) {
                if ("Artist" == role.dataValues.role_name) {
                  if (user_id == 0 && event_id == 0) {
                    return {
                      auth: true,
                      user: user,
                      role: role
                    };
                  }
                  if (user_id == id) {
                    if (event_id == 0) {
                      return {
                        auth: true,
                        user: user,
                        role: role
                      };
                    } else {
                      return Contract_dao.contractGetOne(id, event_id).then(
                        contract => {
                          if (contract != null) {
                            return {
                              auth: true,
                              user: user,
                              role: role
                            };
                          }
                        }
                      );
                    }
                  }
                }
              }
              if (permissions.includes("User")) {
                if ("User" == role.dataValues.role_name) {
                  if(user_id == 0 && event_id != 0) {
                    return Contract_dao.contractGetOne(id, event_id).then(
                      contract => {
                        if (contract != null) {
                          return {
                            auth: true,
                            user: user,
                            role: role
                          };
                        }
                      }
                    );
                  }
                  if (user_id != 0 && user_id == id) {
                    return {
                      auth: true,
                      user: user,
                      role: role
                    };
                  }
                  if (user_id == 0) {
                    return {
                      auth: true,
                      user: user,
                      role: role
                    };
                  }
                }
              }
              return {
                auth: false,
                user: user,
                role: role
              };
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};
