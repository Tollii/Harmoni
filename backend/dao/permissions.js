module.exports = models => {
  const Permissions = models.Permissions;
  return {
    permissionsGetAll: async () =>
      Permissions.findAll().then(permissions => permissions),

    permissionsGetOne: async id =>
      Permissions.findOne({ where: { id: id } }).then(
        permissions => permissions
      ),

    permissionsCreate: async description =>
      Permissions.create({
        description: description
      }).then(permissions => permissions)
  };
};
