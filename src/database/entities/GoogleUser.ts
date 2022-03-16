import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Location } from "./Location";

@Entity("googleUser")
export class GoogleUser {
    @PrimaryColumn()
    id: string;

    @Column()
    google_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    userPic: string;

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