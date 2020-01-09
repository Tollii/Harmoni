module.exports = models => {
  const Event = models.Events;
  return {
    eventGetAll: async () => Event.findAll().then(events => events),

    eventGetOne: async id =>
      Event.findOne({
        where: {
          id: id
        }
      }).then(events => events),

    eventDelete: async id =>
      Event.findOne({
        where: {
          id: id
        }
      }).then(
        Event.destroy({
          where: {
            id: id
          }
        }).then(events => events)
      ),

    eventAmount: async () => Event.count().then(events => events),

    eventUpdate: async (
      id,
      event_name,
      location,
      event_start,
      event_end,
      personnel,
      description,
      archived,
      event_typeID
    ) => {
      return Event.findOne({
        where: {
          id: id
        }
      }).then(() => {
        return Event.update(
          {
            event_name: event_name,
            location: location,
            event_start: event_start,
            event_end: event_end,
            personnel: personnel,
            description: description,
            archived: archived,
            event_typeID: event_typeID
          },
          {
            where: {
              id: id
            }
          }
        ).then(events => events);
      });
    },

    eventCreate: async (
      event_name,
      location,
      event_start,
      event_end,
      personnel,
      description,
      archived,
      event_typeID
    ) =>
      Event.create({
        event_name: event_name,
        location: location,
        event_start: event_start,
        event_end: event_end,
        personnel: personnel,
        description: description,
        archived: archived,
        event_typeID: event_typeID
      }).then(events => events)
  };
};
