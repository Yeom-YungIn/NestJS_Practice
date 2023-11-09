import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Board} from "../boards/board.entity";

@Entity('user')
@Unique(['userName'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    userName: string;

    @Column()
    password: string;

    @OneToMany(() => Board, board => board.user, {eager: false})
    boards: Board[];
}