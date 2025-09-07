import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql-test-esfe-8ff0.b.aivencloud.com",
      port: 20787,
      username: "avnadmin",
      password: "AVNS_PfxZhqEHsyFEn50ylaO",
      database: "Mydatabase",
      logging: true,
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    CategoryModule,
    ProductsModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
    'auth/{*splat}',
  )
      
.forRoutes({
  path: 'api/v1/*splat',
  method: RequestMethod.ALL,
});
; // Esto aplicará el middleware a todas las rutas
  }
}
