import { Operation } from 'express-openapi';
import Store from '../../store';
import * as api from '../../api';

const store = Store.instance;

export const get: Operation = (req, res) => {
    const task = store.getTaskById(req.params.id);
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
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            format: 'int32'
        }
    ],
    responses: {
        200: {
            description: 'タスクを取得しました',
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

export const put: Operation = (req, res) => {
    const task = store.updateTaskById(req.params.id, req.body);
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
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            format: 'int32'
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
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};

export const del: Operation = (req, res) => {
    const task = store.deleteTaskById(req.params.id);
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
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            format: 'int32'
        }
    ],
    responses: {
        200: {
            description: 'タスクを削除しました'
        },
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error'
            }
        }
    }
};