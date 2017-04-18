import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as express from 'express';
import * as openapi from 'express-openapi';
import * as bodyParser from 'body-parser';

class Server {
    port: number = process.env.PORT || 10080;
    app = express();

    constructor () {
        const api = yaml.safeLoad(fs.readFileSync('api.yml', 'utf-8'));
        
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        openapi.initialize({
            app: this.app,
            apiDoc: api,
            paths: './server/api'
        });
    }

    start () {
        this.app.listen(this.port, () => {
            console.log(`listening on ${this.port}`);
        });
    }
}

export default Server;
