import { Logger } from '@nestjs/common';
import {AfterInsert,Entity, PrimaryGeneratedColumn,Column, AfterUpdate } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    @Column()
    password : string;

    @AfterInsert()
    loginInsert(){
        return `"Insert at the ${this.id} : email : ${this.email} password : ${this.password}"`
    }

    @AfterUpdate()
    accountUpdate(){
        return `"Update at the ${this.id} : email : ${this.email} password : ${this.password}"`
    }
}