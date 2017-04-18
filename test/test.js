const request = require('supertest');
const expect = require('chai').expect;
const agent = request.agent('http://localhost:10080/v1/');
const Server = require('../server/Server');

describe('CRUDできるか？', () => {
    before((done) => {
        const server = new Server.default();
        server.start();
        done();
    });

    it('ダミーデータが取得できるか？', (done) => {
        agent
            .get('tasks')
            .expect(200)
            .expect(res => {
                expect(res.body.length).to.be.eq(1);
            })
            .end(done);
    });
});