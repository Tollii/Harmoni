/**
 * @typedef Tickets
 * @property {string} ticket_name.required - Name of ticket
 * @property {number} price.required - Price of ticket
 * @property {integer} ticket_amount.required - Amount of tickets
 * @property {string} date_start.required - Start date of ticket sale
 * @property {string} date_end.required - End date of ticket sale
 * @property {integer} eventID.required - Id of event ticket belongs to
 */

module.exports = (app, models, base, auth) => {
  const ticketControl = require("../dao/tickets")(models);

  /**
   * @group Ticket - Operations about ticket
   * @route GET /ticket/
   * @param {string} token.header.required - token
   * @returns {object} 200 - An array of ticket info
   * @returns {Error} default - Unexpected error
   */
  app.get(base, (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin",
        "Organizer",
        "Artist",
        "User"
      ])
      .then(data => {
        if (data.auth) {
          ticketControl
            .ticketGetAll()
            .then(data => {
              res.send(data);
            })
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
   * @group Ticket - Operations about ticket
   * @route GET /ticket/{id}/
   * @param {integer} id.path.required - Ticket id
   * @returns {object} 200 - An array of ticket info
   * @returns {Error} default - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    ticketControl.ticketGetOne(req.params.id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Ticket - Operations about ticket
   * @route GET /ticket/event/{event_id}/
   * @param {integer} event_id.path.required - Eventticket id
   * @returns {object} 200 - An array of ticket info
   * @returns {Error} default - Unexpected error
   */
  app.get(base + "/event/:event_id", (req, res) => {
    ticketControl.ticketGetEventTickets(req.params.event_id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Ticket - Operations about ticket
   * @route POST /ticket/
   * @param {Tickets.model} user.body.required - Ticket information
   * @param {string} token.header.required - token
   * @returns {object} 200 - Returns Ticket object
   * @returns {Error} default - Unexpected error
   */
  app.post(base, (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin",
        "Organizer"
      ])
      .then(data => {
        if (data.auth) {
          ticketControl
            .ticketCreate(
              req.body.ticket_name,
              req.body.price,
              req.body.ticket_amount,
              req.body.date_start,
              req.body.date_end,
              req.body.eventID
            )
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
   * @group Ticket - Operations about ticket
   * @route PUT /ticket/{id}/
   * @param {integer} id.path.required - Ticket id
   * @param {Tickets_PUT.model} user.body.required - Ticket information
   * @param {string} token.header.required - token
   * @returns {object} 200 - Returns updated Ticket object
   * @returns {Error} default - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin",
        "Organizer"
      ])
      .then(data => {
        if (data.auth) {
          ticketControl
            .ticketUpdate(
              req.params.id,
              req.body.ticket_name,
              req.body.price,
              req.body.ticket_amount,
              req.body.date_start,
              req.body.date_end,
              req.body.eventID
            )
            .then(() => {
              res.sendStatus(200).send("Ticket is updated");
            })
            .catch(err => {
              res.sendStatus(400).send("Ticket is not updated");
            });
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });

  /**
   * @group Ticket - Operations about ticket
   * @route DELETE /ticket/{id}/
   * @param {integer} id.path.required - Ticket id
   * @param {string} token.header.required - token
   * @returns {object} 200 - Ticket is deleted
   * @returns {Error} default - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    auth
      .check_permissions(req.headers.token, [
        "Admin",
        "Organizer"
      ])
      .then(data => {
        if (data.auth) {
          ticketControl.ticketDelete(req.params.id).then(data => {
            res.send(data);
          });
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });
};
