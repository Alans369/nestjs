import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('page',ParseIntPipe) pages:number,@Query('pageSize',ParseIntPipe) limits:number) {
    const page:number = pages || 1;
    const limit:number = limits || 10;
    return this.categoryService.findAll(page,limit);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number,) {
    return this.categoryService.finById(+id);
  }
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id',ParseIntPipe) id:number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id:number) {
    return this.categoryService.delete(+id);
  }
}
