module.exports = (models) => {
  const Contract = models.Contracts;
  return {
    contractAll: () => Contract.findAll()
    .then( contracts => {
      return contracts;
    }),

    contractOne: (user_id, event_id) => Contract.findOne({
      where: {
        userID: user_id,
        eventID: event_id
      }
    })
    .then(contract => contract),

    contractCreate: (contract, userID, eventID) => Contract.create({
      contract:contract,
      userID:userID,
      eventID:eventID
    },
    {
      returning: true
    })
    .then(data => data),

    contractDelete: (user_id, event_id) => Contract.findOne({
      where: {
          userID: user_id,
          eventID: event_id
        }
      })
      .then(contract => Contract.destroy({
        where: {
          userID: user_id,
          eventID: event_id
        }
      })
      .then(x => contract)
      ),
  }
}

