import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async findAll():Promise<User[]>{
    return await this.usersRepository.find();
  }

  async findById(id: number) {
    const result = await this.usersRepository.findOneBy({id:id});
        if(!result){
             throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
              }
        return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User>{
    const user = await this.usersRepository.findOneBy({id:id});
        if(!user){
             throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        await this.usersRepository.merge(user,updateUserDto)

        const result = await this.usersRepository.save(user);

        return result;
  }

  async delete(id: number){
    const user = await this.usersRepository.findOneBy({id:id});
        if(!user){
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
      
        const rs = await this.usersRepository.delete(id);
        if (rs.affected!==undefined && rs.affected!>0){throw new HttpException('User usessfuly', HttpStatus.OK)}

        
  }

  async findUserWithPasswordAndEmail(data:{email:string,password:string}):Promise<User>{
      const {email,password}=data
        const result = await this.usersRepository.createQueryBuilder("user")
            .where("user.email = :email", { email })
            .andWhere("user.password = :password", { password })
            .getOne()
        if(!result){
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}
