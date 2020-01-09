/**
 * @typedef Event_types
 * @property {string} event_type.required - Name of event type
 */

module.exports = (app, models, base) => {
  const event_typesControll = require("../dao/event_types")(models);

  /**
   * @group Event_types - Operations about event_types
   * @route GET /event_types/
   * @returns {object} 200 - An array of event types
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base, (req, res) => {
    event_typesControll.event_typesGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group Event_types - Operations about event_types
   * @route GET /event_types/{id}/
   * @param {integer} id.path.required - event_types id
   * @returns {object} 200 - One specific event type
   * @returns {Error} defauls - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    event_typesControll.event_typesGetOne(req.params.id).then(data => {
      res.send(data);
    });
  });
};
