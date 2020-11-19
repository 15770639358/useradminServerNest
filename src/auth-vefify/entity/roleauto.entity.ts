import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class Roleauto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    roleId: number;

    @Column('int')
    authId: number;

}