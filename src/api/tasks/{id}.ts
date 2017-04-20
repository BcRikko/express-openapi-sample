import { Operation } from 'express-openapi';
import Task from '../../models/Task';
import * as api from '../../api';

export const get: Operation = (req, res) => {
    const task = Task.get(req.params.id);
    if (task) {
        api.responseJSON(res, 200, task);
    } else {
        api.responseError(res, 404, '指定IDのタスクが見つかりませんでした');
    }
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

export const put: Operation = (req, res) => {
    const task = Task.update(req.params.id, req.body);
    if (task) {
        api.responseJSON(res, 200, task);
    } else {
        api.responseError(res, 400, 'タスクが更新できませんでした');
    }
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
                $ref: '#/definitions/TaskOne'
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
        400: {
            description: 'タスクが更新できませんでした',
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

export const del: Operation = (req, res) => {
    const task = Task.delete(req.params.id);
    if (task) {
        api.responseJSON(res, 200);
    } else {
        api.responseError(res, 400, 'タスクが削除できませんでした');
    }
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
        400: {
            description: 'タスクが削除できませんでした',
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