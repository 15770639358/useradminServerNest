import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';


@Entity()
export class Authority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    authpath: string;

    @Column('varchar')
    authname: string;

    @Column('int')
    category: number

}