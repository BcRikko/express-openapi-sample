import { Operation } from 'express-openapi';
import Task from '../models/Task';
import * as api from '../api';

export const get: Operation = (req, res) => {
    const body = Task.all();
    if (body && body.tasks.length) {
        api.responseJSON(res, 200, body);
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
                    $ref: '#/definitions/TaskList'
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
    const body = Task.add(req.body);
    if (body.task) {
        api.responseJSON(res, 201, body);
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