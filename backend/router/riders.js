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

module.exports = (app, models, base, auth) => {
  const ridersControl = require('../dao/riders')(models)

  /**
   * Gets all riders
  * @group Riders - Operations about rider
  * @route GET /rider/
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, (req, res) => {
    console.log(req.headers);
    auth.check_permissions(req.headers.token, ["Admin"], 0, 0)
    .then(data => {
      console.log(data);
      if(data.auth){
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
   * Get all riders for a specified event
  * @group Riders - Operations about rider
  * @route GET /rider/event/{eventID}
  * @param {integer} eventID.path.required - Event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base + "/event/:eventID", (req, res) => {
    console.log(req.headers);
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"], req.params.eventID, 0)
    .then(data => {
      console.log(data);
      if(data.auth){
        ridersControl.riderGetAllByEvent(req.params.eventID).then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * Get all riders for a specific artist at a specific event
  * @group Riders - Operations about rider
  * @route GET /rider/event/{eventID}/user/{userID}
  * @param {integer} eventID.path.required - Event id
  * @param {integer} userID.path.required - User id
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base + "/event/:eventID/user/:userID", (req, res) => {
    auth
      .check_permissions(
        req.headers.token,
        ["Admin", "Organizer", "Artist"],
        req.params.eventID,
        req.params.userID
      )
      .then(data => {
        console.log(data);
        if (data.auth) {
          ridersControl
            .riderGetAllByArtist(req.params.eventID, req.params.userID)
            .then(data => {
              res.send(data);
            });
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });

  /**
   * posts a new rider
  * @group Riders - Operations about riders
  * @route POST /rider/
  * @param {Riders.model} user.body.required - Rider information
  * @param {string} token.header.required - token
  * @returns {object} 200 - return Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    auth
      .check_permissions(
        req.headers.token,
        ["Admin", "Organizer", "Artist"],
        req.body.eventID,
        req.body.userID
      )
      .then(data => {
        if (data.auth) {
          ridersControl
            .riderCreate(
              req.body.additions,
              req.body.rider_typeID,
              req.body.eventID,
              req.body.userID
            )
            .then(data => {
              res.send(data);
            }).catch(err => err);
        } else {
          res.status(400).send("Not authenticated");
        }
      })
  });

  /**
   * updates an excisting rider by all 3 ids
  * @group Riders - Operations about riders
  * @route PUT /rider/rider_type/{rider_type_id}/event/{event_id}/user/{user_id}
  * @param {Riders_PUT.model} user.body.required - Rider information
  * @param {integer} rider_type_id.path.required - Riders rider type id
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Returns updated Rider object
  * @returns {Error}  default - Unexpected error
  */
  app.put(base+"/rider_type/:rider_type_id/event/:event_id/user/:user_id/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist"], req.params.event_id, req.params.user_id)
    .then(data => {
      if(data.auth){
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
   * Deletes all riders for a specific event by event id
  * @group Riders - Operations about riders
  * @route DELETE /rider/event/{event_id}/
  * @param {integer} event_id.path.required - Rider event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Rider is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/event/:event_id/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"], req.params.event_id, req.params.user_id)
    .then(data => {
      if(data.auth){
        ridersControl.riderDelete(
          req.params.event_id
          )
          .then((data) => {
          res.send("Riders are deleted");
        })
        .catch((err) => res.send(err))
      } else {
        res.status(400).send("Not authenticated")
      }
    })
  });

  /**
   * Deletes all riders for a specific event and for a specific user
  * @group Riders - Operations about riders
  * @route DELETE /rider/event/{event_id}/user/{user_id}
  * @param {integer} event_id.path.required - Rider event id
  * @param {integer} user_id.path.required - Rider user id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Rider is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/event/:event_id/user/:user_id", (req, res) => {
    auth
      .check_permissions(
        req.headers.token,
        ["Admin", "Organizer", "Artist"],
        req.params.event_id,
        req.params.user_id
      )
      .then(data => {
        if (data.auth) {
          ridersControl
            .ridersDeleteByArtist(req.params.event_id, req.params.user_id)
            .then(data => {
              res.send("Riders are deleted");
            })
            .catch(err => res.send(err));
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => res.send(err));
  });
};
