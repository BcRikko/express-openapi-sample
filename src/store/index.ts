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