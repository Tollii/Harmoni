module.exports = models => {
  const Tickets = models.Tickets;
  const Events = models.Events;
  return {
    ticketGetAll: () =>
      Tickets.findAll().then(tickets => {
        return tickets;
      }),

    ticketGetOne: id =>
      Tickets.findOne({
        where: {
          id: id
        }
      }).then(ticket => ticket),

    ticketGetEventTickets: event_id =>
      Tickets.findAll({
        where: {
          eventID: event_id
        }
      }).then(ticket => ticket),

    ticketCreate: (
      ticket_name,
      price,
      ticket_amount,
      date_start,
      date_end,
      eventID
    ) =>
      Tickets.create(
        {
          ticket_name: ticket_name,
          price: price,
          ticket_amount: ticket_amount,
          date_start: date_start,
          date_end: date_end,
          eventID: eventID
        },
        {
          returning: true
        }
      ).then(data => data),

    ticketUpdate: (
      id,
      ticket_name,
      price,
      ticket_amount,
      date_start,
      date_end
    ) =>
      Tickets.findOne({ where: { id: id } }).then(ticket =>
        Tickets.update(
          {
            ticket_name: ticket_name,
            price: price,
            ticket_amount: ticket_amount,
            date_start: date_start,
            date_end: date_end
          },
          {
            returning: true,
            where: { id: id }
          }
        ).then(ticket => ticket)
      ),

    ticketDelete: id =>
      Tickets.findOne({ where: { id: id } }).then(
        (ticket = Tickets.destroy({ where: { id: id } }).then(x => ticket))
      )
  };
};
