module.exports = (models) => {
  const Contract = models.Contracts;
  const User = models.Users;
  return {
    contractGetAll: () => Contract.findAll()
    .then( contracts => {
      return contracts;
    }),

    contractGetOne: (user_id, event_id) => Contract.findOne({
      where: {
        userID: user_id,
        eventID: event_id
      }
    })
    .then(contract => contract),

    contractGetAllByRole: (event_id, roleId) => User.findAll({
      where:{
        roleID: roleId
      },
      include: [{
        model: Contract,
        where: {
          eventID: event_id
        }
      }]
    })
    .then(data => data),

    contractCreate: (contract, userID, eventID) => Contract.create({
      contract:contract,
      userID:userID,
      eventID:eventID
    },
    {
      returning: true
    })
    .then(data => data),

    contractCreateNoContract: (userID, eventID) => Contract.create({
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

