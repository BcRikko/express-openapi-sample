import { Operation } from 'express-openapi';
import * as store from '../../store';

export const get: Operation = (req, res) => {
    const task = store.getTaskById(req.params.id);
    res.status(200).json(task)
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
    res.status(200).json(task);
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