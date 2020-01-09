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
    event_typesControll.event_typesAll().then(data => {
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
    event_typesControll.event_typesOne(req.params.id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Event_types - Operations about event_types
   * @route DELETE /event_types/{id}/
   * @param {integer} id.path.required - event_types id
   * @returns {object} 200 - Deletes one specific event type
   * @returns {Error} defauls - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    event_typesControll.event_typesDelete(req.params.id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Event_types - Operations about event_types
   * @route PUT /event_types/{id}/
   * @param {integer} id.path.required - event_types id
   * @param {Event_types.model} event_types.body.required - All attriubutes of event_types
   * @returns {object} 200 - One specific event type
   * @returns {Error} defauls - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    event_typesControll
      .event_typesUpdate(req.body.event_type)
      .then(() => {
        res.sendStatus(200).send("Event_types is updated");
      })
      .catch(err => {
        res.sendStatus(400).send("Event_types is NOT updated");
      });
  });

  /**
   * @group Event_types - Operations about event_types
   * @route POST /event_types/
   * @param {Event_types.model} event_types.body.required - All attriubutes of event_types
   * @returns {object} 200 - One specific event type
   * @returns {Error} defauls - Unexpected error
   */
  app.post(base, (req, res) => {
    event_typesControll.event_typesCreate(req.body.event_type).then(data => {
      res.send(data);
    });
  });
};
