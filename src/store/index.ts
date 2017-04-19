export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

class Store {
    private static _instance: Store;
    private constructor() {}

    private _counter = 1;
    private _tasks:ITask[] = [
        {
            id: 0,
            title: 'dummy',
            is_done: false
        }
    ];

    public static get instance(): Store {
        if (!this._instance) {
            this._instance = new Store();
        }
        return this._instance;
    }

    public getTasks(): ITask[] {
        return this._tasks;
    }

    public getTaskById(id: number): ITask {
        return this._tasks.find(a => a.id === id);
    }

    public createTask(param: ITask): ITask {
        const task = {
            id: this._counter++,
            title: param.title,
            is_done: param.is_done || false
        };
        this._tasks.push(task);
        return task;
    }

    public updateTaskById(id: number, param: ITask): ITask {
        const index = this._tasks.findIndex(a => a.id === id);
        const self = this._tasks[index];
        const task = {
            id: self.id,
            title: param.title || self.title,
            is_done: param.is_done || self.is_done
        };
        
        this._tasks[index] = task;
        return task;
    }

    public deleteTaskById(id: number): ITask {
        const index = this._tasks.findIndex(a => a.id === id);
        if (index > -1) {
            return this._tasks.splice(index, 1)[0];
        }

        return null;
    }
}

export default Store;