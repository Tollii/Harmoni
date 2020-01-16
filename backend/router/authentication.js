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

module.exports = (app, models, auth) => {

  /**
  * @group Authentication - Operations about authentication
  * @route PUT /login/
  * @param {Login.model} login_info.body.required - Contract user id
  * @returns {object} 200 - Return token
  * @returns {Error}  default - Unexpected error
  */
  app.put('/login', ( req, res ) => {
    auth.logIn(req.body.email, req.body.password)
    .then(data => res.send(data));
  });

  /**
  * @group Authentication - Operations about authentication
  * @route POST /signup/
  * @param {Signup.model} signup_info.body.required - user id
  * @returns {object} 200 - Return Ok
  * @returns {Error}  default - Unexpected error
  */
  app.post('/signup', ( req, res ) => {
    auth.signUp(req.body.email, req.body.password, req.body.username, req.body.phone)
    .then(data => res.sendStatus(200))
  });
}

