const models = require('../models');
const permissions_per_roleControl = require('../dao/permissions_per_role')(models);
const rolesControl = require('../dao/roles')(models);
const permissionsControl = require('../dao/permissions')(models);


describe('Permissions_per_role DAO', () => {


  it('should create one permissions_per_role', async (done) => {
    await rolesControl.rolesCreate("role");
    await permissionsControl.permissionsCreate("new permission");
    const res = await permissions_per_roleControl.permissions_per_roleCreate(1,1);
    expect(res.roleID).toBeGreaterThanOrEqual(0);
    expect(res.permissionID).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get all permissions_per_role', async (done) => {
    await permissionsControl.permissionsCreate("other permission");
    await permissions_per_roleControl.permissions_per_roleCreate(1,2);
    const res = await permissions_per_roleControl.permissions_per_roleGetAll();
    expect(res.length).toEqual(2);
    done();
  });

  it('should get permissions_per_role with roleID 1 and permissionID 1', async (done) => {
    const res = await permissions_per_roleControl.permissions_per_roleGetOne(1,1);
    expect(res.roleID).toEqual(1);
    expect(res.permissionID).toEqual(1);
    done();
  });
});
