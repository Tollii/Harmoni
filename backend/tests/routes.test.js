const app = require('../server');
const request = require('supertest');
const models = require('../models');
const userControl = require('../dao/users')(models);


describe('Get Endpoints', () => {
    it('should get all users', async (done) => {

        const res = await userControl.userAll();

        console.log(res);
        expect(res).toEqual([]);
        done();
    })
})


