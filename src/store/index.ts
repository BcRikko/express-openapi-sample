import { ITask } from '../models/Task';

class Store {
    private static _instance: Store;
    private constructor() {}

    public counter = 5;
    public tasks:ITask[] = [
        {
            id: 0,
            title: 'dummy0',
            is_done: false
        },
        {
            id: 1,
            title: 'dummy1',
            is_done: false
        },
        {
            id: 2,
            title: 'dummy2',
            is_done: false
        },
        {
            id: 3,
            title: 'dummy3',
            is_done: false
        },
        {
            id: 4,
            title: 'dummy4',
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