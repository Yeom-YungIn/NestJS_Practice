import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('user')
@Unique(['userName'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    userName: string;

    @Column()
    password: string;
}