import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import Task from '../models/Task';

export default class Store {
    public static storeOptions: ConnectionOptions = {
        driver: {
            type: 'sqlite',
            storage: 'server/tasks.db',
            database: 'Tasks'
        },
        entities: [
            Task
        ],
        autoSchemaSync: true
    };

    constructor () {
    }

    public static async createConnection () {
        return await createConnection(this.storeOptions);
    }
}