
/**
 * @typedef Riders
 * @property {string} additions.required - Contract link
 * @property {integer} rider_typeID.required - Rider type for rider
 * @property {integer} eventID.required - Event for rider
 * @property {integer} userID.required - User for rider
 */
/**
 * @typedef Riders_PUT
 * @property {string} additions.required - Contract link
*/

module.exports = (app, models, base) => {
  const ridersControl = require('../dao/riders')(models)

  /**
  * @group Riders - Operations about rider
  * @route GET /rider/
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, (req, res) => {
    ridersControl.riderGetAll().then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Riders - Operations about Rider
  * @route GET /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}/
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @returns {object} 200 - Return a Rider
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    ridersControl.riderGetOne(
      req.params.rider_type_id,
      req.params.event_id,
      req.params.user_id
    )
    .then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Riders - Operations about riders
  * @route POST /rider/
  * @param {Riders.model} user.body.required - Rider information
  * @returns {object} 200 - return Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    ridersControl.riderCreate(
      req.body.additions,
      req.body.rider_typeID,
      req.body.eventID,
      req.body.userID,
    )
    .then((data)=>{
      res.send(data)
    })
  });

  /**
  * @group Riders - Operations about riders
  * @route PUT /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}
  * @param {Riders_PUT.model} user.body.required - Rider information
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @returns {object} 200 - Returns updated Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.put(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    ridersControl.riderUpdate(
      req.body.additions,
      req.params.rider_type_id,
      req.params.event_id,
      req.params.user_id
    )
    .then(() => {
      res.sendStatus(200).send('Ticket is updated');
    })
    .catch((err) => {
      res.sendStatus(400).send('Ticket is not updated');
    })
  });

  /**
  * @group Riders - Operations about riders
  * @route DELETE /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @returns {object} 200 - Rider is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    ridersControl.riderDelete(
      req.params.rider_type_id,
      req.params.event_id,
      req.params.user_id
    )
    .then((data) => {
      res.send(data);
    })
  });

}
