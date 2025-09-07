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
  update(@Param('id',ParseIntPipe) id:number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id:number) {
    try {
      if(await this.productsService.remove(+id)){throw new HttpException('borrado correctamete',HttpStatus.OK)}

      return {"status":500,"messages":"internal Eroor"}
      
    } catch (error) {
       throw new HttpException(
        error.message || "An error occurred", 
        HttpStatus.NOT_FOUND
      );
      
    }
    
  }
}
