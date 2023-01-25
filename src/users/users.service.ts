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
    if (user.username === '') {
      const [address] = user.email.split('@')
      user.username = `@${address}`
    } else {
      user.username = `@${user.username}`
    }

    const newUser = this.usersRepository.create(user)
    return this.usersRepository.save(newUser)
  }

  findOne(username: string) {
    return this.usersRepository.findOneBy({ username })
  }

  update(username: string, user: UpdateUserDto) {
    user.username = `@${user.username}`
    return this.usersRepository.update({ username }, user)
  }
}
