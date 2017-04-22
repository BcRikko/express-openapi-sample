import Store from '../store';
import { IError } from '../api';
const store = Store.instance;

export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

export interface ITaskOne {
    task: ITask
}

export interface ITaskList {
    tasks: ITask[]
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

export default class Task {
    constructor () {
    }

    static all(query: IParameters): Promise<ITaskListResponse> {
        let tasks: ITask[];
        const offset = query.offset || 0;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (query.limit) {
                    tasks = store.tasks.slice(offset, offset + query.limit);
                } else {
                    tasks = store.tasks.slice(offset);
                }

                if (tasks.length > 0) {
                    resolve({
                        tasks: tasks,
                        total: tasks.length,
                        offset: offset
                    });
                } else {
                    reject(<IError>{
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                }
            }, 100);
        });
    }

    static get(id: number): Promise<ITaskOne> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const task = store.tasks.find(a => a.id === id);
                if (task) {
                    resolve({ task: task });
                } else {
                    reject(<IError>{
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                }
            }, 100);
        });
    }

    static add(param: ITask): Promise<ITaskOne> {
        const task: ITask = {
            id: store.counter++,
            title: param.title,
            is_done: param.is_done || false
        };

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                store.tasks.push(task);
                resolve({ task: task });
            }, 100);
        });
    }

    static update(id: number, param: ITask): Promise<ITaskOne> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = store.tasks.findIndex(a => a.id === id);
                if (index < 0) {
                    reject(<IError>{
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                    return;
                }

                const self = store.tasks[index];
                const task: ITask = {
                    id: self.id,
                    title: param.title || self.title,
                    is_done: param.is_done || self.is_done
                };

                store.tasks.splice(index, 1, task);
                resolve({ task: task });
            }, 100);
        });
    }

    static delete(id: number): Promise<ITaskOne> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = store.tasks.findIndex(a => a.id === id);
                if (index < 0) {
                    reject(<IError>{
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                    return;
                }

                const task = store.tasks.splice(index, 1)[0];
                resolve({ task: task });
            }, 100);
        });
    }
}