import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as express from 'express';
import * as openapi from 'express-openapi';
import * as bodyParser from 'body-parser';
import Store from './store';

class Server {
    port: number = process.env.PORT || 10080;
    app = express();

    constructor () {
        const api = yaml.safeLoad(fs.readFileSync('api.yml', 'utf-8'));

        openapi.initialize({
            app: this.app,
            apiDoc: api,
            paths: './server/api',
            docsPath: '/schema',
            consumesMiddleware: {
                'application/json': bodyParser.json(),
                'text/text': bodyParser.text()
            },
            errorMiddleware: (err, req, res, next) => {
                res.status(400);
                res.json(err);
            },
            errorTransformer: (openapi, jsonschema) => {
                return openapi.message;
            },
            exposeApiDocs: true
        });
    }

    start () {
        new Store();
        

        this.app.listen(this.port, () => {
            console.log(`listening on ${this.port}`);
        });
    }
}

export default Server;
