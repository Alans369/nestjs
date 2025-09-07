import { Category } from "src/category/entities/category.entity"
import { Entity,
      Column,
      PrimaryGeneratedColumn,
      CreateDateColumn,
      UpdateDateColumn,
      JoinColumn,  
      ManyToOne} from "typeorm"

@Entity()
export class Product {
     @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    slug: string

    @Column()
    price: number
 
    @Column()
    descripcion: string

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn()
    category: Category
    
 
    @Column('json', { nullable: true })
    images: string[];

    @CreateDateColumn()
    creationAt:Date
        
    @UpdateDateColumn() 
    updatedAt:Date
}
