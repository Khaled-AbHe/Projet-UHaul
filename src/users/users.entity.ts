import { AfterInsert, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email : string;

    @Column()
    password : string;

    @AfterInsert()
    logInsert() {
        console.log(`User with ID ${this.id} has been inserted`);
    }
}