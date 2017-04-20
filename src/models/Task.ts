import Store from '../store';
const store = Store.instance;

export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

export default class Task {
    constructor () {
    }

    static all(): ITask[] {
        return store.tasks;
    }

    static get(id: number): ITask {
        return store.tasks.find(a => a.id === id);
    }

    static add(param: ITask): ITask {
        const task: ITask = {
            id: store.counter++,
            title: param.title,
            is_done: param.is_done || false
        };

        store.tasks.push(task);
        return task;
    }

    static update(id: number, param: ITask): ITask {
        const index = store.tasks.findIndex(a => a.id === id);
        const self = store.tasks[index];
        const task: ITask = {
            id: self.id,
            title: param.title || self.title,
            is_done: param.is_done || self.is_done
        };

        store.tasks.splice(index, 1, task);
        return task;
    }

    static delete(id: number): ITask {
        const index = store.tasks.findIndex(a => a.id === id);
        if (index > -1) {
            return store.tasks.splice(index, 1)[0];
        }

        return null;
    }
}