interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

let _tasks = <ITask[]>[
    {
        id: 0,
        title: 'dummy',
        is_done: false
    }
];

export const getTasks = () => {
    return _tasks || [];
};

export const getTaskById = id => {
    return _tasks.find(a => a.id === id) || [];
};

export const createTask = param => {
    const data = {
        id: _tasks.length || 0,
        title: param.title,
        is_done: param.is_done || false
    };

    _tasks.push(data);
    return data;
};