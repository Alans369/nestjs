import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';


@Controller('/api/v1/users')
 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  
  @Get()
   @Roles(['admin'])
@UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
   @Roles(['admin'])
@UseGuards(RolesGuard)
  findOne(@Param('id') id: ParseIntPipe) {
    return this.usersService.findById(+id);
  }
  
  @UsePipes(new ValidationPipe())
  @Put(':id')
   @Roles(['admin'])
@UseGuards(RolesGuard)
  update(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
   @Roles(['admin'])
@UseGuards(RolesGuard)
  remove(@Param('id',ParseIntPipe) id:number) {
    return this.usersService.delete(+id);
  }
}
