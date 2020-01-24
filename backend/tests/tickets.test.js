const models = require('../models');
const eventControl = require('../dao/events')(models);
const ticketControl = require('../dao/tickets')(models);
const event_typesControl = require('../dao/event_types')(models);


describe('tickets DAO', () => {

    it('should create one ticket', async (done) => {
        await event_typesControl.event_typesCreate("new event type");
        await eventControl.eventCreate("tickets", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        const res = await ticketControl.ticketCreate("wasd", 499.99, 100, new Date('1995-12-20T03:24:00'), new Date('1995-12-21T03:24:00'), 1);
        expect(res.id).toBeGreaterThanOrEqual(0);
        done();
    });

    it('should get all tickets', async (done) => {
        await ticketControl.ticketCreate("wasd", 499.99, 100, new Date('1995-12-20T03:24:00'), new Date('1995-12-21T03:24:00'), 1);
        const res = await ticketControl.ticketGetAll();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get ticket with id 2', async (done) => {
        const res = await ticketControl.ticketGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should update ticket 1 with ticket_name = yote', async (done) => {
        await ticketControl.ticketUpdate(1, "yote");
        const res = await ticketControl.ticketGetOne(1);
        expect(res.dataValues.ticket_name).toEqual("yote");
        done();
    });

    it('should delete ticket with id 1', async (done) => {
        await ticketControl.ticketDelete(1);
        const res = await ticketControl.ticketGetAll();
        expect(res.length).toEqual(1);
        done();
    });
});


