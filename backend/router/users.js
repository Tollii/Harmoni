
/**
 * @typedef Users
 * @property {integer} id
 * @property {string} username.required - Full name
 * @property {string} email.required - User email
 * @property {string} hash.required - Hashed password
 * @property {string} salt.required - Password salt
 * @property {string} phone.required - Phone number of user
 * @property {string} picture.required - Profile picture of user
 */

module.exports = (app, Users, base) => {
  const userControl = require('../dao/users')(app, Users)

/**
 * @group User - Operations about user
 * @route GET /user/
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

app.get(base, ( req, res ) => {
  userControl.userAll().then((data)=>{
    res.send(data);
  })
});

/**
 * @group User - Operations about user
 * @route GET /user/{id}
 * @param {integer} id.path.required - user id
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
  app.get(base+"/:userID", ( req, res ) => {
    userControl.userOne(req.params.userID).then((data)=>{
      res.send(data);
    })
  });

}