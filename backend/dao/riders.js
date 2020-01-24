module.exports = (models) => {
  const Riders = models.Riders;
  return {
    riderGetAll: async () => Riders.findAll()
    .then(riders => {
      return riders;
    }),

    riderGetAllByEvent: async (eventID) => Riders.findAll({
      where: {
        eventID: eventID
      }
    })
    .then(riders => {
      return riders;
    }),

    riderGetAllByArtist: async (eventID, userID) => Riders.findAll({
      where: {
        eventID: eventID,
        userID: userID
      }
    })
    .then(riders => {
      return riders;
    }),

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

    riderDelete: async (eventID) => Riders.destroy({
        where: {
          eventID: eventID
        }
      })
      .then(x => x),

    ridersDeleteByArtist: async (eventID, userID) => Riders.destroy({
      where: {
        eventID: eventID,
        userID: userID
      }
    })
    .then(x => x),
  }
}
