
/**
 * @typedef Tickets
 * @property {string} ticket_name.required - Name of ticket
 * @property {double} price.required - Price of ticket
 * @property {integer} ticket_amount.required - Amount of tickets
 * @property {string} date_start.required - Start date of ticket sale
 * @property {string} date_end.required - End date of ticket sale
 */

module.exports (app, models, base) => {
  const ticketControl = require('../dao/tickets')(models)

  /**
  * @group Ticket - Operations about ticket
  * @route GET /ticket/
  * @returns {object} 200 - An array of ticket info
  * @returns {Error} default - Unexpected error
  */
  app.get(base, (req, res) => {
    ticketControl.ticketAll().then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Ticket - Operations about ticket
  * @route GET /ticket/{id}/
  * @param {integer} id.path.required - Ticket id
  * @returns {object} 200 - An array of ticket info
  * @returns {Error} default - Unexpected error
  */
  app.get(base+":id", (req, res) => {
    ticketControl.ticketOne(req.params.id).then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Ticket - Operations about ticket
  * @route POST /ticket/
  * @param {Tickets.model} user.body.requred - Ticket information
  * @returns {object} 200 - Returns Ticket object
  * @returns {Error} default - Unexpected error
  */
  app.post(base, (req, res) => {
    ticketControl.ticketCreate(
      req.body.ticket_name,
      req.body.price,
      req.body.ticket_amount,
      req.body.date_start,
      req.body.date_end
    )
    .then((data) => {
      res.send(data);
    })
  });

  /**
  * @group Ticket - Operations about ticket
  * @route PUT /ticket/{id}/
  * @param {integer} id.path.required - Ticket id
  * @param {Tickets.model} user.body.requred - Ticket information
  * @returns {object} 200 - Returns updated Ticket object
  * @returns {Error} default - Unexpected error
  */
  app.put(base+"/:id", (req, res) => {
    ticketControl.ticketUpdate(
      req.params.id,
      req.body.ticket_name,
      req.body.price,
      req.body.ticket_amount,
      req.body.date_start,
      req.body.date_end
    )
    .then(() => {
      res.sendStatus(200).send('Ticket is updated');
    })
    .catch((err) => {
      res.sendStatus(400).send('Ticket is not updated');
    })
  });

  /**
  * @group Ticket - Operations about ticket
  * @route DELETE /ticket/{id}/
  * @param {integer} id.path.requred - Ticket information
  * @returns {object} 200 - Ticket is deleted
  * @returns {Error} default - Unexpected error
  */
  app.delete(base+"/:id", (req, res) => {
    ticketControl.ticketDelete(req.params.id)
      .then((data) => {
        res.send(data);
      })
  });

}
