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

/**
 * @typedef Riders_Event
 * @property {string} additions.required - Contract link
 * @property {integer} rider_typeID.required - Rider type for rider
 * @property {integer} userID.required - User for rider
 */

 /**
 * @typedef Tickets_Event
 * @property {string} ticket_name.required - Name of ticket
 * @property {number} price.required - Price of ticket
 * @property {integer} ticket_amount.required - Amount of tickets
 * @property {string} date_start.required - Start date of ticket sale
 * @property {string} date_end.required - End date of ticket sale
 */

 /**
 * @typedef Events_POST
 * @property {string} event_name.required - Full name
 * @property {string} location.required - Event location
 * @property {string} event_start.required - Event start date
 * @property {string} event_end.required - Event end date
 * @property {string} personnel.required - Text request of personnel
 * @property {string} description.required - Text description of event
 * @property {boolean} archived.required - Verification of archived event
 * @property {integer} event_typeID.required - ID of event_type
 * @property {Array.<integer>} artists.required - ID of artists
 * @property {Array.<Riders_Event>} riders.required - riders
 * @property {Array.<Tickets_Event>} tickets.required - tickets
 */

module.exports = (app, models, base, auth) => {
  const eventControl = require("../dao/events")(models);
  const contractControl = require("../dao/contracts")(models);
  const riderControl = require("../dao/riders")(models);
  const ticketControl = require("../dao/tickets")(models);

  /**
   * @group Events - Operations about event
   * @route GET /event/
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */

  app.get(base, (req, res) => {
    console.log("event called")
    eventControl.eventGetAllUnarchived().then(data => {
      console.log("event DAO called")
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
   * @route PUT /event_archive/
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */

  app.put("/event_archive/", (req, res) => {
    console.log("Put eventArchive called");
     let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
     eventControl.eventArchive(currentDate)
        .then(() => {
          res.sendStatus(200).send("Events are archived");
        })
        .catch(err => {
          res.sendStatus(400).send("Event are NOT archived");
        });
  });
  /**
   * @group Events - Operations about event
   * @route POST /event/
   * @param {Events_POST.model} event.body.required - All attributes of event
   * @param {string} token.query.required - token
   * @returns {object} 200 - Add an event to the DB
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl.eventCreate(
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
          req.body.artists.map(artist=> {
            contractControl.contractCreateNoContract(
              artist,
              data.id
            )
            .catch(err => console.log(err))
          })
          req.body.tickets.map(ticket => {
            ticketControl.ticketCreate(
              ticket.ticket_name,
              ticket.price,
              ticket.ticket_amount,
              ticket.date_start,
              ticket.date_end,
              data.id
            )
            .catch(err => console.log(err))
          })
          return data
        })
        .then(data => {
          req.body.riders.map(rider => {
            riderControl.riderCreate(
              rider.additions,
              rider.rider_typeID,
              data.dataValues.id,
              rider.userID
            )
            .catch(err => console.log(err))
          })
        })
        .then(()=> {
          res.send("Event created successfully")
        })
        .catch(err => console.log(err))
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
};