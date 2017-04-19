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

export const getTaskById = (id: number) => {
    return _tasks.find(a => a.id === id);
};

export const createTask = (param: ITask): ITask => {
    const data = {
        id: _tasks.length || 0,
        title: param.title,
        is_done: param.is_done || false
    };

    _tasks.push(data);
    return data;
};

export const updateTaskById = (id: number, param: ITask): ITask => {
    const index = _tasks.findIndex(a => a.id === id);
    
    const self = _tasks[index];
    _tasks[index] = {
        id: self.id,
        title: param.title || self.title,
        is_done: param.is_done || self.is_done
    }

    return _tasks[index];
};

export const deleteTaskById = (id: number): ITask => {
    const index = _tasks.findIndex(a => a.id === id);
    if (index > -1) {
        return _tasks.splice(index, 1)[0];
    }

    return null;
};