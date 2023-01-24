import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/users.entity'
import { UsersModule } from 'src/users/users.module'
import { TasksController } from './tasks.controller'
import { Task } from './tasks.entity'
import { TasksService } from './tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
