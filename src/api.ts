import * as express from 'express';


export interface IError {
    readonly code: number;
    readonly message: string;
}

export function responseError(res: express.Response, reason: IError): express.Response {
    const error: IError = {
        code: reason.code,
        message: reason.message
    };

    res.status(reason.code);
    res.json(error);
    return res;
}

export function responseJSON(res: express.Response, code: number, body?: any): express.Response {
    res.status(code);
    res.json(body);

    return res;
}