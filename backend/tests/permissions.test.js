const models = require('../models');
const permissionControl = require('../dao/permissions')(models);

describe('Get Endpoints', () => {

  it('should create one permission', async (done) => {
    const res = await permissionControl.permissionsCreate("new");
    expect(res.id).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get all permissions', async (done) => {
    await permissionControl.permissionsCreate("new2")
    const res = await permissionControl.permissionsGetAll();
    expect(res.length).toEqual(2);
    done();
  });

  it('should get permisssion with id 1', async (done) => {
    const res = await permissionControl.permissionsGetOne(1);
    expect(res.dataValues.id).toEqual(1);
    done();
  });
});
