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
  const userControl = require("../dao/users")(models);
  const authControl = require("../dao/authentication")(models);

  /**
   * @group User - Operations about user
   * @route GET /user/
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  app.get(base, (req, res) => {
    userControl.userGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group User - Operations about user
   * @route GET /user/{token}/
   * @param {string} token.path.required - user token
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:token", async (req, res) => {
    console.log(req.params.token);
    let id = await authControl.decode_token(req.params.token);
    console.log(id);
    userControl.userGetOne(id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group User - Operations about user
   * @route POST /user/
   * @param {Users.model} user.body.required - User's information
   * @returns {object} 200 - return User object
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, async (req, res) => {
    userControl
      .userCreate(
        req.body.username,
        req.body.email,
        req.body.hash,
        req.body.salt,
        req.body.phone,
        req.body.picture
      )
      .then(data => {
        res.send(data);
      });
  });

  /**
   * @group User - Operations about user
   * @route PUT /user/{token}/
   * @param {string} token.path.required - user token
   * @param {Users_PUT.model} user.body.required - User's information
   * @returns {object} 200 - return updated User object
   * @returns {Error}  default - Unexpected error
   */
  app.put(base + "/:token", async (req, res) => {
    let id = await authControl.decode_token(req.params.token);

    userControl
      .userUpdate(
        id,
        req.body.username,
        req.body.email,
        req.body.phone,
        req.body.picture
      )
      .then(() => {
        res.sendStatus(200).send("User is updated");
      })
      .catch(err => {
        res.sendStatus(400).send("User not updated");
      });
  });

  /**
   * @group User - Operations about user
   * @route DELETE /user/{token}/
   * @param {string} token.path.required - user token
   * @returns {object} 200 - User is deleted
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:token", async (req, res) => {
    let id = await authControl.decode_token(req.params.token);

    userControl.userDelete(id).then(data => {
      res.send(data);
    });
  });
};
