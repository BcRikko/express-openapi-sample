import { Entity, PrimaryGeneratedColumn, Column, ColumnOptions } from 'typeorm';

export interface ITask {
    id: number,
    title: string,
    is_done?: boolean
}

@Entity()
export default class Task implements ITask {
    @PrimaryGeneratedColumn({ type: 'int', generated: true})
    id: number;

    @Column('string')
    title: string;

    @Column('boolean', { default: false })
    is_done: boolean;
}