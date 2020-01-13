/**
 * @typedef Permissions
 * @property {string} description.required - Description of permission
 */

module.exports = (app, models, base) => {
  const permissionControll = require("../dao/permissions")(models);

  /**
   * @group Permissions - Operations about permissions
   * @route GET /permission/
   * @returns {object} 200 - An array of permissions
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base, (req, res) => {
    console.log("Method called")
    permissionControll.permissionsGetAll().then((data) => {
      console.log("DAO called")
      res.send(data);
    })
  });

  /**
   * @group Permissions - Operations about permissions
   * @route GET /permission/{id}/
   * @param {integer} id.path.required - permission id
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    permissionControll.permissionsGetOne(req.params.id).then((data) => {
      console.log("called");
      res.send(data);
    })
  });
};
