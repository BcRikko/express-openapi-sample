import { Operation } from 'express-openapi';
import * as api from '../api';
import Task from '../models/Task';
import { ITaskListResponse, ITaskList, ITaskOne } from '../models/Task';

export const get: Operation = async (req, res) => {
    let tasks: ITaskListResponse;
    try {
        tasks = await Task.all(req.query);
    } catch (err) {
        api.responseError(res, err);
    }
    api.responseJSON(res, 200, tasks);
};

get.apiDoc = {
    summary: 'タスク一覧の取得',
    description: 'タスク一覧を取得します',
    operationId: 'getTasks',
    parameters: [
        { $ref: '#/parameters/offset' },
        { $ref: '#/parameters/limit' }
    ],
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

export const post: Operation = async (req, res) => {
    let task: ITaskOne;
    try {
        task = await Task.add(req.body);
    } catch (err) {
        api.responseError(res, err);
    }
    api.responseJSON(res, 201, task);
};

post.apiDoc = {
    summary: 'タスクの登録',
    description: 'タスクを登録します',
    operationId: 'postTask',
    parameters: [
        {
            name: 'task',
            in: 'body',
            schema: {
                $ref: '#/definitions/TaskToPost'
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