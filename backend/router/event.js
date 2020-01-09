/**
 * @typedef Event
 * @property {string} event_name.required - Full name
 * @property {string} location.required - Event location
 * @property {string} event_start.required - Event start date
 * @property {string} event_end.required - Event end date
 * @property {string} personnel.required - Text request of personnel
 * @property {string} description.required - Text description of event
 * @property {boolean} archived.required - Verification of archived event
 * @property {integer} event_typeID.required - ID of event_type
 */

module.exports = (app, models, base) => {
  const eventControll = require("../dao/events")(models);

  /**
   * @group Event - Operations about event
   * @route GET /event/
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */

  app.get(base, (req, res) => {
    eventControll.eventAll().then(data => {
      res.send(data);
    });
  });
  /**
   * @group Event - Operations about event
   * @route GET /event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - The event with the param id
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    eventControll.eventOne(req.params.id).then(data => {
      res.send(data);
    });
  });
  /**
   * @group Event - Operations about event
   * @route DELETE /event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    eventControll.eventDelete(req.params.id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Event - Operations about event
   * @route PUT /event/{id}/
   * @param {integer} id.path.required - event id
   * @param {Event.model} event.body.required - All attributes of event
   * @returns {object} 200 - Updates the attributes of the given event
   * @returns {Error}  default - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    eventControll
      .eventUpdate(
        req.params.id,
        req.body.event_name,
        req.body.location,
        req.body.event_start,
        req.body.event_end,
        req.body.personnel,
        req.body.description,
        req.body.archived,
        req.body.event_typeID
      )
      .then(() => {
        res.sendStatus(200).send("Event is updated");
      })
      .catch(err => {
        res.sendStatus(400).send("Event is NOT updated");
      });
  });
  /**
   * @group Event - Operations about event
   * @route POST /event/
   * @param {Event.model} event.body.required - All attributes of event
   * @returns {object} 200 - Add an event to the DB
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, (req, res) => {
    eventControll
      .eventCreate(
        req.body.event_name,
        req.body.location,
        req.body.event_start,
        req.body.event_end,
        req.body.personnel,
        req.body.description,
        req.body.archived,
        req.body.event_typeID
      )
      .then(data => {
        res.send(data);
      });
  });
};
