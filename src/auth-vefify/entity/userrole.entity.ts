import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {User} from "./user.entity";
import {Role} from "./role.entity";

@Entity()
export class Userrole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    userId: number;

    @Column('int')
    roleId: number;

    // @ManyToOne(type => User, user => user.userRoles)
    // @JoinColumn({name: 'userId'})
    // user: User;
    //
    // @ManyToOne(type => Role, role => role.userRoles)
    // @JoinColumn({name: 'roleId'})
    // role: Role;


}