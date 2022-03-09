import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Location } from "./Location";

@Entity("user")
export class User {
    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    salt: string;

    @Column()
    key: string;

    password: string;

    @Column({ nullable: true })
    passwordResetToken: string;

    @Column({ nullable: true })
    passwordResetExpires: Date;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: true})
    location_id: string;

    @ManyToOne(()=> Location, {nullable: true})
    @JoinColumn({name: "location_id"})
    category: Location;

    constructor() {
        if(!this.id) {
            this.id = uuid() 
        }
    }
}