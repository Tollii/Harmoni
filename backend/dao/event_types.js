module.exports = models => {
  const Event_types = models.Event_Types;
  return {
    event_typesAll: () =>
      Event_types.findAll().then(event_types => event_types),

    event_typesOne: id =>
      Event_types.findOne({ where: { id: id } }).then(
        event_types => event_types
      ),

    event_typesDelete: id =>
      Event_types.findOne({ where: { id: id } }).then(
        Event_types.destroy({ where: { id: id } }).then(
          event_types => event_types
        )
      ),

    event_typesCreate: event_type =>
      Event_types.create({
        event_type: event_type
      }).then(event_type => event_type),

    event_typesUpdate: (id, event_type) => {
      return Event_types.findOne({ where: { id: id } }).then(() => {
        return Event_types.update(
          { event_type: event_type },
          { where: { id: id } }
        ).then(event_types => event_types);
      });
    }
  };
};
