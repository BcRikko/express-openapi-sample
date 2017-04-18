import { Operation } from 'express-openapi';
import * as store from '../store';

export const get: Operation = (req, res) => {
    const tasks = store.getTasks();
    res.status(200).json(tasks);
};

get.apiDoc = {
    summary: 'タスク一覧の取得',
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