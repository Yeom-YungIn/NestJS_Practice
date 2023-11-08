import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BoardStatus} from "./board-status.enum";

@Entity()
export class Board{
    @PrimaryGeneratedColumn({'name':'id'})
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}