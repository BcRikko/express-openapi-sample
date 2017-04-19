import * as express from 'express';


export interface IError {
    readonly code: number;
    readonly message: string;
}

export function responseError(res: express.Response, code: number, message: string): express.Response {
    const error: IError = {
        code: code,
        message: message
    };

    res.status(code);
    res.json(error);
    return res;
}

export function responseJSON(res: express.Response, code: number, body?: any): express.Response {
    res.status(code);
    res.json(body);

    return res;
}