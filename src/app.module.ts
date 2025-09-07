import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

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
    UsersModule
  ]
})
export class AppModule {}
