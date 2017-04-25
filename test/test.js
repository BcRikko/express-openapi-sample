const expect = require('chai').expect;
const request = require('supertest');
const superagent = require('superagent');
const agent = request.agent('http://localhost:10080/v1/');
const Server = require('../server/Server');

const server = new Server.default();
server.start();

describe('GET /tasks', () => {
    before(done => {
        const request = param => {
            return new Promise(resolve => {
                superagent
                    .post('http://localhost:10080/v1/tasks')
                    .send({ title: param.title, is_done: param.is_done })
                    .end((err, res) => {
                        resolve();
                    });
            });
        };

        // sqlite3がロックされるので直列処理
        Promise.resolve()
            .then(() => { return request({ title: 'dummy1', is_done: false }); })
            .then(() => { return request({ title: 'dummy2', is_done: false }); })
            .then(() => { return request({ title: 'dummy3', is_done: false }); })
            .then(() => { return request({ title: 'dummy4', is_done: false }); })
            .then(() => { return request({ title: 'dummy5', is_done: false }); })
            .then(() => { done(); });
    });

    it('ダミーデータが取得できるか？', done => {
        agent
            .get('tasks')
            .expect(200)
            .expect(res => {
                expect(res.body.tasks.length).to.be.eq(5);
            })
            .end(done);
    });


    it('offsetとlimitを指定してデータが取得できるか？', done => {
        agent
            .get('tasks')
            .query({
                offset: 1,
                limit: 2
            })
            .expect(200)
            .expect(res => {
                expect(res.body.tasks.length).to.be.eq(2);
                expect(res.body.total).to.be.eq(2);
            })
            .end(done);
    });
});

describe('GET /tasks/{id}', () => {
    it('ID指定でダミーデータが取得できるか？', done => {
        agent
            .get('tasks/1')
            .expect(200)
            .expect(res => {
                expect(res.body.task.id).to.be.eq(1);
            })
            .end(done);
    });

    it('存在しないタスクはNot Foundになるか？', done => {
        agent
            .get('tasks/999')
            .expect(404)
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
                expect(res.body.task.title).to.be.eq('test');
                expect(res.body.task.is_done).to.be.false;
                id = res.body.task.id;
            })
            .end(done);
    });

    it('型が違う場合はBad Requestになるか？', done => {
        agent
            .post('tasks')
            .send({
                title: 1
            })
            .expect(400)
            .end(done);
    });

    it('パラメータが不足した場合はBad Requestになるか？', done => {
        agent
            .post('tasks')
            .expect(400)
            .end(done);
    });

    it('登録したタスクが取得できるか？', done => {
        agent
            .get(`tasks/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.task.title).to.be.eq('test');
            })
            .end(done);
    });
});

describe('PUT /tasks/{id}', () => {
    it('タスクを更新できるか？', done => {
        agent
            .put('tasks/1')
            .send({
                title: 'updated',
                is_done: true
            })
            .expect(200)
            .expect(res => {
                expect(res.body.task.title).to.be.eq('updated');
                expect(res.body.task.is_done).to.be.true;
            })
            .end(done);
    });

    it('型が違う場合はBad Requestになるか？', done => {
        agent
            .put('tasks/1')
            .send({
                title: 'updated',
                is_done: 'true'
            })
            .expect(400)
            .end(done);
    });

    it('存在しないタスクはNot Foundになるか？', done => {
        agent
            .put('tasks/999')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /tasks/{id}', () => {
    it('タスクを削除できるか？', done => {
        agent
            .delete('tasks/1')
            .expect(200)
            .end(done);
    });

    it('存在しないタスクはNot Foundになるか？', done => {
        agent
            .delete('tasks/999')
            .expect(404)
            .end(done);
    });

    it('タスクがちゃんと消えているか？', done => {
        agent
            .get('tasks/1')
            .expect(404)
            .end(done);
    });
});

describe('GET /schema', () => {
    it('スキーマが取得できるか？', done => {
        agent
            .get('schema')
            .expect(200)
            .end(done);
    });
});