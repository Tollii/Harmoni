module.exports = (models) => {
  const Roles = models.Roles
  return {
    roleGetAll: async () => Roles.findAll()
    .then(roles => {
      return roles;
    }),

    roleGetOne: async (id) => Roles.findOne({
      where: {
        id: id
      }
    })
    .then(role => role),


    rolesCreate: async (role_name) => Roles.create({
          role_name:role_name,
        },
        {
          returning:true
        }).then(data => data),

  }
}
