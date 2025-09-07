import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
    ) {}
  async create(createCategoryDto: CreateCategoryDto):Promise<Category>{

        const result =  await this.categoryRepository.save({...createCategoryDto,"slug":createCategoryDto.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')});

        return result;

    }

  async findAll(page:number,pageSize:number):Promise<{data:Category[], total:number}> {
    
        const [result,total] = await this.categoryRepository.createQueryBuilder("categories")
            .where("categories.estado = :estado",{estado:true})
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();

        return {data:result,total:total};
  }

  async finById(id: number):Promise<Category>{

        const result:unknown = await this.categoryRepository.createQueryBuilder("Categories")
            .where("Categories.id = :id",{id:id})
            .andWhere("Categories.estado = :estado",{estado:true})
            .getOne();

        if(!result){
            throw new Error('Category not found');
        }

        return result as Category;
    }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
     const categoria =  await this.categoryRepository.findOneBy({id:id});

        if(!categoria){
             throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
        }
         await this.categoryRepository.merge(categoria,{...updateCategoryDto,"slug":updateCategoryDto.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')});

         const result = await this.categoryRepository.save(categoria);

        return result;
  }

  async delete(id: number) {
       const category = await this.categoryRepository.createQueryBuilder("Categories")
            .where("Categories.id = :id",{id:id})
           . andWhere("Categories.estado = :estado",{estado:true})
            .getOne();
        if(!category){
            throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
        }
        const rs = await this.categoryRepository.createQueryBuilder()
            .update(Category)
            .set({estado:false})
            .where("id = :id",{id:id})
            .execute();

        if (rs.affected!==undefined && rs.affected!>0){throw new HttpException('User usessfuly', HttpStatus.OK)}

  }
}
