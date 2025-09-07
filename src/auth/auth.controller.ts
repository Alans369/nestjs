import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: CreateAuthDto) {
    try {
      return await this.authService.signIn(signInDto.username, signInDto.password);
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.NOT_FOUND)
      
    }
    
  }
  
}
