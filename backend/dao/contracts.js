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

    contractGetAllByEvent: (event_id) => User.findAll({
        include: [{
            model: Contract,
            where: {
                eventID: event_id
            }
        }]
    }).then(data => data),


    contractCreateNoContract: (userID, eventID) => Contract.create({
      userID:userID,
      eventID:eventID
    },
    {
      returning: true
    })
    .then(data => data),

    contractUpdate: async (
        userID,
        eventID,
        contract
    ) => {
      return Contract.findOne({
        where: {
          userID: userID,
          eventID: eventID
        }
      }).then(() => {
        return Contract.update(
            {
              contract: contract
            },
            {
              where: {
                userID: userID,
                eventID: eventID
              }
            }
        ).then(events => events);
      });
    },

    contractCountOne: (user_id, event_id) => Contract.count({
      where: {
        userID: user_id,
        eventID: event_id
      }
    })
        .then(contract => contract),


    getContractsByEvent: async (eventId) => {
        return Contract.findAll({
          where: {
            eventID: eventId
          },

        }).then(contract => contract)
    },


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

    getContractVolunteersPerEvent: async (eventId) => {
      return User.findAndCountAll({
        where: {
          roleID: 1
        },
        include: [{
          model: Contract,
          where: {
            eventID: eventId
          }
      }],
      }).then(contracts => contracts)
    },
  }

}

