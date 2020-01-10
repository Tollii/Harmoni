const models = require('../models');
const permissionsControl = require('../dao/permissions')(models);

describe('Permission DAO', () => {

  it('should create one permission', async (done) => {
    const res = await permissionsControl.permissionsCreate("new");
    expect(res.id).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get all permissions', async (done) => {
    await permissionsControl.permissionsCreate("new2")
    const res = await permissionsControl.permissionsGetAll();
    expect(res.length).toBeGreaterThanOrEqual(2);
    done();
  });

  it('should get permisssion with id 1', async (done) => {
    const res = await permissionsControl.permissionsGetOne(1);
    expect(res.dataValues.id).toEqual(1);
    done();
  });
});
