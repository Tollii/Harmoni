const app = require('../server');
const request = require('supertest');



describe('Get Endpoints', () => {
    it('should get all users', async (done) => {
        const res = await request(app)
            .get('/users')
        console.log(res);
        expect(res.status).toBe(200);
    })
})


