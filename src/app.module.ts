import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
    type: "mysql",
    host: "mysql-test-esfe-8ff0.b.aivencloud.com",
    port: 20787,
    username: "avnadmin",
    password: "AVNS_PfxZhqEHsyFEn50ylaO",
    database: "Mydatabase",
    logging: true,
    synchronize: false,
    autoLoadEntities:true,
    entities: [__dirname+'/**/*.entity{.ts,.js}'],

    }),
    UsersModule,
    CategoryModule,
    ProductsModule
  ]
})
export class AppModule {}
