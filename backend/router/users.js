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

module.exports = (app, models, base, auth) => {
  const userControl = require("../dao/users")(models);

  /**
   * Get all users
   * @group User - Operations about user
   * @route GET /user/
   * @param {string} token.header.required - token
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  app.get(base, (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin"
      ], 0, 0)
      .then(data => {
        if (data.auth) {
          userControl.userGetAll().then(data => {
            res.send(data);
          });
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });

  /**
   * Get a user by the id supplied in the usertoken
   * @group User - Operations about user
   * @route GET /user/{token}/
   * @param {string} token.path.required - token
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:token", async (req, res) => {
    console.log(req.params.token);
    let id = await auth.decode_token(req.params.token);
    userControl.userGetOne(id).then(data => {
      res.send(data);
    });
  });

  /**
   * Updates an existing user
   * @group User - Operations about user
   * @route PUT /user/{id}/
   * @param {integer} id.path.required - user id
   * @param {Users_PUT.model} user.body.required - User's information
   * @param {string} token.header.required - token
   * @returns {object} 200 - return updated User object
   * @returns {Error}  default - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin",
        "Organizer",
        "Artist",
        "User"
      ], 0, req.params.id)
      .then(data => {
        if (data.auth) {
          userControl
            .userUpdate(
              req.params.id,
              req.body.username,
              req.body.email,
              req.body.phone,
              req.body.picture
            )
            .then(() => {
              res.status(200).send("User is updated");
            })
            .catch(err => {
              res.status(400).send("User not updated");
            });
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });

  /**
   * Get all users that have the role artists
   * @group Artist - Operations about artists
   * @route GET /artist/
   * @returns {object} 200 - An array of artist info
   * @returns {Error}  default - Unexpected error
   */
  app.get("/artist/", (req, res) => {
    userControl.artistGetAll().then(data => {
      res.send(data);
    });
  });
};
