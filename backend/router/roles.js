/**
 * @typedef Roles
 * @property {string} role_name.required - Name of role
 */

module.exports = (app, models, base, auth) => {
  const roleControl = require('../dao/roles')(models)

  /**
   * Get all roles
  * @group Role - Operations about user
  * @route GET /role/
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of role info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"], 0, 0)
    .then(data => {
      if(data.auth){
        roleControl.roleGetAll().then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * Get a role by it's specific id
  * @group Role - Operations about user
  * @route GET /role/{id}/
  * @param {integer} id.path.required - role id
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of user info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/:id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"], 0, 0)
    .then(data => {
      if(data.auth){
        roleControl.roleGetOne(req.params.id).then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

}
