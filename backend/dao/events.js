module.exports = models => {
  const Event = models.Events;
  const Contract = models.Contracts;
    var Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    return {
    eventGetAll: async () => Event.findAll().then(events => events),
        eventGetCarouselEvent:async ()=>Event.findAll({
            where: {
                archived: false
            },limit:15,order:[['event_start','DESC']]
        }).then(events => events),

      eventGetAllUnarchived: async () => Event.findAll({
          where: {
              archived: false
          }
      }).then(events => events),

    eventGetOne: async id =>
      Event.findOne({
        where: {
          id: id
        }
      }).then(events => events),

        eventGetByUser: async (id)  =>
            Event.findAll({
                include: [{
                    model: Contract,
                    as: 'Contract',
                    where: {
                        userID: id
                    }
                }]
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
      event_image,
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
            event_image: event_image,
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

      eventArchive: async (
          current_time,
      ) => {
          console.log("eventArchive called");
          return Event.update(
                  {
                      archived: true
                  },
                  {
                      where: {
                          event_end: {
                              // if current_time < event_end
                              [Op.lt]: current_time
                          }
                      }
                  }
              ).then(events => events);
          },


    eventCreate: async (
      event_name,
      location,
      event_start,
      event_end,
      personnel,
      description,
      event_typeID
    ) =>
      Event.create({
        event_name: event_name,
        location: location,
        event_start: event_start,
        event_end: event_end,
        personnel: personnel,
        description: description,
        event_typeID: event_typeID
      }).then(events => events)
  };
};
