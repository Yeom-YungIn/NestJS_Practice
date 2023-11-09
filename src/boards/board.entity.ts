import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BoardStatus} from "./board-status.enum";
import {User} from "../auth/user.entity";

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

    @Column()
    userId: number

    @ManyToOne(() => User, User => User.boards, {eager: true})
    user: User;
}