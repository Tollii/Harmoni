const models = require('../models');
const contractControl = require('../dao/contracts')(models);
const rolesControl = require('../dao/roles')(models);
const userControl = require('../dao/users')(models);
const authControl = require('../dao/authentication')(models);
const eventControl = require('../dao/events')(models);
const event_typesControl = require('../dao/event_types')(models);



describe('contracts DAO', () => {


  it('should create one contract', async (done) => {
    await rolesControl.rolesCreate("new role");
    await authControl.signUp("wasd3@wasd.wasd", "wasdwasd", "wasdwasd", "12345678");
    await event_typesControl.event_typesCreate("new event type");
    await eventControl.eventCreate("new event", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
    const res = await contractControl.contractCreate("new contract", 1, 1);
    expect(res.userID).toBeGreaterThanOrEqual(0);
    expect(res.eventID).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get all contracts', async (done) => {
    const res = await contractControl.contractGetAll();
    expect(res.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('should get contract with userID = 1 and eventID = 1', async (done) => {
    const res = await contractControl.contractGetOne(1,1);
    expect(res.dataValues.userID).toEqual(1);
    expect(res.dataValues.eventID).toEqual(1);
    done();
  });

  it('should delete contract with userID = 1, and eventID = 1', async (done) => {
    await contractControl.contractDelete(1,1);
    const res = await contractControl.contractGetOne(1,1);
    expect(res).toBeNull();
    done();
  });

});
