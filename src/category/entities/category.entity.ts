import { Product } from "src/products/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, OneToMany } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    //@IsCategoryAlreadyExist({ message: "La categoría ya existe" })
    name: string
    
    @Column()
    slug:string
    
    @Column({default:true})
    estado:boolean;

    @CreateDateColumn()
    creationAt:Date
        
    @UpdateDateColumn() 
    updatedAt:Date

    @OneToMany(() => Product, products => products.category)
     products: Product[];

}
