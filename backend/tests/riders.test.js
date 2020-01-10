const models = require('../models');
const ridersControl = require('../dao/riders')(models);
const rider_typeControl = require('../dao/rider_types')(models);
const userControl = require('../dao/users')(models);
const rolesControl = require('../dao/roles')(models);

describe('riders DAO', () => {

    it('should create one rider', async (done) => {
        await rolesControl.rolesCreate("not_zaim");
        await userControl.userCreate("test", "test@test.test", "testtest", "testtest", "123456789", "image.png");
        await rider_typeControl.rider_typesCreate("yeet");
        const res = await ridersControl.riderCreate("additions", 1, 1, 1);
        expect(res.userID).toEqual(1);
        expect(res.rider_typeID).toEqual(1);
        expect(res.eventID).toEqual(1);
        done();
    });

    it('should get all riders', async (done) => {
        await userControl.userCreate("ridertest", "test@test.test", "testtest", "testtest", "123456789", "image.png");
        await ridersControl.riderCreate("yeet", 1, 1, 2);
        const res = await ridersControl.riderGetAll();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get rider with userID 2', async (done) => {
        const res = await ridersControl.riderGetOne(1, 1, 2);
        expect(res.dataValues.userID).toEqual(2);
        expect(res.dataValues.rider_typeID).toEqual(1);
        expect(res.dataValues.eventID).toEqual(1);
        done();
    });

    it('should update rider with userID = 2 with additions = yote', async (done) => {
        await ridersControl.riderUpdate("yote", 1, 1, 2);
        const res = await ridersControl.riderGetOne(1, 1 ,2);
        expect(res.dataValues.additions).toEqual("yote");
        done();
    });

    it('should delete rider with userID 2', async (done) => {
        await ridersControl.riderDelete(1, 1, 2);
        const res = await ridersControl.riderGetOne(1, 1, 2);
        expect(res).toBeNull();
        done();
    });

});


