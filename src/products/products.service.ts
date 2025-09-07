import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {



    try {
      const category = await this.categoryService.finById(createProductDto.categoryId);

      const slug = createProductDto.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const product = this.productRepository.create({
      ...createProductDto,
      category,
      slug
    });
    return this.productRepository.save(product);
    } catch (error) {
       throw new Error(error.message)
    }


    
  }

   async findAll(page:number,pageSize:number):Promise<{data:Product[], total:number}> {
      
          const [result,total] = await this.productRepository.createQueryBuilder()
              .skip((page - 1) * pageSize)
              .take(pageSize)
              .leftJoinAndSelect("Product.category", "category")
              .getManyAndCount();
  
          return {data:result,total:total};
    }

  async findOne(id: number) :Promise<Product>{

    const result:unknown = await this.productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .where("product.id = :id", { id:id}) // Ejemplo de filtro por ID
            .getMany();
    if(!result){
        throw new Error("Product not found");
    }
    return result as Product;
}

  async update(id: number, updateProductDto: UpdateProductDto) :Promise<Product>{
    const product =  await this.productRepository.findOneBy({id:id});

    if(!product){
        throw new Error("Product not found");
    }
    const updateData: any = { ...updateProductDto };
    
    // Generate new slug if name is being updated
    if (updateProductDto.title) {
      updateData.slug = updateProductDto.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }

     await this.productRepository.merge(product,updateData);

     const result = await this.productRepository.save(product);

    return result;
}

  async remove(id: number):Promise<boolean> {
    const product = await this.productRepository.findOneBy({id:id});
    if(!product){
        throw new Error("Product not found");
    }
    const rs = await this.productRepository.delete(id);
    return rs.affected!==undefined && rs.affected!>0;
  }
}
