import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {User} from "./user.entity";
import {Userrole} from "./userrole.entity";
import {Authority} from "./authority.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    rolename: string;

    @Column('int')
    category: number;

    auths: Authority[]

    // @ManyToOne(() => User, user => user.roles)
    // user: User;

    // @OneToMany(() => Userrole, userrole => userrole.role)
    // userRoles: Userrole[];
}