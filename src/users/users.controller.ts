import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { Public } from 'src/auth/auth.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  register(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser)
  }

  @Get('account/:username')
  account(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }

  @Patch('update/:username')
  update(@Param('username') username: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(username, user)
  }
}
