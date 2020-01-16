module.exports = models => {
  const Event_types = models.Event_Types;
  return {
    event_typesGetAll: async () =>
      Event_types.findAll().then(event_types => event_types),

    event_typesGetOne: async id =>
      Event_types.findOne({ where: { id: id } }).then(
        event_types => event_types
      ),

    event_typesDelete: async id =>
      Event_types.findOne({ where: { id: id } }).then(
        Event_types.destroy({ where: { id: id } }).then(
          event_types => event_types
        )
      ),

    event_typesCreate: async event_type =>
      Event_types.create({
        event_type: event_type
      }).then(event_type => event_type),

    event_typesUpdate: async (id, event_type) => {
      return Event_types.findOne({ where: { id: id } }).then(() => {
        return Event_types.update(
          { event_type: event_type },
          { where: { id: id } }
        ).then(event_types => event_types);
      });
    }
  };
};
