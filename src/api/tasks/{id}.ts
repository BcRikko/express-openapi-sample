import { Operation } from 'express-openapi';
import * as api from '../../api';
import Task from '../../models/TaskController';
import { ITaskOne } from '../../models/TaskController';

export const get: Operation = async (req, res) => {
    let task: ITaskOne;
    try {
        task = await Task.get(req.params.id);
    } catch (err) {
        api.responseError(res, err);
    }
    api.responseJSON(res, 200, task);
};

get.apiDoc = {
    summary: '指定IDタスクの取得',
    description: 'パスに指定されたIDのタスクを取得します',
    operationId: 'getTaskById',
    parameters: [
        {
            $ref: '#/parameters/id'
        }
    ],
    responses: {
        200: {
            description: 'タスクを取得しました',
            schema: {
                $ref: '#/definitions/TaskOne'
            }
        },
        404: {
            description: '指定IDのタスクが見つかりませんでした',
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

export const put: Operation = async (req, res) => {
    let task: ITaskOne;
    try {
        task = await Task.update(req.params.id, req.body);
    } catch (err) {
        api.responseError(res, err);
    }
    api.responseJSON(res, 200, task);
};

put.apiDoc = {
    summary: '指定IDタスクの更新',
    description: 'パスに指定されたIDのタスクを更新します',
    operationId: 'updateTaskById',
    parameters: [
        {
            $ref: '#/parameters/id'
        },
        {
            name: 'task',
            in: 'body',
            schema: {
                $ref: '#/definitions/TaskToPut'
            }
        }
    ],
    responses: {
        200: {
            description: 'タスクを更新しました',
            schema: {
                $ref: '#/definitions/TaskOne'
            }
        },
        404: {
            description: '指定IDのタスクが見つかりませんでした',
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

export const del: Operation = async (req, res) => {
    let task: ITaskOne;
    try {
        task = await Task.delete(req.params.id);
    } catch (err) {
        api.responseError(res, err);
    }
    api.responseJSON(res, 200, task);        
};

del.apiDoc = {
    summary: '指定IDタスクの削除',
    description: 'パスに指定されたIDのタスクを削除します',
    operationId: 'deleteTaskById',
    parameters: [
        {
            $ref: '#/parameters/id'
        }
    ],
    responses: {
        200: {
            description: 'タスクを削除しました'
        },
        404: {
            description: '指定IDのタスクが見つかりませんでした',
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