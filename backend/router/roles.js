/**
 * @typedef Roles
 * @property {string} role_name.required - Name of role
 */

module.exports = (app, models, base) => {
  const roleControl = require('../dao/roles')(models)

  /**
  * @group Role - Operations about user
  * @route GET /role/
  * @returns {object} 200 - An array of role info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, (req, res) => {
    roleControl.roleGetAll().then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Role - Operations about user
  * @route GET /role/{id}/
  * @param {integer} id.path.required - role id
  * @returns {object} 200 - An array of user info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/:id", (req, res) => {
    roleControl.roleGetOne(req.params.id).then((data) => {
      res.send(data);
    })
  });

}
