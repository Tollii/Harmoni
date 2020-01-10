const models = require('../models');
const eventsControl = require('../dao/events')(models);


describe('/event Endpoints', () => {

    it('should create one event', async (done) => {
        const res = await eventsControl.eventCreate("wasd", "wasd", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", "wasdwasd", false);
        expect(res.id).toBeGreaterThanOrEqual(0);
        done();
    });

    it('should get all events', async (done) => {
         await eventsControl.eventCreate("wasd", "wasd", new Date('1995-12-20T03:24:00'), new Date('1995-12-21T03:24:00'), "wasdwasd", "wasdwasd", false);
         const res = await eventsControl.eventGetAll();
         expect(res.length).toEqual(2);
         done();
    });

    it('should get event with id 2', async (done) => {
        const res = await eventsControl.eventGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should update event 1 with event_name = yote', async (done) => {
        await eventsControl.eventUpdate(1,"yote");
        const res = await eventsControl.eventGetOne(1)
        expect(res.dataValues.event_name).toEqual("yote");
        done();
    });

    it('should delete user with id 1', async (done) => {
        await eventsControl.eventDelete(1);
        const res = await eventsControl.eventGetAll();
        expect(res.length).toEqual(1);
        done();
    });
});


