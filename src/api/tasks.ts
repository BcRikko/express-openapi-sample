import { Operation } from 'express-openapi';
import Store from '../store';
import * as api from '../api';

const store = Store.instance;

export const get: Operation = (req, res) => {
    const tasks = store.getTasks();
    if (tasks && tasks.length) {
        api.responseJSON(res, 200, tasks);
    } else {
        api.responseError(res, 404, 'タスク一覧が取得できませんでした')
    }
};

get.apiDoc = {
    summary: 'タスク一覧の取得',
    description: 'タスク一覧を取得します',
    operationId: 'getTasks',
    responses: {
        200: {
            description: 'タスク一覧を取得しました',
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Tasks'
                }
            }
        },
        404: {
            description: 'タスク一覧が取得できませんでした',
            schema: {
                $ref: '#/definitions/Error'
            }
        },
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};

export const post: Operation = (req, res) => {
    const task = store.createTask(req.body);
    if (task) {
        api.responseJSON(res, 201, task);
    } else {
        api.responseJSON(res, 400, 'タスクが登録できませんでした');
    }
};

post.apiDoc = {
    summary: 'タスクの登録',
    description: 'タスクを登録します',
    operationId: 'createTask',
    parameters: [
        {
            name: 'task',
            in: 'body',
            schema: {
                $ref: '#/definitions/TaskOne'
            }
        }
    ],
    responses: {
        201: {
            description: 'タスクを登録しました',
            schema: {
                $ref: '#/definitions/TaskOne'
            }
        },
        400: {
            description: 'タスクが登録できませんでした',
            schema: {
                $ref: '#/definitions/Error'
            }
        },
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};