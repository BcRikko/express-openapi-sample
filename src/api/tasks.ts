import { Operation } from 'express-openapi';
import * as store from '../store';

export const get: Operation = (req, res) => {
    const tasks = store.getTasks();
    res.status(200).json(tasks);
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
    res.status(201).json(task);
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
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};