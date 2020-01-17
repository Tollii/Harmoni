const models = require('../models');

const event_typesControl = require('../dao/event_types')(models);


describe('Event_types DAO', () => {

  it('should create one event_type', async (done) => {
    const res = await event_typesControl.event_typesCreate("new event type");
    expect(res.id).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get all event_types', async (done) => {
    await event_typesControl.event_typesCreate("other new event type");
    const res = await event_typesControl.event_typesGetAll();
    expect(res.length).toBeGreaterThanOrEqual(2);
    done();
  });

  it('should get event_type with id 1', async (done) => {
    const res = await event_typesControl.event_typesGetOne(1);
    expect(res.id).toEqual(1);
    done();
  });

  it('should update event_type with id 1, with event_type = a event type', async (done) => {
    await event_typesControl.event_typesUpdate(1, "a event type");
    const res = await event_typesControl.event_typesGetOne(1);
    expect(res.dataValues.event_type).toEqual("a event type");
    done();
  });

  it('should delete event_type with id 1', async (done) => {
    await event_typesControl.event_typesDelete(2);
    const res = await event_typesControl.event_typesGetOne(2);
    expect(res).toBeNull();
    done();
  });

});
