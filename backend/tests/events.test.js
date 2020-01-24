const models = require('../models');
const eventsControl = require('../dao/events')(models);
const event_typesControl = require('../dao/event_types')(models);


describe('events DAO', () => {

    it('should create one event', async (done) => {
        await event_typesControl.event_typesCreate("new event type");
        const res = await eventsControl.eventCreate("wasd", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        expect(res.id).toBeGreaterThanOrEqual(1);
        done();
    });

    it('should get all events', async (done) => {
        await eventsControl.eventCreate("chat", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        const res = await eventsControl.eventGetAll();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get all events for Carousel', async (done) => {
        await eventsControl.eventCreate("chat", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        const res = await eventsControl.eventGetCarouselEvent();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('Archive all timed out events and pull the one that should be unarchived', async (done) => {
        await eventsControl.eventCreate("chat", "cola", new Date('1995-12-17T03:24:00'), new Date('2050-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        await eventsControl.eventArchive();
        const res = await eventsControl.eventGetAllUnarchived();
        expect(res.length).toEqual(1);
        done();
    });


    it('should get event with id 2', async (done) => {
        const res = await eventsControl.eventGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should update event 2 with event_name = yote', async (done) => {
        await eventsControl.eventUpdate(2,"yote");
        const res = await eventsControl.eventGetOne(2);
        expect(res.dataValues.event_name).toEqual("yote");
        done();
    });

    it('should delete event with id 2', async (done) => {
        let  test = await eventsControl.eventDelete(2);
        const res = await eventsControl.eventGetOne(2);
        expect(res).toBeNull();
        done();
    });

});


