import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, Not } from "typeorm"
import {
    IsEmail,
    MinLength,
    IsNotEmpty,
} from "class-validator"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    
    @IsNotEmpty({message:'email should not be empty'})
    @IsEmail()
    @Column()
    email!: string
    
    @IsNotEmpty({message:'name should not be empty'})
    @MinLength(5, {
    message: 'name is too short',
   })
    @Column()
    name!: string
    
    @IsNotEmpty({message:'password should not be empty'})
    @MinLength(5, {
    message: 'password is too short',
   })
    @Column()
    password!:string
    
    @IsNotEmpty({message:'role should not be empty'})
 
    @Column()
    role!: string
    
    @CreateDateColumn()
    creationAt!:Date
    
   
    @UpdateDateColumn() 
    updatedAt!:Date
}