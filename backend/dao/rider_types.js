module.exports = (models) => {
  const Rider_Types = models.Rider_Types;
  return {
    rider_typesGetAll: async () => Rider_Types.findAll()
    .then( rider_type => {
      return rider_type;
    }),

    rider_typesGetOne: async (id) => Rider_Types.findOne({
      where: {
        id: id
      }
    })
    .then(user => user),

    rider_typesCreate: async (description) => Rider_Types.create({
      description:description
    },
    {
      returning: true
    })
    .then(data => data),

    rider_typesDelete: async (id) => Rider_Types.findOne({ where: {id: id}})
    .then(rider_type => Rider_Types.destroy({where: {id:id}})
      .then(x => rider_type)
    ),
  }
}

