import { AfterInsert, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email : string;

    @Exclude()
    @Column()
    password : string;

    @Column({ default : false })
    admin : boolean;

    @AfterInsert()
    logInsert() {
        console.log(`User with ID ${this.id} has been inserted`);
    }
}