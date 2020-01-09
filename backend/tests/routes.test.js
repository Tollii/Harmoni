const models = require('../models');
const userControl = require('../dao/users')(models);


describe('Get Endpoints', () => {
    it('should get all users', async (done) => {

        const res = await userControl.userGetAll();

        console.log(res);
        expect(res).toEqual([]);
        done();
    })
})


