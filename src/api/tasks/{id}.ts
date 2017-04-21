import { Operation } from 'express-openapi';
import * as api from '../../api';
import Task from '../../models/Task';
import { ITaskOne } from '../../models/Task';

export const get: Operation = (req, res) => {
    Task
        .get(req.params.id)
        .then(body => {
            api.responseJSON(res, 200, body);
        })
        .catch(err => {
            api.responseError(res, err.code, err.message);
        });
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
    Task
        .update(req.params.id, req.body)
        .then(body => {
            api.responseJSON(res, 200, body);
        })
        .catch(err => {
            api.responseError(res, err.code, err.message);
        });
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

export const del: Operation = (req, res) => {
    Task
        .delete(req.params.id)
        .then(body => {
            api.responseJSON(res, 200, body);
        })
        .catch(err => {
            api.responseError(res, err.code, err.message);
        });
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