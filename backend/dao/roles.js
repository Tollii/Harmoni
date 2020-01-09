module.exports = (models) => {
  const Roles = models.Roles
  return {
    roleGetAll: async () => Roles.findAll()
    .then(roles => {
      console.log("Fetched all roles");
      return roles;
    }),

    roleGetOne: async (id) => Roles.findOne({
      where: {
        id: id
      }
    })
    .then(role => role),

  }
}
