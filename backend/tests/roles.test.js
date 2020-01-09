const models = require('../models');
const rolesControl = require('../dao/roles')(models);


describe('Role Endpoints', () => {


    it('should create one role', async (done) => {
        const res = await rolesControl.rolesCreate("not_zaim");
        expect(res.id).toBeGreaterThanOrEqual(0);
        done();
    });

    it('should get all users', async (done) => {
        let temp = await rolesControl.rolesCreate("not_zaim");
        const res = await rolesControl.roleGetAll();
        expect(res.length).toEqual(2);
        done();
    });

    it('should get user with id 1', async (done) => {
        const res = await rolesControl.roleGetOne(1)
        expect(res.dataValues.id).toEqual(1);
        done();
    });



});


