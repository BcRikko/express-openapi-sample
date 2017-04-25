import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import Task from '../models/Task';

export default class Store {
    private _conn: Connection;

    public storeOptions: ConnectionOptions = {
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

    private isConnected (): boolean {
        return this._conn && this._conn.isConnected;
    }

    public async createConnection (): Promise<Connection> {
        if (!this.isConnected()) {
            this._conn = await createConnection(this.storeOptions);
        }
        return this._conn;
    }

    public close(): void {
        if (this.isConnected()) {
            this._conn.close();
        }
    }
}