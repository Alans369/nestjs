import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, AuthResponse } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
   constructor(private readonly jwtService: JwtService,private readonly userService:UsersService
   ) {}

   async signIn(
    username: string,
    pass: string,
  ): Promise<AuthResponse> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new Error('credneciales invalidas');
    }
    const payload = { sub: user.id, username: user.name, role: user.role };
    
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_EXPIRATION // para el access token
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '2h', // refresh token dura 7 días
        secret: process.env.JWT_REFRESH_SECRET // usa un secreto diferente para más seguridad
      })
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshToken(token: string): Promise<{ access_token: string }> {
    try {
      // Verificar el refresh token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET
      });

      // Eliminamos la fecha de expiración del payload
      delete payload.exp;
      delete payload.iat;

      // Generar nuevo access token
      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_EXPIRATION
      });

      return {
        access_token: newAccessToken
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(createUserDto: CreateUserDto) {
      return await this.userService.create(createUserDto)
    }
}
