module.exports = (models) => {
  const Contract = models.Contract;
  return {
    contractAll: () => Contract.findAll()
    .then( contracts => {
      return contracts;
    }),

    contractOne: (id) => Contract.findOne({
      where: {
        id: id
      }
    })
    .then(contract => contract),

    contractCreate: () => Contract.create({

    },
    {
      returning: true
    })
    .then(data => data),

    contractUpdate: (id, ) => Contract.findOne({ where: {id: id}})
      .then(contract => Contract.update({

      },
      {
        returning: true,
        where: {id: id}
      })
      .then(contract => contract)),

    contractDelete: (id) => Contract.findOne({ where: {id: id}})
      .then(contract => Contract.destroy({where: {id:id}})
        .then(x => contract)
      ),
  }
}

