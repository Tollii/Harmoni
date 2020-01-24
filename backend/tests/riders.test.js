const models = require('../models');
const ridersControl = require('../dao/riders')(models);
const rider_typeControl = require('../dao/rider_types')(models);
const userControl = require('../dao/users')(models);
const authControl = require('../dao/authentication')(models);
const rolesControl = require('../dao/roles')(models);
const eventsControl = require('../dao/events')(models);
const event_typesControl = require('../dao/event_types')(models);

describe('riders DAO', () => {

    it('should create one rider', async (done) => {
        await rolesControl.rolesCreate("not_zaim");
        await authControl.signUp("wasd4@wasd.wasd", "wasdwasd", "wasdwasd", "12345678");
        await rider_typeControl.rider_typesCreate("yeet");
        await event_typesControl.event_typesCreate("new event type");
        await  eventsControl.eventCreate("wasd", "cola", new Date('1995-12-17T03:24:00'), new Date('1995-12-19T03:24:00'), "wasdwasd", 10, "Wasasd", 1);
        const res = await ridersControl.riderCreate("additions", 1, 1, 1);
        expect(res.userID).toEqual(1);
        expect(res.rider_typeID).toEqual(1);
        expect(res.eventID).toEqual(1);
        done();
    });

    it('should get all riders', async (done) => {
        rider_typeControl.rider_typesCreate("baby Yoda");
        await ridersControl.riderCreate("yeet", 2, 1, 1);
        const res = await ridersControl.riderGetAll();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get rider with for artist 1', async (done) => {
        const res = await ridersControl.riderGetAllByArtist(1, 1);
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get rider with for event 1', async (done) => {
        const res = await ridersControl.riderGetAllByEvent( 1);
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });
});


