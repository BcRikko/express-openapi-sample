export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

class Store {
    private static _instance: Store;
    private constructor() {}

    private counter = 1;
    private tasks:ITask[] = [
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
        return this.tasks;
    }

    public getTaskById(id: number): ITask {
        return this.tasks.find(a => a.id === id);
    }

    public createTask(param: ITask): ITask {
        const task = {
            id: this.counter++,
            title: param.title,
            is_done: param.is_done || false
        };
        this.tasks.push(task);
        return task;
    }

    public updateTaskById(id: number, param: ITask): ITask {
        const index = this.tasks.findIndex(a => a.id === id);
        const self = this.tasks[index];
        const task = {
            id: self.id,
            title: param.title || self.title,
            is_done: param.is_done || self.is_done
        };
        
        this.tasks[index] = task;
        return task;
    }

    public deleteTaskById(id: number): ITask {
        const index = this.tasks.findIndex(a => a.id === id);
        if (index > -1) {
            return this.tasks.splice(index, 1)[0];
        }

        return null;
    }
}

export default Store;