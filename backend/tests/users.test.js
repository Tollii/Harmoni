const models = require('../models');
const userControl = require('../dao/users')(models);
const rolesControl = require('../dao/roles')(models);
const authControl = require('../dao/authentication')(models);


describe('Get Endpoints', () => {

    it('should create one user', async (done) => {
        await rolesControl.rolesCreate("not_zaim");
        const res = await authControl.signUp("wasd@wasd.wasd", "wasdwasd", "wasdwasd", "12345678");
        // expect(res).toEqual(true);
        done();
    });

    it('should get all users', async (done) => {
        await rolesControl.rolesCreate("not_zaim");
        await authControl.signUp("wasd1@wasd.wasd", "wasdwasd1", "wasdwasd1", "12345678");
        await authControl.signUp("wasd2@wasd.wasd", "wasdwasd2", "wasdwasd2", "12345678");
        const res = await userControl.userGetAll();
        expect(res.length).toBeGreaterThanOrEqual(3);
        done();
    });

    it('should get user with id 2', async (done) => {
        const res = await userControl.userGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should get user by email wasd@wasd.wasd', async (done) => {
        const res = await userControl.userGetOneByEmail("wasd@wasd.wasd");
        expect(res.dataValues.email).toEqual("wasd@wasd.wasd");
        done();
    });

    it('should update user 1 with username = yote', async (done) => {
        await userControl.userUpdate(1, "yote");
        const res = await userControl.userGetOne(1);
        expect(res.dataValues.username).toEqual("yote");
        done();
    });

    it('should update user 1 with password = yote', async (done) => {
        await userControl.changePassword(1, "yote");
        const res = await userControl.userGetOne(1);
        expect(res.dataValues.hash).toEqual("yote");
        done();
    });

});
