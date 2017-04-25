import Task from './Task';
import { ITask } from './Task';
import Store from '../store';
import { Connection, ObjectLiteral } from 'typeorm';


export interface ITaskOne {
    task: Task
}

export interface ITaskList {
    tasks: Task[]
}

export interface IPageInfo {
    total: number,
    offset: number
}

export interface ITaskListResponse extends ITaskList, IPageInfo {}

export interface IParameters {
    offset?: number,
    limit?: number
}

export default class TaskController {
    constructor () {
    }

    static all(query: IParameters): Promise<ITaskListResponse> {

        return new Promise(async (resolve, reject) => {
            const store = new Store();
            let conn: Connection;
            let tasks: Task[];

            try {
                conn = await store.createConnection();
                tasks = await conn.entityManager.find(Task, {
                    alias: 'task',
                    offset: query.offset || 0,
                    limit: query.limit || 100
                });

            } catch (err) {
                reject({ code: 500, message: err.message });

            } finally {
                store.close();
            }

            if (tasks) {
                resolve({
                    tasks: tasks,
                    total: tasks.length,
                    offset: query.offset || 0
                });
            } else {
                reject({
                    code: 404,
                    message: 'タスクが見つかりませんでした'
                });
            }
        });
    }

    static get(id: number): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            const store = new Store();

            let conn: Connection;
            let result: Task;

            try {
                conn = await store.createConnection();
                result = await conn.entityManager.findOneById(Task, id);

            } catch (err) {
                reject({ code: 500, message: err.message });

            } finally {
                store.close();
            }

            if (result) {
                resolve({ task: result });
            } else {
                reject({
                    code: 404,
                    message: '指定IDのタスクが見つかりませんでした'
                })
            }
        });
    }

    static add(param: ITask): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            const store = new Store();

            let conn: Connection;
            let result: Task;

            const task = new Task();
            task.title = param.title;
            task.is_done = param.is_done || false;

            try {
                conn = await store.createConnection();
                result = await conn.entityManager.persist(task);

            } catch (err) {
                reject({ code: 500, message: err.message });

            } finally {
                store.close();
            }

            resolve({ task: result });
        });
    }

    static update(id: number, param: ITask): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            const store = new Store();

            let conn: Connection;
            let result: Task;

            try {
                conn = await store.createConnection();
                const repository = await conn.getRepository(Task);
                const task = await repository.findOneById(id);

                if (!task) {
                    reject({
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    })
                }

                task.title = param.title || task.title;
                task.is_done = param.is_done || task.is_done;

                result = await repository.persist(task);

            } catch (err) {
                reject({ code: 500, message: err.message });

            } finally {
                store.close();
            }

            resolve({ task: result });
        });
    }

    static delete(id: number): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            const store = new Store();

            let conn: Connection;
            let result: Task;

            try {
                conn = await store.createConnection();
                const repository = await conn.getRepository(Task);
                result = await repository.findOneById(id);

                if (!result) {
                    reject({
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                }

                result = await repository.remove(result);

            } catch (err) {
                reject({ code: 500, message: err.message });

            } finally {
                store.close();
            }

            resolve({ task: result });
        });
    }
}