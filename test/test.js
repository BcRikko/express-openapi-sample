const request = require('supertest');
const expect = require('chai').expect;
const agent = request.agent('http://localhost:10080/v1/');
const Server = require('../server/Server');

const server = new Server.default();
server.start();

describe('GET /tasks', () => {
    it('ダミーデータが取得できるか？', done => {
        agent
            .get('tasks')
            .expect(200)
            .expect(res => {
                expect(res.body.length).to.be.eq(1);
            })
            .end(done);
    });
});

describe('GET /tasks/{id}', () => {
    it('正常: ID指定でダミーデータが取得できるか？', done => {
        agent
            .get('tasks/0')
            .expect(200)
            .expect(res => {
                expect(res.body.id).to.be.eq(0);
            })
            .end(done);
    });

    it('異常: ID指定でダミーデータが取得できるか？', done => {
        agent
            .get('tasks/1')
            .expect(200)
            .expect(res => {
                expect(res.body.length).to.be.eq(0);
            })
            .end(done);
    });
});