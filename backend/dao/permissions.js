module.exports = models => {
  const Permissions = models.Permissions;
  return {
    permissionsGetAll: async () =>
      Permissions.findAll().then(permissions => permissions),

    permissionsGetOne: async id =>
      Permissions.findOne({ where: { id: id } }).then(
        permissions => permissions
      ),

    persmissionsDelete: async id =>
      Permissions.findOne({ where: { id: id } }).then(
        Permissions.destroy({ where: { id: id } }).then(
          permissions => permissions
        )
      ),

    permissionsCreate: async description =>
      Permissions.create({
        description: description
      }).then(permissions => permissions),

    permissionsUpdate: async (id, description) => {
      return Permissions.findOne({ where: { id: id } }).then(() => {
        return Permissions.update(
          { description: description },
          { where: { id: id } }
        ).then(permissions => permissions);
      });
    }
  };
};
