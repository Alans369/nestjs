import { Controller, Get, Post, Body,Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist:true}))
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
       throw new HttpException(
        error.message || "An error occurred", 
        HttpStatus.NOT_FOUND
      );
      
    }
    
  }

  @Get()
  findAll(@Query('page',ParseIntPipe) page:number,@Query('pageSize',ParseIntPipe) pageSize:number) {
    return this.productsService.findAll(page,pageSize);
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id:number) {
    try {
      return await this.productsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message || "An error occurred", 
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  async update(@Param('id',ParseIntPipe) id:number, @Body() updateProductDto: UpdateProductDto) {
    try{
          return await this.productsService.update(+id, updateProductDto);
    }
    catch(error){
       throw new HttpException(
        error.message || "An error occurred", 
        HttpStatus.NOT_FOUND
      );
    }
    
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id:number) {
    try {
      await this.productsService.remove(+id)

      return {"status":200,"messages":"borrado corectamente"}
      
    } catch (error) {
       throw new HttpException(
        error.message || "An error occurred", 
        HttpStatus.NOT_FOUND
      );
      
    }
    
  }
}
