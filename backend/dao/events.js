module.exports = (models) => {
const Event = models.Events;
  return {
    eventAll: () => Event.findAll().then(events => events),

    eventOne: id =>
      Event.findOne({
        where: {
          id: id
        }
      }).then(events => events),

    eventDelete: id =>
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

    eventAmount: () => Event.count().then(events => events),

    eventUpdate: (
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

    eventCreate: (
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
