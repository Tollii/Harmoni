/**
 * @typedef Permissions_per_role
 * @property {integer} roleID.required - Role id
 * @property {integer} permissionID.required - Permission id
 */

module.exports = (app, models, base) => {
  const permissions_per_roleControll = require("../dao/permissions_per_role")(
    models
  );

  /**
   * @group Permissions_per_role - Operations about permissions_per_role
   * @route GET /permissions_per_role/
   * @returns {object} 200 - An array of permissions_per_role
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base, (req, res) => {
    permissions_per_roleControll.permissions_per_roleGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group Permissions_per_role - Operations about permissions
   * @route GET /permissions_per_role/{id}/
   * @param {integer} roleID.path.required - role id
   * @param {integer} permissionID.path.required - permission id
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base + "/role/:roleID/permission/:permissionID", (req, res) => {
    permissions_per_roleControll
      .permissions_per_roleGetOne(req.params.roleID, req.params.permissionID)
      .then(data => {
        res.send(data);
      });
  });
};
