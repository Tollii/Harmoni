module.exports = (models) => {
  const Riders = models.Riders;
  return {
    riderGetAll: async () => Riders.findAll()
    .then(riders => {
      console.log("Fetched all riders");
      return riders;
    }),

    riderGetAllByEvent: async (eventID) => Riders.findAll({
      where: {
        eventID: eventID
      }
    })
    .then(riders => {
      console.log("Fetched all riders from given event");
      return riders;
    }),

    riderGetOne: async (rider_typeID, eventID, userID) => Riders.findOne({
      where: {
        rider_typeID: rider_typeID,
        eventID: eventID,
        userID: userID
      }
    })
    .then(rider => rider),

    riderCreate: async (additions, rider_typeID, eventID, userID) => Riders.create({
      additions: additions,
      rider_typeID: rider_typeID,
      eventID: eventID,
      userID: userID
    },
    {
      returning: true
    })
    .then(data => data),

    riderUpdate: async (additions, rider_typeID, eventID, userID) => Riders.findOne({
      where: {
        rider_typeID: rider_typeID,
        eventID: eventID,
        userID: userID
      }
    })
    .then(rider => Riders.update({
      additions: additions
    },
    {
      returning: true,
      where: {
        rider_typeID: rider_typeID,
        eventID: eventID,
        userID: userID
      }
    })
    .then(rider => rider)),

    riderDelete: async (rider_typeID, eventID, userID) => Riders.findOne({
      where: {
        rider_typeID: rider_typeID,
        eventID: eventID,
        userID: userID
      }
    })
    .then(rider = Riders.destroy({
        where: {
          rider_typeID: rider_typeID,
          eventID: eventID,
          userID: userID
        }
      })
      .then(x => rider)
    ),
  }
}
