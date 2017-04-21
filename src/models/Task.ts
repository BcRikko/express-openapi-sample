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

export default class Task {
    constructor () {
    }

    static all(): ITaskList {
        return {
            tasks: store.tasks
        };
    }

    static get(id: number): ITaskOne {
        const task = store.tasks.find(a => a.id === id);
        return {
            task: task
        };
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
        if (index > -1) {
            const task = store.tasks.splice(index, 1)[0];
            return {
                task: task
            };
        }

        return {
            task: null
        };
    }
}