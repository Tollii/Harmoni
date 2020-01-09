
/**
 * @typedef Users
 * @property {string} username.required - Full name
 * @property {string} email.required - User email
 * @property {string} hash.required - Hashed password
 * @property {string} salt.required - Password salt
 * @property {string} phone.required - Phone number of user
 * @property {string} picture.required - Profile picture of user
 */
/**
 * @typedef Users_PUT
 * @property {string} username.required - Full name
 * @property {string} email.required - User email
 * @property {string} phone.required - Phone number of user
 * @property {string} picture.required - Profile picture of user
 */

module.exports = (app, models, base) => {
  const userControl = require('../dao/users')(models)

  /**
  * @group User - Operations about user
  * @route GET /user/
  * @returns {object} 200 - An array of user info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, ( req, res ) => {
    userControl.userGetAll().then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group User - Operations about user
  * @route GET /user/{id}/
  * @param {integer} id.path.required - user id
  * @returns {object} 200 - An array of user info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/:id", ( req, res ) => {
    userControl.userGetOne(req.params.id).then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group User - Operations about user
  * @route POST /user/
  * @param {Users.model} user.body.required - User's information
  * @returns {object} 200 - return User object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    userControl.userCreate(
      req.body.username,
      req.body.email,
      req.body.hash,
      req.body.salt,
      req.body.phone,
      req.body.picture
    )
    .then((data) => {
      res.send(data);
    })
  });

  /**
  * @group User - Operations about user
  * @route PUT /user/{id}/
  * @param {integer} id.path.required - user id
  * @param {Users_PUT.model} user.body.required - User's information
  * @returns {object} 200 - return updated User object
  * @returns {Error}  default - Unexpected error
  */
  app.put(base+"/:id", (req, res) => {
    userControl.userUpdate(
      req.params.id,
      req.body.username,
      req.body.email,
      req.body.phone,
      req.body.picture
    )
    .then(() => {
      res.sendStatus(200).send('User is updated');
    })
    .catch((err) => {
      res.sendStatus(400).send('User not updated');
    })
  });

  /**
  * @group User - Operations about user
  * @route DELETE /user/{id}/
  * @param {integer} id.path.required - user id
  * @returns {object} 200 - User is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/:id", (req, res) => {
    userControl.userDelete(req.params.id)
      .then((data) => {
        res.send(data);
      })
  });

}