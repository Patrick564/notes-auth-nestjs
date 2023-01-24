import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user)
    return this.usersRepository.save(newUser)
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  update(id: number, user: UpdateUserDto) {
    return this.usersRepository.update(id, user)
  }
}
