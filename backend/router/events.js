/**
 * @typedef Events
 * @property {string} event_name.required - Full name
 * @property {string} location.required - Event location
 * @property {string} event_start.required - Event start date
 * @property {string} event_end.required - Event end date
 * @property {string} personnel.required - Text request of personnel
 * @property {string} description.required - Text description of event
 * @property {boolean} archived.required - Verification of archived event
 * @property {integer} event_typeID.required - ID of event_type
 */

module.exports = (app, models, base, auth) => {
  const eventControl = require("../dao/events")(models);

  /**
   * @group Events - Operations about event
   * @route GET /event/
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */

  app.get(base, (req, res) => {
    eventControl.eventGetAll().then(data => {
      res.send(data);
    });
  });
  /**
   * @group Events - Operations about event
   * @route GET /event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - The event with the param id
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    eventControl.eventGetOne(req.params.id).then(data => {
      res.send(data);
    });
  });
  /**
   * @group Events - Operations about event
   * @route DELETE /event/{id}/
   * @param {integer} id.path.required - event id
   * @param {string} token.query.required - token
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data.auth){
        eventControl.eventDelete(req.params.id).then(data => {
          res.send(data);
        });
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * @group Events - Operations about event
   * @route PUT /event/{id}/
   * @param {integer} id.path.required - event id
   * @param {Events.model} event.body.required - All attributes of event
   * @param {string} token.query.required - token
   * @returns {object} 200 - Updates the attributes of the given event
   * @returns {Error}  default - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data.auth){
        eventControl
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
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
  /**
   * @group Events - Operations about event
   * @route POST /event/
   * @param {Events.model} event.body.required - All attributes of event
   * @param {string} token.query.required - token
   * @returns {object} 200 - Add an event to the DB
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data.auth){
        eventControl
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
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
};
