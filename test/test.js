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

describe('POST /tasks', () => {
    let id = 0;
    it('タスクが登録できるか？', done => {
        agent
            .post('tasks')
            .send({
                title: 'test'
            })
            .expect(201)
            .expect(res => {
                expect(res.body.title).to.be.eq('test');
                expect(res.body.is_done).to.be.false;
                id = res.body.id;
            })
            .end(done);
    });

    it('登録したタスクが取得できるか？', done => {
        agent
            .get(`tasks/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.title).to.be.eq('test');
            })
            .end(done);
    });
});

describe('PUT /tasks/{id}', () => {
    it('タスクを更新できるか？', done => {
        agent
            .put('tasks/0')
            .send({
                title: 'updated',
                is_done: true
            })
            .expect(200)
            .expect(res => {
                expect(res.body.title).to.be.eq('updated');
                expect(res.body.is_done).to.be.true;
            })
            .end(done);
    });
});