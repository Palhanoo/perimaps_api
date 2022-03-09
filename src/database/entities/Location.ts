import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("location")
export class Location {
    @PrimaryColumn()
    id: string;
    
    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) { //se o Id não existir
            this.id = uuid() 
        }
    }
}