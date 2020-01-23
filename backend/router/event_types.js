/**
 * @typedef Event_types
 * @property {string} event_type.required - Name of event type
 */

module.exports = (app, models, base, auth) => {
  const event_typesControl = require("../dao/event_types")(models);

  /**
   * Gets all event_types
   * @group Event_types - Operations about event_types
   * @route GET /event_types/
   * @param {string} token.header.required - token
   * @returns {object} 200 - An array of event types
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base, (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"], 0, 0)
    .then(data => {
      if(data.auth){
        event_typesControl.event_typesGetAll().then(data => {
          res.send(data);
        });
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * Gets a specific event_type specified by id
   * @group Event_types - Operations about event_types
   * @route GET /event_types/{id}/
   * @param {integer} id.path.required - event_types id
   * @param {string} token.header.required - token
   * @returns {object} 200 - One specific event type
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"], 0, 0)
    .then(data => {
      if(data.auth){
        event_typesControl.event_typesGetOne(req.params.id).then(data => {
          res.send(data);
        });
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
};
