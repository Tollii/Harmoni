const models = require('../models');
const rider_typeControl = require('../dao/rider_types')(models);


describe('rider_type DAO', () => {

    it('should create one rider type', async (done) => {
        const res = await rider_typeControl.rider_typesCreate(":)");
        expect(res.id).toBeGreaterThanOrEqual(1);
        done();
    });

    it('should get all rider types', async (done) => {
        const temp = await rider_typeControl.rider_typesCreate(":(");
        const res = await rider_typeControl.rider_typesGetAll();
        expect(res.length).toBeGreaterThanOrEqual(2);
        done();
    });

    it('should get rider type with id 2', async (done) => {
        const res = await rider_typeControl.rider_typesGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should delete event with id 2', async (done) => {
        await rider_typeControl.rider_typesDelete(2);
        const res = await rider_typeControl.rider_typesGetOne(2);
        expect(res).toBeNull();
        done();
    });

});


