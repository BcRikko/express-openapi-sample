import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import Task from '../models/Task';

export default class Store {
    private static _conn: Connection;

    public static connectionOptions: ConnectionOptions = {
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

    public static async createConnection() {
        if (!this._conn) {
            this._conn = await createConnection(this.connectionOptions);
        }
        return this._conn;
    }
}