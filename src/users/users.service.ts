import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    let user: Users = new Users();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    return this.userRepository.save(user);
  }

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: Users = new Users();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
