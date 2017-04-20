import { ITask } from '../models/Task';

class Store {
    private static _instance: Store;
    private constructor() {}

    public counter = 1;
    public tasks:ITask[] = [
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
}

export default Store;