import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as express from 'express';
import * as openapi from 'express-openapi';
import * as bodyParser from 'body-parser';

const api = yaml.safeLoad(fs.readFileSync('api.yml', 'utf-8'));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

openapi.initialize({
    app: app,
    apiDoc: api,
    paths: './server/api'
});

const port = 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});