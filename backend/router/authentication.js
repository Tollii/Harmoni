/**
 * @typedef Login
 * @property {string} email.required - Contract link
 * @property {string} password.required - User for contract
 */
/**
 * @typedef Signup
 * @property {string} email.required - User email
 * @property {string} password.required - Password for user clear text
 * @property {string} username.required - Full name
 * @property {string} phone.required - Phone number of user
 */
/**
 * @typedef New_Password
 * @property {string} old_password.required - old password
 * @property {string} new_password.required - new password
 */

module.exports = (app, models, auth) => {
  const bcrypt = require("bcryptjs");

  /**
   * @group Authentication - Operations about authentication
   * @route PUT /login/
   * @param {Login.model} login_info.body.required - Contract user id
   * @returns {object} 200 - Return token
   * @returns {Error}  default - Unexpected error
   */
  app.put("/login", (req, res) => {
    auth.logIn(req.body.email, req.body.password).then(data => {
      if (data != null) {
        res.status(200).send(data);
      } else {
        res.status(400).send("wrong email or password");
      }
    });
  });

  /**
   * @group Authentication - Operations about authentication
   * @route POST /signup/
   * @param {Signup.model} signup_info.body.required - user id
   * @returns {object} 200 - Return Ok
   * @returns {Error}  default - Unexpected error
   */
  app.post("/signup", (req, res) => {
    auth
      .signUp(
        req.body.email,
        req.body.password,
        req.body.username,
        req.body.phone
      )
      .then(data =>
        data
          ? res.status(200).send("Registered")
          : res.status(400).send("Registration failed")
      );
  });

  /**
   * @group Authentication - Operations about user
   * @route PUT /reset/
   * @param {New_Password.model} password.body.required - User's information
   * @param {string} token.header.required - token
   * @returns {object} 202 - return updated User object
   * @returns {Error}  default - Unexpected error
   */
  app.put("/reset/", async (req, res) => {
    let id = await auth.decode_token(req.headers.token);
    userControl.userGetOne(id).then(user => {
      auth.compare_password(req.body.old_password, user.hash).then(check => {
        if (check) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.new_password, salt, (err, hash) => {
              userControl
                .changePassword(id, hash)
                .then(() => {
                  res.status(202).send("Password is updated");
                })
                .catch(err => {
                  res.status(400).send("Password updated failed");
                });
            });
          });
        } else {
          res.status(400).send("Wrong old password");
        }
      });
    });
  });
};
