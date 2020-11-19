import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Role} from "./role.entity";
import {Userrole} from "./userrole.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;

    // @OneToMany(() => Role, Role => Role.user)
    // roles: Role[];
    //
    // @OneToMany(type => Userrole, userrole => userrole.user)
    // userRoles: Userrole[];
    roles: Role[]

}