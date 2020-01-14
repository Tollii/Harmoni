/**
 * @typedef Riders
 * @property {string} additions.required - Contract link
 * @property {integer} rider_typeID.required - Rider type for rider
 * @property {integer} eventID.required - Event for rider
 * @property {string} token.required - User for rider
 */
/**
 * @typedef Riders_PUT
 * @property {string} additions.required - Contract link
 */

module.exports = (app, models, base, auth) => {
  const ridersControl = require('../dao/riders')(models)

  /**
  * @group Riders - Operations about rider
  * @route GET /rider/
  * @param {string} token.query.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data){
        ridersControl.riderGetAll().then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Riders - Operations about Rider
  * @route GET /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}/
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @param {string} token.query.required - token
  * @returns {object} 200 - Return a Rider
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data){
        ridersControl.riderGetOne(
          req.params.rider_type_id,
          req.params.event_id,
          req.params.user_id
        )
        .then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Riders - Operations about riders
  * @route POST /rider/
  * @param {Riders.model} user.body.required - Rider information
  * @param {string} token.query.required - token
  * @returns {object} 200 - return Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data){
        ridersControl.riderCreate(
          req.body.additions,
          req.body.rider_typeID,
          req.body.eventID,
          req.body.userID,
        )
        .then((data)=>{
          res.send(data)
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Riders - Operations about riders
  * @route PUT /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}
  * @param {Riders_PUT.model} user.body.required - Rider information
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @param {string} token.query.required - token
  * @returns {object} 200 - Returns updated Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.put(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data){
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
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Riders - Operations about riders
  * @route DELETE /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @param {string} token.query.required - token
  * @returns {object} 200 - Rider is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data){
        ridersControl.riderDelete(
          req.params.rider_type_id,
          req.params.event_id,
          req.params.user_id
        )
        .then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

      ridersControl
        .riderDelete(req.params.rider_type_id, req.params.event_id, id)
        .then(data => {
          res.send(data);
        });
    }
  );
};
