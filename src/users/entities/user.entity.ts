import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
 
    @Column()
    email: string
    
 
    @Column()
    name: string
    
 
    @Column()
    password:string
    
 
    role: string
    
    @CreateDateColumn()
    creationAt:Date
    
   
    @UpdateDateColumn() 
    updatedAt:Date
}