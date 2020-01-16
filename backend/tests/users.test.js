const models = require('../models');
const userControl = require('../dao/users')(models);
const rolesControl = require('../dao/roles')(models);


describe('Get Endpoints', () => {

    it('should create one user', async (done) => {
        let temp = await rolesControl.rolesCreate("not_zaim");
        const res = await userControl.userCreate("test", "test@test.test", "wasdwasd", "wasdwasd", "12345678", "image.png");
        expect(res.id).toBeGreaterThanOrEqual(0);
        done();
    });

    it('should get all users', async (done) => {
        await userControl.userCreate("was", "wasd@wasd.wasd", "wasdwasd", "wasdwasd", "12345678", "image.png");
        await userControl.userCreate("wasd", "wasd@test.no", "wasdwasd", "wasdwasd", "12345678", "image.png");
        const res = await userControl.userGetAll();
        expect(res.length).toBeGreaterThanOrEqual(3);
        done();
    });

    it('should get user with id 2', async (done) => {
        const res = await userControl.userGetOne(2);
        expect(res.dataValues.id).toEqual(2);
        done();
    });

    it('should update user 1 with username = yote', async (done) => {
        await userControl.userUpdate(1, "yote");
        const res = await userControl.userGetOne(1);
        expect(res.dataValues.username).toEqual("yote");
        done();
    });

    it('should delete user with id 1', async (done) => {
        await userControl.userDelete(3);
        const res = await userControl.userGetOne(3);
        expect(res).toBeNull();
        done();
    });


});
