/**
 * @typedef Permissions
 * @property {string} description.required - Description of permission
 */

module.exports = (app, models, base) => {
  const permissionControll = require("../dao/permissions")(models);

  /**
   * @group Permissions - Operations about permissions
   * @route GET /permissions/
   * @returns {object} 200 - An array of permissions
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base, (req, res) => {
    permissionControll.permissionsGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group Permissions - Operations about permissions
   * @route GET /permissions/{id}/
   * @param {integer} id.path.required - permission id
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    permissionControll.permissionsGetOne(req.params.id).then(data => {
      res.send(data);
    });
  });
<<<<<<< HEAD
=======

  /**
   * @group Permissions - Operations about permissions
   * @route DELETE /permissions/{id}/
   * @param {integer} id.path.required - permission id
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    permissionControll.persmissionsDelete(req.params.id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Permissions - Operations about permissions
   * @route PUT /permissions/{id}/
   * @param {integer} id.path.required - permission id
   * @param {Permissions.model} permission.body.required - All attriubutes of permissions
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    permissionControll
      .permissionsUpdate(req.params.id, req.body.description)
      .then(() => {
        res.sendStatus(200).send("Permission is updated");
      })
      .catch(err => {
        res.sendStatus(400).send("Permission is NOT updated");
      });
  });

  /**
   * @group Permissions - Operations about permission
   * @route POST /permissions/
   * @param {Permissions.model} permission.body.required - All attriubutes of permission
   * @returns {object} 200 - One specific permission
   * @returns {Error} defauls - Unexpected error
   */
  app.post(base, (req, res) => {
    permissionControll.permissionsCreate(req.body.description).then(data => {
      res.send(data);
    });
  });
>>>>>>> permissions dao+router with swagger
};
