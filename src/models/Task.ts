import Store from '../store';
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

export class NotFoundError implements Error {
    public name = 'Not Found';
    constructor(public message: string) {}

    toString() {
        return this.name + ': ' + this.message;
    }
}

export default class Task {
    constructor () {
    }

    static all(query: IParameters): ITaskListResponse {
        let tasks: ITask[];
        const offset = query.offset || 0;
        if (query.limit) {
            tasks = store.tasks.slice(offset, offset + query.limit);
        } else {
            tasks = store.tasks.slice(offset);
        }
        return {
            tasks: tasks,
            total: tasks.length,
            offset: offset
        };
    }

    static get(id: number): ITaskOne {
        const task = store.tasks.find(a => a.id === id);
        if (task) {
            return {
                task: task
            };
        } else {
            throw new NotFoundError('タスクが見つかりませんでした');
        }
    }

    static add(param: ITask): ITaskOne {
        const task: ITask = {
            id: store.counter++,
            title: param.title,
            is_done: param.is_done || false
        };

        store.tasks.push(task);
        return {
            task: task
        };
    }

    static update(id: number, param: ITask): ITaskOne {
        const index = store.tasks.findIndex(a => a.id === id);
        if (index < 0) {
            throw new NotFoundError('タスクが見つかりませんでした');
        }

        const self = store.tasks[index];
        const task: ITask = {
            id: self.id,
            title: param.title || self.title,
            is_done: param.is_done || self.is_done
        };

        store.tasks.splice(index, 1, task);
        return {
            task: task
        };
    }

    static delete(id: number): ITaskOne {
        const index = store.tasks.findIndex(a => a.id === id);
        if (index < 0) {
            throw new NotFoundError('タスクが見つかりませんでした');
        }
         
        const task = store.tasks.splice(index, 1)[0];
        return {
            task: task
        };
    }
}