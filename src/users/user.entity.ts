import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Exclude() // this tells interceptors that password should be hidden
    @Column()
    password: string;

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({default: false})
    admin:boolean
}